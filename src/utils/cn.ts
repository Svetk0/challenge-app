import { isDefinedString } from './typeCheck';

export const cn = (...args: unknown[]): string =>
  args.filter((arg) => isDefinedString(arg)).join(' ');
