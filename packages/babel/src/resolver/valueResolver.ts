import { AngleType, ColorType, FunctionType, GradientType, IdentType, LengthType, TimeType, URLType, Value } from '@suyongs/react-native-css';
import { Expression, PatternLike } from '@babel/types';
import { hash } from '../utils/uniqueId';
import { NodePath, types } from '@babel/core';

declare type BabelTypes = typeof import('@babel/types');

export interface ValueResolverContext {
  type: BabelTypes;
  expressionMapper: Map<string, Expression>;
}
export type ValueResolverRunner = (
  root: NodePath<types.Program>,
  path: NodePath<types.TaggedTemplateExpression>,
) => void;
const valueResolver = (
  value: Value,
  {
    type: t,
    expressionMapper,
  }: ValueResolverContext,
): [Expression | PatternLike] | [Expression | PatternLike, ValueResolverRunner] => {
  const empty = t.nullLiteral();
  
  if (value.type === LengthType) return [t.numericLiteral(value.value)];
  if (value.type === AngleType) return [t.numericLiteral(value.radian)];
  if (value.type === TimeType) return [t.numericLiteral(value.ms)];

  if (value.type === ColorType) {
    if ('red' in value) {
      return [t.stringLiteral(`rgba(${value.red}, ${value.green}, ${value.blue}, ${value.alpha})`)];
    } else {
      throw Error('Not implemented');
    }
  }
  if (value.type === GradientType) {

  }
  if (value.type === URLType) {
    const id = t.identifier(`URL${hash(value.url)}`);
    const URL = t.stringLiteral(value.url);

    const importDefaultSpecifier = t.importDefaultSpecifier(id);
    const importDeclaration = t.importDeclaration([importDefaultSpecifier], URL);

    return [id, (root) => {
      root.unshiftContainer('body', importDeclaration);
    }];
  }

  if (value.type === FunctionType) {
    if (value.name === 'expression') {
      if (value.parameters[0].type === IdentType) {
        return [expressionMapper.get(value.parameters[0].identifier) ?? empty];
      }
    }

    if (value.name === 'param') {
      throw Error('Not Implemented'); // param(0)
    }
  }

  return [empty];
};

export default valueResolver;
