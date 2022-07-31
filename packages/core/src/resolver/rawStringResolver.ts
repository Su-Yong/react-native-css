import { Stringable } from '../types';

const semicolonRegex = /\s*[a-zA-Z\-]*\s*\:/;
export const rawStringResolver = (array: TemplateStringsArray, ...args: Stringable[]): string => array.reduce((prev, curr, index) => {
  let inner = '';
  if (index > 0) {
    inner = args[index - 1].toString();
    if (curr.match(semicolonRegex)) inner += ';';
  }

  return prev + inner + curr;
}, '');
