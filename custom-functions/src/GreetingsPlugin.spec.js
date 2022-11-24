import { HyperFormula } from 'hyperformula';
import { GreetingsPlugin } from './GreetingsPlugin';

describe('GreetingsPlugin', () => {
  it('works for a non-empty string', () => {
    HyperFormula.registerFunctionPlugin(GreetingsPlugin, GreetingsPlugin.translations)

    const engine = HyperFormula.buildFromArray([['Anthony', '=GREET(A1)']], { licenseKey: 'gpl-v3' })

    expect(engine.getCellValue({ sheet: 0, row: 0, col: 1 })).toEqual('👋 Hello, Anthony!')
  })

  it('returns #VALUE! error for empty string', () => {
    HyperFormula.registerFunctionPlugin(GreetingsPlugin, GreetingsPlugin.translations)

    const engine = HyperFormula.buildFromArray([['', '=GREET(A1)']], { licenseKey: 'gpl-v3' })

    expect(engine.getCellValueType({ sheet: 0, row: 0, col: 1 })).toEqual('ERROR')
    expect(engine.getCellValue({ sheet: 0, row: 0, col: 1 }).value).toEqual('#VALUE!')
  })

  it('propagates #DIV/0! error', () => {
    HyperFormula.registerFunctionPlugin(GreetingsPlugin, GreetingsPlugin.translations)

    const engine = HyperFormula.buildFromArray([['=1/0', '=GREET(A1)']], { licenseKey: 'gpl-v3' })

    expect(engine.getCellValueType({ sheet: 0, row: 0, col: 1 })).toEqual('ERROR')
    expect(engine.getCellValue({ sheet: 0, row: 0, col: 1 }).value).toEqual('#DIV/0!')
  })

  it('propagates #CYCLE! error', () => {
    HyperFormula.registerFunctionPlugin(GreetingsPlugin, GreetingsPlugin.translations)

    const engine = HyperFormula.buildFromArray([['=B1', '=GREET(A1)']], { licenseKey: 'gpl-v3' })


    expect(engine.getCellValueType({ sheet: 0, row: 0, col: 1 })).toEqual('ERROR')
    expect(engine.getCellValue({ sheet: 0, row: 0, col: 1 }).value).toEqual('#CYCLE!')
  })
})
  