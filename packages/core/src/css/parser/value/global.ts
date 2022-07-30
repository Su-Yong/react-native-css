import { PercentageValue } from '../../model/value';

const percentageRegex = /^((?:[0-9]*\.[0-9]+)|(?:[0-9]+\.?[0-9]*))\%$/;

export const percentageValue = (str: string): PercentageValue => {
  const [_, num] = Array.from(str.match(percentageRegex) ?? []);

  if (num === undefined) throw Error(`"${str}" is not <percentage>`);

  return {
    type: '<percentage>',
    raw: str,
    value: Number(num),
  };
};

export const isPercentageValue = (str: string): boolean => !!str.match(percentageRegex);
