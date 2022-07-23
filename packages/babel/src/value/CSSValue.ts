import { types } from '@babel/core';
import { ValueElement } from '../types/tree';

interface CSSValue<Data = string> {
  type: string;

  resolve(data: Data): types.Expression | types.PatternLike;
  is(data: Data): boolean;
}

export default CSSValue;
