# react-native-css
A fastest way to write react-native styles

Work In Progress...

# Features
* Support CSS shorthand properties
* Use CSS in **ZERO RUNTIME**
* Integrate with react-native-reanimated, react-native-gesture-handler (TODO)
* Support dynamic props style (TODO)
* Written in typescript

# Installation

1. install peer dependencies
 * [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/)
 * [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/installation)

2. install package
```sh
npm install @suyongs/react-native-css @suyongs/babel-plugin-react-native-css
```

3. register babel plugin
* babel.config.js
```js
import ReactNativeCSS from '@suyongs/babel-plugin-react-native-css';

// ...

export default {
  // ...
  plugins: [
    ReactNativeCSS(), // You must be insert this plugin before react-native-reanimated plugin
    'react-native-reanimated/plugin',
  ]
}
```

# Usage

* CSS
```tsx
import { css } from '@suyongs/react-native-css';

const buttonStyle = css`
  fontSize: 16px;

  padding: 4px 8px;
  border: solid 1px #00a4ff;
`;

const Button = () => {
  return (
    <Button style={buttonStyle}>
      Press!
    </Button>
  );
};
```

* DynamicPropsCSS (TODO)
```tsx
import { ncss } from '@suyongs/react-native-css';

const useButtonStyle = ncss`
  fontSize: param(0); /* param(0) means first parameter of useButtonStyle hook */

  padding: 4px 8px;
  border solid 1px param(1);
`;

const Button = () => {
  const { style: buttonStyle } = useButtonStyle(16, '#00a4ff');

  return (
    <Button style={buttonStyle}>
      Press!
    </Button>
  );
};
```

* AnimatedCSS (TODO)
```tsx
import Animated from 'react-native-reanimated';
import { ncss } from '@suyongs/react-native-css';

const useButtonStyle = ncss`
  fontSize: 16px;

  padding: 4px 8px;
  border: solid 1px #00a4ff;

  transition: transform 0.35s cubic-bezier(0, 0.5, 0.5, 1);

  &:hover {
    transform: scale(0.95);
  }
`;

const Button = () => {
  const animatedStyle = useButtonStyle(16, '#00a4ff');

  return (
    <GestureDetector gesture={animatedStyle.gesture}>
      <Animated.View
        style={animatedStyle.style}
      >
        Press!
      </Animated.View>
    </GestureDetector>
  );
};
```

* AnimatedCSS + StyledView (TODO)
```tsx
import { ncss, Styled } from '@suyongs/react-native-css';

const useButtonStyle = ncss`
  fontSize: 16px;

  padding: 4px 8px;
  border: solid 1px #00a4ff;

  transition: transform 0.35s cubic-bezier(0, 0.5, 0.5, 1);

  &:hover {
    transform: scale(0.95);
  }
`;

const Button = () => {
  const animatedStyle = useButtonStyle(16, '#00a4ff');

  return (
    <Styled.View css={animatedStyle.style}>
      Press!
    </Styled.View>
  );
};
```

# Author
| [![Su-Yong](https://avatars.githubusercontent.com/u/13764936?v=4&s=128)](https://github.com/Su-Yong) |
| ------- |
| Su-Yong |

# Roadmap
 - [X] Babel plugin
 - [X] Support shorthand property
 - [ ] Support dynamic properies
 - [ ] Integrate react-native-reanimated
