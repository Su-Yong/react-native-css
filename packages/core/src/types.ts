import { ViewStyle, TextStyle, ImageStyle, ViewProps, ImageProps, TextProps } from 'react-native';
import { AnimateProps } from 'react-native-reanimated';
import { ComposedGesture, GestureType } from 'react-native-gesture-handler';

export type ReactNativeStyle = ViewStyle | TextStyle | ImageStyle;
export type ReactNativeProps = ViewProps | TextProps | ImageProps;
export type Stringable = string | number | bigint | boolean;

export type NativeCSS<P extends object> = (
  Pick<AnimateProps<P>, 'style' | 'animatedProps' | 'layout' | 'entering' | 'exiting'>
  & {
    gesture?: ComposedGesture | GestureType;
  }
);
export type NativeCSSHook<P extends object = ReactNativeProps, Arguments extends unknown[] = unknown[]> = (...args: Arguments) => NativeCSS<P>;
