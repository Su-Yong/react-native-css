import { AngleType, ColorType, FunctionType, IdentType, LengthType, TimeType, Value } from '@suyongs/react-native-css';
import { Expression, PatternLike, TSType } from '@babel/types';

declare type BabelTypes = typeof import('@babel/types');

export interface ValueResolverContext {
  type: BabelTypes;
  expressionMapper: Map<string, Expression>;
}
const valueResolver = (
  value: Value,
  {
    type: t,
    expressionMapper,
  }: ValueResolverContext,
): Expression | PatternLike => {
  const empty = t.nullLiteral();
  
  if (value.type === LengthType) return t.numericLiteral(value.value);
  if (value.type === AngleType) return t.numericLiteral(value.radian);
  if (value.type === TimeType) return t.numericLiteral(value.ms);

  if (value.type === ColorType) {
    if ('red' in value) {
      return t.stringLiteral(`rgba(${value.red}, ${value.green}, ${value.blue}, ${value.alpha})`);
    } else {
      throw Error('Not implemented');
    }
  }

  if (value.type === FunctionType) {
    if (value.name === 'expression') {
      if (value.parameters[0].type === IdentType) {
        return expressionMapper.get(value.parameters[0].identifier) ?? empty;
      }
    }
  }

  return empty;
};

export default valueResolver;
