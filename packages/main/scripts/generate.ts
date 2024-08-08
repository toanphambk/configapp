import fs from 'fs';
import path from 'path';
import {Prisma} from '@prisma/client';

const outputPath = '../../packages/preload/src/endpoints.ts';
const hooksOutputPath = '../../packages/renderer/src/api.ts';

const generateCRUD = (model: {name: string}): string => {
  const modelName = model.name;
  const modelNameLower = modelName.charAt(0).toLowerCase() + modelName.slice(1);
  return `
export const create${modelName} = async (option: Prisma.${modelName}CreateArgs, validations?: ((params: Prisma.${modelName}CreateArgs) => Promise<void>)[]): Promise<${modelName}> => {
  return (await sendPrismaQuery<Prisma.${modelName}CreateArgs>({ model: '${modelNameLower}', action: 'create', params: option, validations })) as ${modelName};
};

export const get${modelName}s = async (option: Prisma.${modelName}FindManyArgs): Promise<${modelName}[]> => {
  return (await sendPrismaQuery<Prisma.${modelName}FindManyArgs>({ model: '${modelNameLower}', action: 'findMany', params: option })) as ${modelName}[];
};

export const get${modelName} = async (option: Prisma.${modelName}FindFirstArgs): Promise<${modelName}> => {
  return (await sendPrismaQuery<Prisma.${modelName}FindFirstArgs>({ model: '${modelNameLower}', action: 'findFirst', params: option })) as ${modelName};
};

export const get${modelName}Unique = async (option: Prisma.${modelName}FindUniqueArgs): Promise<${modelName}> => {
  return (await sendPrismaQuery<Prisma.${modelName}FindUniqueArgs>({ model: '${modelNameLower}', action: 'findUnique', params: option })) as ${modelName};
};

export const update${modelName} = async (option: Prisma.${modelName}UpdateArgs, validations?: ((params: Prisma.${modelName}UpdateArgs) => Promise<void>)[]): Promise<${modelName}> => {
  return (await sendPrismaQuery<Prisma.${modelName}UpdateArgs>({ model: '${modelNameLower}', action: 'update', params: option, validations })) as ${modelName};
};

export const delete${modelName} = async (option: Prisma.${modelName}DeleteArgs): Promise<${modelName}> => {
  return (await sendPrismaQuery<Prisma.${modelName}DeleteArgs>({ model: '${modelNameLower}', action: 'delete', params: option })) as ${modelName};
};
`;
};

const generateHooks = (model: {name: string}): string => {
  const modelName = model.name;
  const modelNameLower = modelName.charAt(0).toLowerCase() + modelName.slice(1);
  return `
export const useCreate${modelName} = (
  mutationOptions?: Partial<UseMutationOptions<${modelName}, Error, Prisma.${modelName}CreateArgs>>,
  validations?: ((params: Prisma.${modelName}CreateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.${modelName}CreateArgs) =>
      preload.create${modelName}(option, validations) as unknown as Promise<${modelName}>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${modelNameLower}'] });
    },
    ...mutationOptions,
  });
};

export const useGet${modelName}s = (
  option: Prisma.${modelName}FindManyArgs, 
  queryOptions?: Partial<UseQueryOptions<${modelName}[], Error>>
) => {
  return useQuery({
    queryKey: ['${modelNameLower}', option],
    queryFn: () => preload.get${modelName}s(option),
    ...queryOptions,
  });
};

export const useGet${modelName} = (
  option: Prisma.${modelName}FindFirstArgs, 
  queryOptions?: Partial<UseQueryOptions<${modelName}, Error>>
) => {
  return useQuery({
    queryKey: ['${modelNameLower}', option],
    queryFn: () => preload.get${modelName}(option),
    ...queryOptions,
  });
};

export const useGet${modelName}Unique = (
  option: Prisma.${modelName}FindUniqueArgs, 
  queryOptions?: Partial<UseQueryOptions<${modelName}, Error>>
) => {
  return useQuery({
    queryKey: ['${modelNameLower}Unique', option],
    queryFn: () => preload.get${modelName}Unique(option),
    ...queryOptions,
  });
};

export const useUpdate${modelName} = (
  mutationOptions?: Partial<UseMutationOptions<${modelName}, Error, Prisma.${modelName}UpdateArgs>>,
  validations?: ((params: Prisma.${modelName}UpdateArgs) => Promise<void>)[]
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.${modelName}UpdateArgs) =>
      preload.update${modelName}(option, validations) as unknown as Promise<${modelName}>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${modelNameLower}'] });
    },
    ...mutationOptions,
  });
};

export const useDelete${modelName} = (
  mutationOptions?: Partial<UseMutationOptions<${modelName}, Error, Prisma.${modelName}DeleteArgs>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (option: Prisma.${modelName}DeleteArgs) =>
      preload.delete${modelName}(option) as unknown as Promise<${modelName}>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['${modelNameLower}'] });
    },
    ...mutationOptions,
  });
};
`;
};

const generateFileContent = (models: {name: string}[]): string => {
  const modelNames = models.map(model => model.name).join(', ');
  const imports = `
import type { Prisma, ${modelNames} } from '@prisma/client';
import { ipcRenderer } from 'electron';
import type { PrismaClient } from 'prisma/prisma-client/extension';

export type PrismaAction = 'findMany' | 'findUnique' | 'findFirst' | 'create' | 'update' | 'delete';

export type PrismaQueryParams = {
  model: keyof PrismaClient;
  action: PrismaAction;
  params?: unknown;
  validations?: ((params: any) => Promise<void>)[];
};
export type PrismaQuerryResponse = { result?: unknown; error?: Error };

export const sendPrismaQuery = async <T>(option: PrismaQueryParams & { params: T }): Promise<unknown> => {
  const { model, action, params, validations } = option;
  try {
    if (validations && (action === 'create' || action === 'update')) {
      for (const validation of validations) {
        await validation(params);
      }
    }

    const { result, error } = (await ipcRenderer.invoke('prisma-query', { model, action, params })) as PrismaQuerryResponse;
    if (error) {
      throw error;
    }
    return result;
  } catch (error) {
    console.error('Validation or Prisma query error:', error);
    throw error;
  }
};
`;

  const functions = models.map(generateCRUD).join('\n');

  return imports + functions;
};

const generateHooksFileContent = (models: {name: string}[]): string => {
  const modelNames = models.map(model => model.name).join(', ');
  const imports = `
import type { Prisma, ${modelNames} } from '@prisma/client';
import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import * as preload from '#preload';
`;

  const hooks = models.map(generateHooks).join('\n');

  return imports + hooks;
};

const main = async (): Promise<void> => {
  const models = Prisma.dmmf.datamodel.models.map(m => ({name: m.name}));
  const fileContent = generateFileContent(models);
  const hooksFileContent = generateHooksFileContent(models);
  fs.mkdirSync(path.dirname(outputPath), {recursive: true});
  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  fs.mkdirSync(path.dirname(hooksOutputPath), {recursive: true});
  fs.writeFileSync(hooksOutputPath, hooksFileContent, 'utf-8');
  console.log(`Generated endpoints file at ${outputPath}`);
  console.log(`Generated hooks file at ${hooksOutputPath}`);
};

main().catch(console.error);
