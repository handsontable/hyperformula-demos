import { HyperFormula } from 'hyperformula';
import { MyCustomPlugin } from './MyCustomPlugin';

describe('GREET function', () => {
  it('works for a non-empty string', () => {
    HyperFormula.registerFunctionPlugin(MyCustomPlugin, MyCustomPlugin.translations);

    const engine = HyperFormula.buildFromArray([['Anthony', '=GREET(A1)']], { licenseKey: 'gpl-v3' });

    expect(engine.getCellValue({ sheet: 0, row: 0, col: 1 })).toEqual('👋 Hello, Anthony!');
  });

  it('propagates #DIV/0! error', () => {
    HyperFormula.registerFunctionPlugin(MyCustomPlugin, MyCustomPlugin.translations);

    const engine = HyperFormula.buildFromArray([['=1/0', '=GREET(A1)']], { licenseKey: 'gpl-v3' });

    expect(engine.getCellValueType({ sheet: 0, row: 0, col: 1 })).toEqual('ERROR');
    expect(engine.getCellValue({ sheet: 0, row: 0, col: 1 }).value).toEqual('#DIV/0!');
  });

  it('propagates #CYCLE! error', () => {
    HyperFormula.registerFunctionPlugin(MyCustomPlugin, MyCustomPlugin.translations);

    const engine = HyperFormula.buildFromArray([['=B1', '=GREET(A1)']], { licenseKey: 'gpl-v3' });

    expect(engine.getCellValueType({ sheet: 0, row: 0, col: 1 })).toEqual('ERROR');
    expect(engine.getCellValue({ sheet: 0, row: 0, col: 1 }).value).toEqual('#CYCLE!');
  });
});

describe('DOUBLE_RANGE function', () => {
  it('works for a single number', () => {
    HyperFormula.registerFunctionPlugin(MyCustomPlugin, MyCustomPlugin.translations);

    const engine = HyperFormula.buildFromArray([[42, '=DOUBLE_RANGE(A1)']], { licenseKey: 'gpl-v3' });

    expect(engine.getCellValue({ sheet: 0, row: 0, col: 1 })).toEqual(84);
  });

  it('works for a range of numbers', () => {
    HyperFormula.registerFunctionPlugin(MyCustomPlugin, MyCustomPlugin.translations);

    const engine = HyperFormula.buildFromArray([
      [1, '=DOUBLE_RANGE(A1:A3)'],
      [2],
      [3],
    ], { licenseKey: 'gpl-v3' });

    expect(engine.getCellValue({ sheet: 0, row: 0, col: 1 })).toEqual(2);
    expect(engine.getCellValue({ sheet: 0, row: 1, col: 1 })).toEqual(4);
    expect(engine.getCellValue({ sheet: 0, row: 2, col: 1 })).toEqual(6);
  });

  it('returns a VALUE error if the range argument contains a string', () => {
    HyperFormula.registerFunctionPlugin(MyCustomPlugin, MyCustomPlugin.translations);

    const engine = HyperFormula.buildFromArray([
      [1, '=DOUBLE_RANGE(A1:A3)'],
      ['I should not be here'],
      [3],
    ], { licenseKey: 'gpl-v3' });

    expect(engine.getCellValueType({ sheet: 0, row: 0, col: 1 })).toEqual('ERROR');
    expect(engine.getCellValue({ sheet: 0, row: 0, col: 1 }).value).toEqual('#VALUE!');
  });

  it('propagates #DIV/0! error', () => {
    HyperFormula.registerFunctionPlugin(MyCustomPlugin, MyCustomPlugin.translations);

    const engine = HyperFormula.buildFromArray([['=1/0', '=DOUBLE_RANGE(A1)']], { licenseKey: 'gpl-v3' });

    expect(engine.getCellValueType({ sheet: 0, row: 0, col: 1 })).toEqual('ERROR');
    expect(engine.getCellValue({ sheet: 0, row: 0, col: 1 }).value).toEqual('#DIV/0!');
  });

  it('propagates #CYCLE! error', () => {
    HyperFormula.registerFunctionPlugin(MyCustomPlugin, MyCustomPlugin.translations);

    const engine = HyperFormula.buildFromArray([['=B1', '=DOUBLE_RANGE(A1)']], { licenseKey: 'gpl-v3' });

    expect(engine.getCellValueType({ sheet: 0, row: 0, col: 1 })).toEqual('ERROR');
    expect(engine.getCellValue({ sheet: 0, row: 0, col: 1 }).value).toEqual('#CYCLE!');
  });
});
