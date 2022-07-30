import { css } from '../src/css';

describe('css runtime', () => {
  it('normal', () => {
    const style = css`
      background: red;
    `;

    expect(style).toEqual({
      backgroundColor: 'rgba(255, 0, 0, 1)',
    });
  });

  it('interpolate', () => {
    const size = 24;
    const style = css`
      width: ${size}
      height: ${size}in;
    `;

    expect(style).toEqual({
      width: size,
      height: size * 96,
    });
  });
});
