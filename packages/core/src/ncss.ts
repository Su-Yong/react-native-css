import { nanoid } from 'nanoid/non-secure';

import { parseElement } from './css/parser';
import { Element } from './css/model';
import { rawStringResolver } from './resolver/rawStringResolver';
import { Stringable, NativeCSSHook, ReactNativeStyle } from './types';
import { DehyphenProcessor, AliasProcessor } from './processor';
import { viewAliasMatcher } from './processor/alias/view';
import { resolveNCSS, resolveNCSSValue } from './ncss/resolver/ncssResolver';
import { CSSContext } from './ncss/model/context';

const processors = [
  new DehyphenProcessor(),
  new AliasProcessor(viewAliasMatcher),
];

export const ncss = (array: TemplateStringsArray, ...args: Stringable[]): NativeCSSHook => {
  if (__DEV__) console.warn('ncss is running in compile time');

  const str = rawStringResolver(array, ...args);

  let tree = parseElement(str);
  processors.forEach((processor) => {
    let newTree: Element[] = [];

    tree.forEach((element) => {
      const elements = processor.process(element);

      if (Array.isArray(elements)) newTree.push(...elements);
      else newTree.push(elements);
    });

    tree = newTree;
  });

  const ncssDescriber = resolveNCSS(tree);
  const rootId = nanoid();
  const rootScope = {
    raw: `#${rootId}`,
    id: [rootId],
    class: [],
    attributes: {},
    pseudoClass: [],
    specificity: {
      id: 1,
      class: 0,
      type: 0,
    },
  };

  console.log('ncss', JSON.stringify(tree, null, 2), JSON.stringify(ncssDescriber, null, 2));
  return (...args) => {
    const context: CSSContext = {
      variables: [],
      params: args,
      scope: rootScope,
    };

    const style: ReactNativeStyle = {};
    Object.entries(ncssDescriber).forEach(([key, value]) => {
      if (typeof value['&'] === 'function') {
        style[key as keyof ReactNativeStyle] = value['&'](context) as any;
      } else {
        style[key as keyof ReactNativeStyle] = value['&'] as any;
      }
    });

    return {
      style,
    };
  };
};
