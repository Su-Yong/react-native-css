import { PluginObj } from '@babel/core';
import visitor from './visitor';

type PluginType = () => PluginObj;

const plugin: PluginType = () => ({
  name: '@suyongs/babel-plugin-react-native-css',
  visitor,
});

export default plugin;
