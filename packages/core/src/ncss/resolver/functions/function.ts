import { Value, FunctionValue } from '../../../css/model';
import { CSSContext, Scope } from '../../model/context';

export type FunctionResolver = (
  value: FunctionValue<Value[]>,
  scope: Scope,
) => Error | ((context: CSSContext) => unknown);
