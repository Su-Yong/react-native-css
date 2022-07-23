import CSSValue from './CSSValue';
import { types } from '@babel/core';
import UnitValue from './UnitValue';
import { ValueElement } from '../types/tree';

const allowExpression = [
  'BinaryExpression',
  'CallExpression',
  'ConditionalExpression',
  'Identifier',
  'StringLiteral',
  'MemberExpression',
  'UnaryExpression',
  'UpdateExpression',
  'TaggedTemplateExpression',
  'TemplateLiteral',
  'BigIntLiteral',
  'OptionalMemberExpression',
  'OptionalCallExpression',
  'DecimalLiteral',
  'NumericLiteral',
];

const ExpressionValue: CSSValue<string | ValueElement> = {
  type: '<expression>',
  is(element) {
    return typeof element !== 'string' && element.type === 'expression';
  },
  resolve(data) {
    if (typeof data === 'string' || data.type === 'string') throw Error(`ExpressionValue does not support string type ("${data}")`);

    return data.value;
  }
}

export default ExpressionValue;
