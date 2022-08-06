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
import { CSSContext, Scope } from '../model/context';
import { NCSSObject } from '../model/describer';
import { resolveNCSSValue } from './ncssValueResolver';

export const resolveNCSS = (
  tree: Element[],
  rootScope: Scope,
): NCSSObject => {
  let style: NCSSObject = {};

  const createObject = (elements: Element[], scope: Scope) => {
    elements.forEach((element) => {
      if (element.type === 'declaration') {
        const value = resolveNCSSValue(element.values[0], scope);
        const property = element.property as keyof typeof style;
  
        if (value instanceof Error) {}
        else {
          const selectors = [];

          let nowScope: Scope | null = scope;
          do {
            selectors.unshift(
              nowScope.selectors
                .map((selector) => selector.raw.replace(/^&/, ''))
                .join(' '),
            );
          } while (nowScope = nowScope.parent)

          const selector = selectors.join('');

          if (!style[property]) style[property] = {};
          style[property]![selector] = value as any;
        }
      }

      if (element.type === 'rule') {
        createObject(element.elements, {
          selectors: element.selectors,
          parent: scope,
        });
      }
    });
  };
  createObject(tree, rootScope);

  return style;
};
