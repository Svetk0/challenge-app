export const isDefined = (value: unknown): boolean => value !== undefined && value !== null;

export const isDefinedString = (value: unknown): boolean =>
  typeof value === 'string' && value.length > 0;

export const isDefinedArray = (value: unknown): boolean => Array.isArray(value) && value.length > 0;

export const isDefinedNumber = (value: unknown): boolean =>
  typeof value === 'number' && !Number.isNaN(value);

export const isDefinedFunction = (value: unknown): boolean =>
  isDefined(value) && typeof value === 'function';
