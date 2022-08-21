import { CalcValue, FunctionValue, Value } from '../../model/value';
import { tokenizeValue } from '../../tokenizer/tokenizer';
import { parseValue } from './parser';

const functionRegex = /^([a-zA-Z\-]+)\((.*)\)$/;
export const functionValue = (str: string): FunctionValue<Value[]> => {
  const [_, name, body] = Array.from(str.match(functionRegex) ?? []);

  const sliced = tokenizeValue(body, {
    dividers: [','],
    escape: ['"', '\''],
    level: [{
      open: '(',
      close: ')',
    }],
  });

  return {
    type: '<function>',
    raw: str,
    name,
    parameters: sliced.map((param) => parseValue(param.trim())[0]),
  };
};
export const calcValue = (str: string): CalcValue => {
  const [_, name, body] = Array.from(str.match(functionRegex) ?? []);

  return {
    type: '<calc>',
    raw: str,
    node: [],
    parameters: sliced.map((param) => parseValue(param.trim())[0]),
  };
};

export const isFunctionValue = (str: string): boolean => {
  const [_, name, body] = Array.from(str.match(functionRegex) ?? []);

  return !!name && !!body;
};
export const isCalcValue = (str: string): boolean => {
  const [_, name, body] = Array.from(str.match(functionRegex) ?? []);

  return name === 'calc' && !!body;
};
