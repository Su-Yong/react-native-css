import { Value, Selector } from '../../css/model';

export type Scope = {
  selectors: Selector[];
  parent: Scope | null;
};

export interface Variable<T extends Value> {
  identifier: string;
  value: T;
  scope: Scope;
}

export interface CSSContext {
  variables: Variable<Value>[];
  params: any[];
  scope: Scope;
}
