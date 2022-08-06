import { ColorValue, IdentValue, LengthValue, PercentageValue, DeclarationElement, IdentType, LengthType, PercentageType, ColorType, FunctionValue, FunctionType } from '../../css/model';
import { AliasRule } from '../alias';

const borderExeceutor = (
  style?: IdentValue | FunctionValue,
  width?: LengthValue | PercentageValue | FunctionValue,
  color?: ColorValue | FunctionValue,
) => {
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
      raw: `border-width: ${width.raw}`,
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
  
  FunctionType,
];

export const borderAlias: AliasRule[] = [];

borderAliasTypes.forEach((first) => {
  borderAliasTypes.forEach((second) => {
    const types = [first, second];

    if (first === second) return;
    if (
      types.filter((it) => it === LengthType || it === PercentageType).length > 1
      || types.includes(FunctionType)
    ) {
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
      if (
        types.filter((it) => it === LengthType || it === PercentageType).length > 1
        || types.filter((it) => it === FunctionType).length > 1) {
        return;
      }

      let styleIndex = types.findIndex((it) => it === IdentType);
      let widthIndex = types.findIndex((it) => it === LengthType || it === PercentageType);
      let colorIndex = types.findIndex((it) => it === ColorType);

      if (styleIndex < 0 && widthIndex >= 0 && colorIndex >= 0) styleIndex = types.findIndex((it) => it === FunctionType);
      if (styleIndex >= 0 && widthIndex < 0 && colorIndex >= 0) widthIndex = types.findIndex((it) => it === FunctionType);
      if (styleIndex >= 0 && widthIndex >= 0 && colorIndex < 0) colorIndex = types.findIndex((it) => it === FunctionType);
      
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
