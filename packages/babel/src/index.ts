import {
  PluginObj, types
} from '@babel/core';
import { getUniqueId } from './utils/uniqueId';
import { extractExpression, isExpression } from './utils/isExpression';
import { DehyphenProcessor, AliasProcessor, Value } from '@suyongs/react-native-css';
import { viewAliasMatcher } from '@suyongs/react-native-css/src/processor/alias/view';

import { parse, Element } from '@suyongs/react-native-css';
import valueResolver, { ValueResolverContext } from './resolver/valueResolver';

declare type BabelTypes = typeof import('@babel/types');
type PluginType = ({ types }: { types: BabelTypes }) => PluginObj;

const plugin: PluginType = ({ types: t }) => {
  const processors = [
    new DehyphenProcessor(),
    new AliasProcessor(viewAliasMatcher),
  ];

  return {
    visitor: {
      TaggedTemplateExpression(path) {
        if (path.node.tag.type === 'Identifier' && path.node.tag.name === 'css') {
          let result = '';

          const interpolate = new Map<string, types.Expression>();
          path.node.quasi.quasis.forEach((quasi, index) => {
            let str = quasi.value.raw;
            
            const expression = path.node.quasi.expressions[index];
            if (expression) {
              const id = '--' + getUniqueId();
              const placeholder = `expression(${id})`;
              str += placeholder;

              if (t.isTSType(expression)) throw Error('interpolator must be "Expression" not "TSType"');
              interpolate.set(id, expression);
            }
            
            result += str;
          });

          let ast: Element[] = parse(result);
          processors.forEach((processor) => {
            let newTree: Element[] = [];

            ast.forEach((element) => {
              const elements = processor.process(element);

              if (Array.isArray(elements)) newTree.push(...elements);
              else newTree.push(elements);
            });

            ast = newTree;
          });

          console.log('ast', JSON.stringify(ast, null, 2));

          const resolverContext: ValueResolverContext = {
            type: t,
            expressionMapper: interpolate,
          };
          const properties: types.ObjectProperty[] = [];
          ast.forEach((node) => {
            if (node.type === 'declaration') {
              if (node.values.length > 1) throw Error(`React Native Style can have only one parameter (${node.values.length} parameters provided)`);

              const key = node.property;
              const value = valueResolver(node.values[0], resolverContext);

              properties.push(t.objectProperty(t.identifier(key), value));
            }
          });

          path.replaceWith(t.objectExpression(properties));
        }
      },
    },
  };
};

export default plugin;
