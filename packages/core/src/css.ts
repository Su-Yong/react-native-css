import { parse } from './css/parser/parser';
import { Element } from './css/model/element';
import { AliasProcessor } from './processor/alias';
import { viewAliasMatcher } from './processor/alias/view';
import { DehyphenProcessor } from './processor/dehyphen';
import { resolveCSSValue } from './resolver/cssResolver';
import { Stringable, ReactNativeStyle } from './types';
import { rawStringResolver } from './resolver/rawStringResolver';

const processors = [
  new DehyphenProcessor(),
  new AliasProcessor(viewAliasMatcher),
];

export const css = (array: TemplateStringsArray, ...args: Stringable[]): ReactNativeStyle => {
  if (__DEV__) console.warn('css is running in compile time');

  const str = rawStringResolver(array, ...args);
  const ast = parse(str);

  let tree: Element[] = ast as Element[];
  processors.forEach((processor) => {
    let newTree: Element[] = [];

    tree.forEach((element) => {
      const elements = processor.process(element);

      if (Array.isArray(elements)) newTree.push(...elements);
      else newTree.push(elements);
    });

    tree = newTree;
  });

  const result: Record<string, unknown> = {};

  tree.forEach((element) => {
    if (element.type === 'declaration') {
      result[element.property] = resolveCSSValue(element.values[0]);
    }
  });

  return result as ReactNativeStyle;
};
