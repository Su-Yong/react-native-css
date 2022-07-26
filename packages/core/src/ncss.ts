import { nanoid } from 'nanoid/non-secure';

import { parseElement } from './css/parser';
import { Element } from './css/model';
import { rawStringResolver } from './resolver/rawStringResolver';
import { Stringable, NativeCSSHook, ReactNativeStyle } from './types';
import { DehyphenProcessor, AliasProcessor } from './processor';
import { viewAliasMatcher } from './processor/alias/view';
import { resolveNCSS } from './ncss/resolver/ncssResolver';
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

  const rootId = nanoid();
  const rootSelector = {
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
  const rootScope = {
    selectors: [rootSelector],
    parent: null,
  };

  const ncssDescriber = resolveNCSS(tree, rootScope);
  console.log('ncssDescriber', JSON.stringify(ncssDescriber, null, 2));

  return (...args) => {
    const context: CSSContext = {
      variables: [],
      params: args,
      scope: rootScope,
    };

    const style: ReactNativeStyle = {};
    Object.entries(ncssDescriber).forEach(([key, value]) => {
      const targetValue = value[rootSelector.raw];

      if (typeof targetValue === 'function') {
        style[key as keyof ReactNativeStyle] = targetValue(context) as any;
      } else {
        style[key as keyof ReactNativeStyle] = targetValue as any;
      }
    });

    return {
      style,
    };
  };
};
