import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { compile } from 'stylis';
import { DehyphenProcessor } from './processor/dehyphen';
import { VendorIgnoreProcessor } from './processor/vendor';

export type ReactNativeStyle = ViewStyle | TextStyle | ImageStyle;

const processors = [
  DehyphenProcessor,
  VendorIgnoreProcessor,
];
export const css = (array: TemplateStringsArray, ...args: unknown[]): ReactNativeStyle => {
  if (__DEV__) console.warn('css is running in compile time');

  const str = array.reduce((prev, curr, index) => prev + args[index] + curr, '');
  const ast = compile(str);

  processors.forEach((processor) => {
    ast.forEach((element) => {
      processor.process(element);
    });
  });

  return {} as ReactNativeStyle;
};
