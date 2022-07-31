import { css } from '../src';

describe('shorthand', () => {
  it('padding', () => {
    const padding1 = css`
      padding: 4px 10px;
    `;
    const padding2 = css`
      padding: 4px 5% 6px;
    `;
    const padding3 = css`
      padding: 1px 2px 3px 4px;
    `;

    expect(padding1).toEqual({
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: 10,
      paddingRight: 10,
    });
    expect(padding2).toEqual({
      paddingTop: 4,
      paddingBottom: 6,
      paddingLeft: '5%',
      paddingRight: '5%',
    });
    expect(padding3).toEqual({
      paddingTop: 1,
      paddingBottom: 3,
      paddingLeft: 4,
      paddingRight: 2,
    });
  });

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

  it('border-width', () => {
    const borderWidth1 = css`
      borderWidth: 4px 10px;
    `;
    const borderWidth2 = css`
      borderWidth: 4px 5% 6px;
    `;
    const borderWidth3 = css`
      borderWidth: 1px 2px 3px 4px;
    `;

    expect(borderWidth1).toEqual({
      borderTopWidth: 4,
      borderBottomWidth: 4,
      borderLeftWidth: 10,
      borderRightWidth: 10,
    });
    expect(borderWidth2).toEqual({
      borderTopWidth: 4,
      borderBottomWidth: 6,
      borderLeftWidth: '5%',
      borderRightWidth: '5%',
    });
    expect(borderWidth3).toEqual({
      borderTopWidth: 1,
      borderBottomWidth: 3,
      borderLeftWidth: 4,
      borderRightWidth: 2,
    });
  });

  it('margin', () => {
    const margin1 = css`
      margin: 4px 10px;
    `;
    const margin2 = css`
    margin: 4px 5% 6px;
    `;
    const margin3 = css`
    margin: 1px 2px 3px 4px;
    `;

    expect(margin1).toEqual({
      marginTop: 4,
      marginBottom: 4,
      marginLeft: 10,
      marginRight: 10,
    });
    expect(margin2).toEqual({
      marginTop: 4,
      marginBottom: 6,
      marginLeft: '5%',
      marginRight: '5%',
    });
    expect(margin3).toEqual({
      marginTop: 1,
      marginBottom: 3,
      marginLeft: 4,
      marginRight: 2,
    });
  });
});
