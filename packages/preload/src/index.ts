/**
 * @module preload
 */

import type {IpcRendererEvent} from 'electron';
import {ipcRenderer} from 'electron';
export * from './endpoints';

export type SendIPCParam<T> = {
  signalName: string;
  data?: T;
};

/**
 * Send IPC message to main process.
 *
 * @param option - Signal name and data to send.
 * @returns Promise<any>
 */
export const sendIPC = async (option: SendIPCParam<unknown>) => {
  const {signalName, data} = option;
  return await ipcRenderer.invoke(signalName, data);
};

/**
 * Listen to IPC message from main process.
 *
 * @param event - Signal name.
 * @param callback - Callback function to execute.
 */
export const onMainEventHandler = (
  event: string,
  callback: (event: IpcRendererEvent, data: unknown) => unknown,
) => {
  return ipcRenderer.on(event, (event, data) => {
    callback(event, data);
  });
};

export const userGetFileDir = async () => {
  return await sendIPC({signalName: 'user:selectFileDir'});
};

export const userGetFolerDir = async () => {
  return await sendIPC({signalName: 'user:selectFolderDir'});
};
