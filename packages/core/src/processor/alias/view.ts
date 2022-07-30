import { Element } from '../../css/model/declaration';
import { ColorType, IdentType, LengthType } from '../../css/model/value';
import { AliasMap, createAliasMatcher } from '../alias';

const keyChangeExecutor = (key: string) => (element: Element): Element => {
  if (element.type === 'declaration') {
    element.property = key;
  }

  return element;
};

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
  ],
};

export const viewAliasMatcher = createAliasMatcher(viewAlias);
