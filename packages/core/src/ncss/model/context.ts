import { Value } from '../../css/model';

export interface Variable<T extends Value> {
  identifier: string;
  value: T;
  scope: string;
}

export interface CSSContext {
  variables: Variable<Value>[];
  params: any[];
}
