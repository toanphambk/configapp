/* eslint-disable @typescript-eslint/no-explicit-any */
export type EnumOption = {
  label: string;
  value: any;
};

export const getEnumOptions = <T extends Record<string, any>>(enumObj: T): EnumOption[] => {
  return Object.keys(enumObj)
    .filter(key => isNaN(Number(key)))
    .map(key => ({
      label: key,
      value: enumObj[key as keyof T],
    }));
};

export const getNumArrFromEnum = <T extends object>(enumObj: T): number[] => {
  return Object.values(enumObj).filter(value => typeof value === 'number') as number[];
};
