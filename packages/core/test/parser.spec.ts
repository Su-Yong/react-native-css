import { parseElement } from '../src/css/parser/parser';
import { parseValue } from '../src/css/parser/value/parser';

describe('parser', () => {
  it('parse', () => {
    console.log(JSON.stringify(parseElement(`
      background: calc(10% / 7 * calc(var(--test, red) + 10px)));
    `), null, 2));
  });
});

describe('parser: value', () => {
  it('dimensions', () => {
    const ast1 = parseValue('10px');
    const ast2 = parseValue('90deg');
    const ast3 = parseValue('0.3s');

    expect(ast1).toEqual([{
      type: '<length>',
      raw: '10px',
      value: 10,
      unit: 'px',
    }]);
    expect(ast2).toEqual([{
      type: '<angle>',
      raw: '90deg',
      radian: Math.PI / 2,
    }]);
    expect(ast3).toEqual([{
      type: '<time>',
      raw: '0.3s',
      ms: 300,
    }]);
  });

  it('image', () => {
    const color1 = parseValue('rgba(255, 0, 0, 0.5)');
    const color2 = parseValue('#00ff00');

    expect(color1).toEqual([{
      type: '<color>',
      raw: 'rgba(255, 0, 0, 0.5)',
      red: 255,
      green: 0,
      blue: 0,
      alpha: 0.5
    }]);
    expect(color2).toEqual([{
      type: '<color>',
      raw: '#00ff00',
      red: 0,
      green: 255,
      blue: 0,
      alpha: 1
    }]);
  });

  it('complex', () => {
    const ast = parseValue('solid 2px linear-gradient(rgb(var(--red, 10), 255, 0), rgb(255, 0, 0)) var(--test)');

    expect(ast).toEqual([
      {
        "type": "<ident>",
        "raw": "solid",
        "identifier": "solid"
      },
      {
        "type": "<length>",
        "raw": "2px",
        "value": 2,
        "unit": "px"
      },
      {
        "type": "<gradient>",
        "raw": "linear-gradient(rgb(var(--red, 10), 255, 0), rgb(255, 0, 0))",
        "gradientType": "linear",
        "values": [
          {
            "type": "<color>",
            "raw": "rgb(var(--red, 10), 255, 0)",
            "function": "rgb",
            "values": [
              {
                "type": "<function>",
                "raw": "var(--red, 10)",
                "name": "var",
                "parameters": [
                  {
                    "type": "<ident>",
                    "raw": "--red",
                    "identifier": "--red"
                  },
                  {
                    "type": "<number>",
                    "raw": "10",
                    "value": 10
                  }
                ]
              },
              {
                "type": "<number>",
                "raw": "255",
                "value": 255
              },
              {
                "type": "<number>",
                "raw": "0",
                "value": 0
              }
            ]
          },
          {
            "type": "<color>",
            "raw": "rgb(255, 0, 0)",
            "red": 255,
            "green": 0,
            "blue": 0,
            "alpha": 1
          }
        ]
      },
      {
        "type": "<function>",
        "raw": "var(--test)",
        "name": "var",
        "parameters": [
          {
            "type": "<ident>",
            "raw": "--test",
            "identifier": "--test"
          }
        ]
      },
    ]);
  });
});
