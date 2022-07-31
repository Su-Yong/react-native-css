import { parse } from './css/parser';
import { Element } from './css/model';
import { rawStringResolver } from './resolver/rawStringResolver';
import { Stringable, NativeCSSHook, ReactNativeStyle } from './types';
import { DehyphenProcessor, AliasProcessor } from './processor';
import { viewAliasMatcher } from './processor/alias/view';
import { resolveCSSValue } from './resolver/cssResolver';
import { useMemo } from 'react';
import { resolveNCSSValue } from './resolver/ncssResolver';

const processors = [
  new DehyphenProcessor(),
  new AliasProcessor(viewAliasMatcher),
];

export const ncss = (array: TemplateStringsArray, ...args: Stringable[]): NativeCSSHook => {
  if (__DEV__) console.warn('ncss is running in compile time');

  const str = rawStringResolver(array, ...args);

  let tree = parse(str);
  processors.forEach((processor) => {
    let newTree: Element[] = [];

    tree.forEach((element) => {
      const elements = processor.process(element);

      if (Array.isArray(elements)) newTree.push(...elements);
      else newTree.push(elements);
    });

    tree = newTree;
  });

  return (...args) => {
    const style = (() => {
      let result: Record<string, unknown> = {};

      tree.forEach((element) => {
        if (element.type === 'declaration') {
          result = {
            ...result,
            ...resolveNCSSValue(element, args),
          };
        }
      });

      return result as ReactNativeStyle;
    })();
  
    return {
      style,
    };
  };
};
