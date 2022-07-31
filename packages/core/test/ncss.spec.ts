import { ncss } from '../src/ncss';

describe('ncss runtime', () => {
  it('normal', () => {
    const colors = ['red', 'green', 'blue'];
    const color = colors[~~(Math.random() * colors.length)];

    const useStyle = ncss`
      backgroundColor: param(0);
    `;

    const style = useStyle(color);
    expect(style).toEqual({
      style: {
        backgroundColor: color,
      }
    });
  });
});
