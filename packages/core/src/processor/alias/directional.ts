import { DeclarationElement, FunctionType, LengthType, PercentageType, Value } from '../../css/model';
import { AliasRule } from '../alias';

export type DirectionalName = (name: string) => string;
interface DirectionalElementCreatorContext {
  name: DirectionalName;
  rawName: DirectionalName;
}
const createDirectionalElements = (
  { name, rawName }: DirectionalElementCreatorContext,
  top: Value,
  left: Value,
  bottom: Value,
  right: Value,
): DeclarationElement[] => ([
  {
    type: 'declaration',
    raw: `${rawName('top')}: ${top.raw}`,
    property: name('top'),
    values: [top],
  },
  {
    type: 'declaration',
    raw: `${rawName('left')}: ${left.raw}`,
    property: name('left'),
    values: [left],
  },
  {
    type: 'declaration',
    raw: `${rawName('bottom')}: ${bottom.raw}`,
    property: name('bottom'),
    values: [bottom],
  },
  {
    type: 'declaration',
    raw: `${rawName('right')}: ${right.raw}`,
    property: name('right'),
    values: [right],
  },
]);

const AllowType = [LengthType, PercentageType, FunctionType];
export const createDirectionalAlias = (
  name: (direction: string) => string,
  rawName: (direction: string) => string,
): AliasRule[] => {
  const context: DirectionalElementCreatorContext = { name, rawName };

  return [
    {
      types: [AllowType, AllowType],
      executor: (element) => {
        const vertical = element.values[0];
        const horizontal = element.values[1];

        return createDirectionalElements(context, vertical, horizontal, vertical, horizontal);
      },
    },
    {
      types: [AllowType, AllowType, AllowType],
      executor: (element) => {
        const top = element.values[0];
        const horizontal = element.values[1];
        const bottom = element.values[2];

        return createDirectionalElements(context, top, horizontal, bottom, horizontal);
      },
    },
    {
      types: [AllowType, AllowType, AllowType, AllowType],
      executor: (element) => {
        const top = element.values[0];
        const right = element.values[1];
        const bottom = element.values[2];
        const left = element.values[3];

        return createDirectionalElements(context, top, left, bottom, right);
      },
    },
  ];
};
