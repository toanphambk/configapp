import {app, dialog, ipcMain} from 'electron';
import './security-restrictions';
import {restoreOrCreateWindow} from '/@/mainWindow';
import {platform} from 'node:process';
import updater from 'electron-updater';
import prisma from './prisma/prismaClient';
import type {PrismaQuerryResponse, PrismaQueryParams} from '../../preload/src/index';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';
import {log} from 'node:console';

/**
 * Prevent electron from running multiple instances.
 */
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
app.on('second-instance', restoreOrCreateWindow);

/**
 * Disable Hardware Acceleration to save more system resources.
 */
app.disableHardwareAcceleration();

/**
 * Shout down background process if all windows was closed
 */
app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on('activate', restoreOrCreateWindow);

/**
 * Create the application window when the background process is ready.
 */

app.whenReady().then(async () => {
  await restoreOrCreateWindow();
  updater.autoUpdater.checkForUpdatesAndNotify();

  ipcMain.handle('user:selectFolderDir', async () => {
    try {
      const result = await dialog.showOpenDialog({
        title: 'Select a folder',
        properties: ['openDirectory'],
      });

      if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0];
      }
    } catch (err) {
      return {error: encodeError(err as Error, 'Fail to get folder  error: ')};
    }
  });

  ipcMain.handle('user:selectFileDir', async () => {
    try {
      const result = await dialog.showOpenDialog({
        title: 'Select a file',
        properties: ['openFile'],
      });
      if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0];
      }
    } catch (err) {
      return {error: encodeError(err as Error, 'Fail to get file error: ')};
    }
  });

  ipcMain.handle(
    'prisma-query',
    async (event, option: PrismaQueryParams): Promise<PrismaQuerryResponse> => {
      const {model, action, params} = option;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (prisma as any)[model][action](params);
        return {result};
      } catch (error) {
        const errMsg = `Fail to ${action} ${String(model)} with error: `;
        log(errMsg, error);
        if (error instanceof PrismaClientKnownRequestError) {
          switch (error.code) {
            case 'P2002':
              return {error: encodeError(error, errMsg + 'Unique constraint failed')};
            case 'P2025':
              return {error: encodeError(error, errMsg + 'Record not found')};
            default:
              return {error: encodeError(error, errMsg + 'Prisma client error')};
          }
        } else {
          return {error: encodeError(error as Error, errMsg + 'Prisma client error')};
        }
      }
    },
  );
});

/**
 * Check for app updates, install it in background and notify user that new version was installed.
 * No reason run this in non-production build.
 * @see https://www.electron.build/auto-update.html#quick-setup-guide
 *
 * Note: It may throw "ENOENT: no such file app-update.yml"
 * if you compile production app without publishing it to distribution server.
 * Like `npm run compile` does. It's ok 😅
 */
if (import.meta.env.PROD) {
  app
    .whenReady()
    .then(() => {})
    .catch(e => console.error('Failed check and install updates:', e));
}

const encodeError = (e: Error, msg: string) => {
  return {name: e.name, message: msg, extra: {...e}};
};
