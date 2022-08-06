import { ReactNativeStyle } from '../../types';
import { CSSContext } from './context';

export type NCSSObject = {
  [Key in keyof ReactNativeStyle]: {
    [selector in string]?: ReactNativeStyle[Key] | ((context: CSSContext) => ReactNativeStyle[Key]);
  };
};

export type NCSSDescriber = {
  
}