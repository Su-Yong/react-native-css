import { DeclarationElement } from '../../css/model/element';
import { ColorType, ColorValue, IdentType, IdentValue, LengthType, LengthValue, PercentageType, PercentageValue, Value } from '../../css/model/value';
import { AliasMap, AliasRule, createAliasMatcher, keyChangeExecutor } from '../alias';
import { createDirectionalAlias } from './directional';

const borderExeceutor = (style?: IdentValue, width?: LengthValue | PercentageValue, color?: ColorValue) => {
  const result: DeclarationElement[] = [];

  if (style) {
    result.push({
      type: 'declaration',
      raw: `border-style: ${style.raw}`,
      property: 'borderStyle',
      values: [style],
    });
  }
  if (color) {
    result.push({
      type: 'declaration',
      raw: `border-color: ${color.raw}`,
      property: 'borderColor',
      values: [color],
    });
  }
  if (width) {
    result.push({
      type: 'declaration',
      raw: `border-width: ${width.value}`,
      property: 'borderWidth',
      values: [width]
    });
  }

  return result;
}

const borderAliasTypes = [
  IdentType,
  LengthType, PercentageType,
  ColorType,
];

const borderAlias: AliasRule[] = [];
borderAliasTypes.forEach((first) => {
  borderAliasTypes.forEach((second) => {
    const types = [first, second];

    if (first === second) return;
    if (types.filter((it) => it === LengthType || it === PercentageType).length > 1) {
      return;
    }

    const styleIndex = types.findIndex((it) => it === IdentType);
    const widthIndex = types.findIndex((it) => it === LengthType || it === PercentageType);
    const colorIndex = types.findIndex((it) => it === ColorType);

    borderAlias.push({
      types,
      executor: (element) => borderExeceutor(
        element.values[styleIndex] as IdentValue,
        element.values[widthIndex] as LengthValue | PercentageValue,
        element.values[colorIndex] as ColorValue,
      ),
    });
  });
});
borderAliasTypes.forEach((first) => {
  borderAliasTypes.forEach((second) => {
    borderAliasTypes.forEach((third) => {
      const types = [first, second, third];

      if (first === second || second === third || third === first) {
        return;
      }
      if (types.filter((it) => it === LengthType || it === PercentageType).length > 1) {
        return;
      }

      const styleIndex = types.findIndex((it) => it === IdentType);
      const widthIndex = types.findIndex((it) => it === LengthType || it === PercentageType);
      const colorIndex = types.findIndex((it) => it === ColorType);

      if (styleIndex < 0 || widthIndex < 0 || colorIndex < 0) throw Error('Not supported css value type');

      borderAlias.push({
        types,
        executor: (element) => borderExeceutor(
          element.values[styleIndex] as IdentValue,
          element.values[widthIndex] as LengthValue | PercentageValue,
          element.values[colorIndex] as ColorValue,
        ),
      });
    });
  });
});

const viewAlias: AliasMap = {
  background: [
    {
      types: [ColorType],
      executor: keyChangeExecutor('backgroundColor'),
    },
  ],
  border: [
    {
      types: [ColorType],
      executor: keyChangeExecutor('borderColor'),
    },
    {
      types: [IdentType],
      executor: keyChangeExecutor('borderStyle'),
    },
    {
      types: [LengthType],
      executor: keyChangeExecutor('borderWidth'),
    },
    ...borderAlias,
  ],
  borderWidth: createDirectionalAlias(
    (direction) => `border${direction[0].toUpperCase()}${direction.slice(1)}Width`,
    (direction) => `border-${direction}-width`,
  ),
  padding: createDirectionalAlias(
    (direction) => `padding${direction[0].toUpperCase()}${direction.slice(1)}`,
    (direction) => `padding-${direction}`,
  ),
  margin: createDirectionalAlias(
    (direction) => `margin${direction[0].toUpperCase()}${direction.slice(1)}`,
    (direction) => `margin-${direction}`,
  ),
  inset: [
    {
      types: [[LengthType, PercentageType]],
      executor: (element) => [
        {
          type: 'declaration',
          raw: `top: ${element.values[0].raw}`,
          property: 'top',
          values: [element.values[0]],
        },
        {
          type: 'declaration',
          raw: `right: ${element.values[0].raw}`,
          property: 'right',
          values: [element.values[0]],
        },
        {
          type: 'declaration',
          raw: `bottom: ${element.values[0].raw}`,
          property: 'bottom',
          values: [element.values[0]],
        },
        {
          type: 'declaration',
          raw: `left: ${element.values[0].raw}`,
          property: 'left',
          values: [element.values[0]],
        },
      ],
    },
    ...createDirectionalAlias(
      (direction) => direction,
      (direction) => direction,
    ),
  ],
};

export const viewAliasMatcher = createAliasMatcher(viewAlias);
