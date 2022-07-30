import { Value, CSSType } from '../css/model/value';
import { Element } from '../css/model/declaration';

import Processor from './processor';

export type AliasExecutor = (element: Element) => Element[] | Element;
export type AliasMatcher = (key: string, values: Value[]) => AliasExecutor | null;
export type AliasRule = {
  types: CSSType[];
  executor: AliasExecutor;
};
export type AliasMap = Record<string, AliasRule[]>;

export const createAliasMatcher = (aliasMap: AliasMap): AliasMatcher => (key, values) => {
  const matcher = aliasMap[key];

  if (!matcher || matcher.length === 0) return null;
  
  let result = null;
  matcher.forEach(({ types, executor }) => {
    if (types.some((it, index) => values[index].type !== it)) return;

    result = executor;
  });

  return result;
};

export class AliasProcessor implements Processor {
  private matcher: AliasMatcher | null = null;

  constructor(matcher: AliasMatcher | null = null) {
    this.matcher = matcher;
  }

  setMatcher(matcher: AliasMatcher) {
    this.matcher = matcher;
  }

  process(element: Element): Element | Element[] {
    if (element.type !== 'declaration') return element;
    if (!this.matcher) return element;

    const executor = this.matcher(element.property, element.values);
    
    return executor?.(element) ?? [element];
  }
};
