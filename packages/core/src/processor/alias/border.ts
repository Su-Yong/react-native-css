import { ColorValue, IdentValue, LengthValue, PercentageValue, DeclarationElement, IdentType, LengthType, PercentageType, ColorType } from '../../css/model';
import { AliasRule } from '../alias';

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

export const borderAlias: AliasRule[] = [];

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