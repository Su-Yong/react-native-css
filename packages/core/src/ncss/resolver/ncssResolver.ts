import {
  Value,
  LengthType,
  AngleType,
  TimeType,
  PercentageType,
  FunctionType,
  ColorType,
  GradientType,
  URLType,
  IdentType,
  StringType,
  NumberType,
  DeclarationElement,
  Element,
} from '../../css/model';
import { resolveCSSValue } from '../../css/resolver/cssResolver';
import { CSSContext } from '../model/context';
import { NCSSObject } from '../model/describer';

export const resolveNCSSValue = (
  value: Value,
  scope: string,
): Error | unknown | ((context: CSSContext) => unknown) => {
  if (value.type === LengthType) return value.value;
  if (value.type === AngleType) return value.radian;
  if (value.type === TimeType) return value.ms;

  if (value.type === PercentageType) return `${value.value}%`;
  if (value.type === FunctionType) {
    if (value.name === 'param') {
      if (value.parameters[0].type !== NumberType) return Error(`"param" function's param type must be ${NumberType}, <any>?`);
      
      const index = value.parameters[0].value;
      if (!Number.isFinite(index)) return Error(`index must be finite number`);
 
      return (context: CSSContext) => {
        let result = context.params.at(index);

        if (result === undefined) {
          const resolvedValue = resolveNCSSValue(value.parameters[1], scope);

          if (typeof resolvedValue === 'function') result = resolvedValue;
          else result = resolvedValue;
        }

        return result;
      };
    }
    if (value.name === 'var') {
      if (value.parameters[0].type !== '<ident>') return Error(`"param" function's param type must be <ident>, <any>?`);

      return (context: CSSContext) => {
        throw Error('TODO');
      };
    }
  }

  if (value.type === ColorType) {
    if ('red' in value) {
      return `rgba(${value.red}, ${value.green}, ${value.blue}, ${value.alpha})`;
    } else {
      return '';
    }
  }
  if (value.type === GradientType) return {};
  if (value.type === URLType) return {};

  if (value.type === IdentType) return value.identifier;
  if (value.type === StringType) return value.value;
  if (value.type === NumberType) return value.value;

  return () => {};
};

export const resolveNCSS = <Context, Selectors extends string>(
  tree: Element[],
): NCSSObject<Context, Selectors> => {
  let style: NCSSObject<Context, Selectors> = {};

  const createObject = (elements: Element[], selector: Selectors) => {
    elements.forEach((element) => {
      if (element.type === 'declaration') {
        const value = resolveNCSSValue(element.values[0], selector);
        const property = element.property as keyof typeof style;
  
        // console.log('ncss resolve', property, value);

        if (value instanceof Error) {}
        else {
          if (!style[property]) style[property] = {};
          style[property]![selector] = value as any;
        }
      }

      if (element.type === 'rule') {
        createObject(element.elements, element.selectors.map((it) => it.raw).join(' ') as Selectors);
      }
    });
  };
  createObject(tree, '&' as Selectors);

  return style;
};
