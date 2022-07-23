import { types } from '@babel/core';

export interface BaseValueElement<T extends string> {
  type: T;
}

export interface StringValueElement extends BaseValueElement<'string'> {
  value: string;
}
export interface ExpressionValueElement extends BaseValueElement<'expression'> {
  value: types.Expression;
}

export type ValueElement = StringValueElement | ExpressionValueElement;
