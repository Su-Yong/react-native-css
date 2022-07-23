import {
  PluginObj, types
} from '@babel/core';
import { getUniqueId } from './utils/uniqueId';
import { compile } from 'stylis';
import DeclarationProcessor from './process/DeclarationProcessor';
import LengthValue from './value/LengthValue';
import AngleValue from './value/AngleValue';
import TimeValue from './value/TimeValue';
import { ValueElement } from './types/tree';
import { extractExpression, isExpression } from './utils/isExpression';
import ExpressionValue from './value/ExpressionValue';

declare type BabelTypes = typeof import('@babel/types');
type PluginType = ({ types }: { types: BabelTypes }) => PluginObj;

const plugin: PluginType = ({ types: t }) => {
  let declarationProcessor = new DeclarationProcessor();
  declarationProcessor.use(ExpressionValue); // register first

  declarationProcessor.use(LengthValue);
  declarationProcessor.use(AngleValue);
  declarationProcessor.use(TimeValue);
  // declarationProcessor.use(VariableValue);

  return {
    visitor: {
      TaggedTemplateExpression(path) {
        if (path.node.tag.type === 'Identifier' && path.node.tag.name === 'css') {
          let result = '';

          const interpolate = new Map<string, typeof path.node.quasi.expressions[0]>();
          path.node.quasi.quasis.forEach((quasi, index) => {
            let str = quasi.value.raw;
            
            const expression = path.node.quasi.expressions[index];
            if (expression) {
              const id = getUniqueId();
              const placeholder = `expression(${id})`;
              str += placeholder;

              interpolate.set(id, expression);
            }
            
            result += str;
          });

          const ast = compile(result);
          console.log('ast', ast);

          const properties: types.ObjectProperty[] = [];
          ast.forEach((node) => {
            if (node.type === 'decl') {
              const key = Array.isArray(node.props) ? node.props.at(-1) : node.props;
              let value: ValueElement;

              if (typeof node.children === 'string') {
                if (isExpression(node.children)) {
                  const id = extractExpression(node.children);
                  const expression = interpolate.get(id) as types.Expression;

                  value = {
                    type: 'expression',
                    value: expression,
                  };
                } else {
                  value = { type: 'string', value: node.children };
                }
              }
              else throw Error('Unsupport type');

              properties.push(
                t.objectProperty(
                  t.identifier(key!),
                  declarationProcessor.process(value),
                ),
              );
            }
          });

          path.replaceWith(t.objectExpression(properties));
        }
      },
    },
  };
};

export default plugin;
