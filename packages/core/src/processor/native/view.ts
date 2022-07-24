import { LengthType } from '../../css/dimension';
import { ColorType } from '../../css/image';
import { IdentType } from '../../css/type';
import { AliasKey, matchAliasKey, Matcher, Union } from '../keyMatcher';

const borderType = Union(IdentType, LengthType, ColorType);
const matcher: Matcher<any>[] = [
  [{ name: 'background' }, () => {

  }],
  [{ name: 'border', types: [borderType, borderType, borderType] }, () => {

  }],
  [{ name: 'box-shadow' }, () => {

  }],
]

export const convertViewStyle = () => {
  matchAliasKey(matcher, key)
}