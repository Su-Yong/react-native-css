import { ColorType, FunctionType, IdentType, LengthType, PercentageType } from '../../css/model';
import { AliasMap, createAliasMatcher, keyChangeExecutor } from '../alias';
import { borderAlias } from './border';
import { createDirectionalAlias } from './directional';

const viewAlias: AliasMap = {
  background: [
    {
      types: [[ColorType, FunctionType]],
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
      types: [[LengthType, PercentageType, FunctionType]],
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
