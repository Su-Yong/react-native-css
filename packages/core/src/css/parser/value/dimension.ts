import { LengthValue, AngleValue, TimeValue } from '../../model/value';

const unitRegex = /^((?:[0-9]*\.[0-9]+)|(?:[0-9]+\.?[0-9]*))([a-zA-Z]+)$/;
const angleRegex = /(?:to\s)?(?:left|right|top|bottom)/;

const lengthUnit: Record<string, (value: number) => number> = {
  px: (it) => it,
  pt: (it) => it * 96 / 72,
  pc: (it) => it * 96 / 16,
  in: (it) => it * 96,
  Q: (it) => it * 96 / 40,
  mm: (it) => it * 96 / 25.4,
  cm: (it) => it * 96 / 2.54,
};
const angleUnit: Record<string, (value: number) => number> = {
  deg: (it) => it / 180 * Math.PI,
  grad: (it) => it / 200 * Math.PI,
  rad: (it) => it,
  turn: (it) => it * 2 * Math.PI,
};
const timeUnit: Record<string, (value: number) => number> = {
  ms: (it) => it,
  s: (it) => it * 1000,
};

export const lengthValue = (str: string): LengthValue => {
  const [_, num, unit] = Array.from(str.match(unitRegex) ?? []);
  const converter = lengthUnit[unit];

  if (num === undefined || !converter) throw Error(`"${str}" is not <length>`);

  return {
    type: '<length>',
    raw: str,
    value: converter(Number(num)),
    unit,
  };
};
export const angleValue = (str: string): AngleValue => {
  const [_, num, unit] = Array.from(str.match(unitRegex) ?? []);
  const converter = angleUnit[unit];

  if (num === undefined || !converter) {
    if (str.match(angleRegex)) {
      let degree = 0;
      let offset = 0;

      if (str.includes('left')) degree = Math.PI / 2;
      if (str.includes('right')) degree = Math.PI / 2 * 3;
      if (str.includes('top')) degree = Math.PI;
      if (str.includes('bottom')) degree = 0;
      if (str.includes('to')) offset = Math.PI;

      return {
        type: '<angle>',
        raw: str,
        radian: (degree + offset) % (Math.PI * 2),
      };
    }

    throw Error(`"${str}" is not <angle>`);
  }

  return {
    type: '<angle>',
    raw: str,
    radian: converter(Number(num)),
  };
};
export const timeValue = (str: string): TimeValue => {
  const [_, num, unit] = Array.from(str.match(unitRegex) ?? []);
  const converter = timeUnit[unit];

  if (num === undefined || !converter) throw Error(`"${str}" is not <time>`);

  return {
    type: '<time>',
    raw: str,
    ms: converter(Number(num)),
  };
};

export const isLengthValue = (str: string): boolean => {
  const unit = str.match(unitRegex)?.[2] ?? '';

  return !!lengthUnit[unit];
}
export const isAngleValue = (str: string): boolean => {
  const unit = str.match(unitRegex)?.[2] ?? '';

  return !!angleUnit[unit] || !!str.match(angleRegex);
}
export const isTimeValue = (str: string): boolean => {
  const unit = str.match(unitRegex)?.[2] ?? '';

  return !!timeUnit[unit];
}