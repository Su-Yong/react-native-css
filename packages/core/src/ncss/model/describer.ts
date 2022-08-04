import { ReactNativeStyle } from '../../types';

export type NCSSObject<C, Selectors extends string> = {
  [Key in keyof ReactNativeStyle]: {
    [selector in Selectors]?: ReactNativeStyle[Key] | ((context: C) => ReactNativeStyle[Key]);
  };
};

export type NCSSDescriber = {
  
}