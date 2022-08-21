import { Value } from '../../../css/model';
import { Variable, Scope, CSSContext } from '../../model/context';
import { resolveNCSSValue } from '../ncssValueResolver';
import { FunctionResolver } from './function';

export const varResolver: FunctionResolver = (value, scope) => {
  if (value.parameters[0].type !== '<ident>') return Error(`"param" function's param type must be <ident>, <any>?`);
      
  const { identifier } = value.parameters[0];
  let variable: Variable<Value> | null = null;
  let nowScope: Scope | null = scope;
  do {
    variable = nowScope?.variables.find((it) => it.identifier === identifier) ?? null;
    nowScope = nowScope?.parent ?? null;
  } while(!variable && nowScope)

  return (context: CSSContext) => {
    const resolvedValue = resolveNCSSValue(
      variable?.value
        ? variable.value
        : value.parameters[1],
      scope,
    );

    if (typeof resolvedValue === 'function') return resolvedValue(context);
    return resolvedValue;
  };
};
