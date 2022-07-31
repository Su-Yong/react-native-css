import { Value, CSSType } from '../css/model/value';
import { DeclarationElement, Element } from '../css/model/element';

import Processor from './processor';

export type AliasExecutor = (element: DeclarationElement) => Element[] | Element;
export type AliasMatcher = (key: string, values: Value[]) => AliasExecutor | null;
export type AliasRule = {
  types: (CSSType[] | CSSType)[];
  executor: AliasExecutor;
};
export type AliasMap = Record<string, AliasRule[]>;

export const createAliasMatcher = (aliasMap: AliasMap): AliasMatcher => (key, values) => {
  const matcher = aliasMap[key];

  if (!matcher || matcher.length === 0) return null;
  
  let result = null;
  matcher.forEach(({ types, executor }) => {
    if (
      types.some((type, index) => {
        if (Array.isArray(type)) return type.every((it) => it !== values[index]?.type)
        
        return values[index]?.type !== type;
      })
    ) return;

    result = executor;
  });

  return result;
};

export const keyChangeExecutor = (key: string) => (element: DeclarationElement): Element => {
  element.property = key;

  return element;
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
