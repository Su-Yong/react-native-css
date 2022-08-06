import { ncss } from '../src/ncss';

describe('ncss runtime', () => {
  it('param', () => {
    const colors = ['red', 'green', 'blue'];
    const color = colors[~~(Math.random() * colors.length)];

    const useStyle = ncss`
      backgroundColor: param(0, green);
    `;

    const style1 = useStyle(color);
    const style2 = useStyle('rgba(45, 45, 45, 0.5)');
    const style3 = useStyle();

    expect(style1.style).toEqual({
      backgroundColor: color,
    });
    expect(style2.style).toEqual({
      backgroundColor: 'rgba(45, 45, 45, 0.5)',
    });
    expect(style3.style).toEqual({
      backgroundColor: 'rgba(0, 128, 0, 1)',
    });
  });

  xit('nested', () => {
    const useStyle = ncss`
      fontSize: param(0); /* param(0) means first parameter of useButtonStyle hook */
    
      padding: 4px 8px;
      border: solid 1px param(1);


    `;

    const style1 = useStyle(14, '#00a4ff');

    console.log('nested', JSON.stringify(style1.style, null, 2));
  });
});
