import { Value, Selector } from '../../css/model';

export interface Variable<T extends Value> {
  identifier: string;
  value: T;
  scope: Selector;
}

export interface CSSContext {
  variables: Variable<Value>[];
  params: any[];
  scope: Selector;
}
