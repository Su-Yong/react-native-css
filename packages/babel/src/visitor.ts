import { NodePath, Visitor, PluginPass, types } from '@babel/core';
import { DehyphenProcessor, AliasProcessor } from '@suyongs/react-native-css';
import { viewAliasMatcher } from '@suyongs/react-native-css/src/processor/alias/view';
import valueResolver, { ValueResolverContext } from './resolver/valueResolver';
import { getUniqueId } from './utils/uniqueId';
import { parseElement, Element } from '@suyongs/react-native-css';

import { types as t } from '@babel/core';
import { Program } from '@babel/types';

const processors = [
  new DehyphenProcessor(),
  new AliasProcessor(viewAliasMatcher),
];

let root: NodePath<Program> | null = null;
const visitor: Visitor<PluginPass> = {
  Program(path) {
    root = path;
  },
  TaggedTemplateExpression(path, state) {
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

      let ast: Element[] = parseElement(result);
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
          const [value, runner] = valueResolver(node.values[0], resolverContext);

          if (runner && root) runner(root, path);
          properties.push(t.objectProperty(t.identifier(key), value));
        }
      });

      path.replaceWith(t.objectExpression(properties));
    }
  },
};

export default visitor;
