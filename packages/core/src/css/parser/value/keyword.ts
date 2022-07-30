import { IdentValue, NumberValue, StringValue } from '../../model/value';

export const identValue = (str: string): IdentValue => ({
  type: '<ident>',
  raw: str,
  identifier: str.replace(/^"/, '').replace(/(?<=[^\\])\"$/, ''),
});

export const numberValue = (str: string): NumberValue => ({
  type: '<number>',
  raw: str,
  value: Number(str),
});
export const stringValue = (str: string): StringValue => ({
  type: '<string>',
  raw: str,
  quoteType: str[0] === '"' ? 'double' : 'single',
  value: str.slice(1, str.length - 1),
});

export const isNumberValue = (str: string) => Number.isFinite(Number(str));
export const isStringValue = (str: string): boolean => {
  if (str[0] === '"' && str[str.length - 1] === '"') return true;
  if (str[0] === '\'' && str[str.length - 1] === '\'') return true;

  return false;
};
