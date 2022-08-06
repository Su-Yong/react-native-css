import { Value, Selector } from '../../css/model';

export interface Variable<T extends Value> {
  identifier: string;
  value: T;
}

export type Scope = {
  selectors: Selector[];
  parent: Scope | null;
  variables: Variable<Value>[];
};

export interface CSSContext {
  params: any[];
  scope: Scope;
}
