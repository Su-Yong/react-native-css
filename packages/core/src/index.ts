import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { parse } from './css/parser/parser';
import { BaseElement, Element } from './css/model/declaration';
import { AliasProcessor } from './processor/alias';
import { viewAliasMatcher } from './processor/alias/view';
import { DehyphenProcessor } from './processor/dehyphen';
import { VendorIgnoreProcessor } from './processor/vendor';
import { AngleType, ColorType, FunctionType, GradientType, IdentType, LengthType, NumberType, PercentageType, StringType, TimeType, URLType, Value } from './css/model/value';
import { isLengthValue } from './css/parser/value/dimension';

export type ReactNativeStyle = ViewStyle | TextStyle | ImageStyle;

const processors = [
  new DehyphenProcessor(),
  new VendorIgnoreProcessor(),
  new AliasProcessor(viewAliasMatcher),
];

const resolveValue = (value: Value): unknown => {
  if (value.type === LengthType) return value.value;
  if (value.type === AngleType) return value.radian;
  if (value.type === TimeType) return value.ms;
  
  if (value.type === PercentageType) return `${value.value}%`;
  if (value.type === FunctionType) return '--not-supported';

  if (value.type === ColorType) {
    if ('red' in value) {
      return `rgba(${value.red}, ${value.green}, ${value.blue}, ${value.alpha})`;
    } else {
      return '--not-supported';
    }
  }
  if (value.type === GradientType) return '--not-supported';
  if (value.type === URLType) return '--not-supported';

  if (value.type === IdentType) return value.identifier;
  if (value.type === StringType) return value.value;
  if (value.type === NumberType) return value.value;
  
  return '--invalid';
};

const semicolonRegex = /\s*[a-zA-Z\-]*\s*\:/;
type Stringable = string | number | bigint | boolean;
export const css = (array: TemplateStringsArray, ...args: Stringable[]): ReactNativeStyle => {
  if (__DEV__) console.warn('css is running in compile time');

  const str = array.reduce((prev, curr, index) => {
    let inner = '';
    if (index > 0) {
      inner = args[index - 1].toString();
      if (curr.match(semicolonRegex)) inner += ';';
    }

    return prev + inner + curr;
  }, '');
  const ast = parse(str);

  let tree: Element[] = ast as Element[];
  processors.forEach((processor) => {
    let newTree: Element[] = [];

    tree.forEach((element) => {
      const elements = processor.process(element);

      if (Array.isArray(elements)) newTree.push(...elements);
      else newTree.push(elements);
    });

    tree = newTree;
  });

  const result: Record<string, unknown> = {};

  tree.forEach((element) => {
    if (element.type === 'declaration') {
      result[element.property] = resolveValue(element.values[0]);
    }
  })

  // console.log('tree', JSON.stringify(tree, null, 2));
  return result as ReactNativeStyle;
};
