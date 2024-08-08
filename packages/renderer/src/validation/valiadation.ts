import type {PrismaClient} from '@prisma/client';
import type {Args} from '@prisma/client/runtime/library';
import {ipcRenderer} from 'electron';

export const validationService = {
  async isExisted<T extends keyof PrismaClient>(
    model: T,
    params: Args<T, 'findFirst'>,
  ): Promise<boolean> {
    const result = await ipcRenderer.invoke('prisma-query', {
      model,
      action: 'findFirst',
      params,
    });
    return !!result;
  },
};
