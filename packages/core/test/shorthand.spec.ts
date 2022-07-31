import { css } from '../src';

describe('shorthand', () => {
  it('border', () => {
    const border1 = css`
      border: solid 2px red;
    `;
    const border2 = css`
      border: 4px blue dotted;
    `;
    const border3 = css`
      border: rgba(3, 6, 9, 0.5) dashed;
    `;

    expect(border1).toEqual({
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: 'rgba(255, 0, 0, 1)',
    });
    expect(border2).toEqual({
      borderStyle: 'dotted',
      borderWidth: 4,
      borderColor: 'rgba(0, 0, 255, 1)',
    });
    expect(border3).toEqual({
      borderStyle: 'dashed',
      borderColor: 'rgba(3, 6, 9, 0.5)',
    });
  });
});
