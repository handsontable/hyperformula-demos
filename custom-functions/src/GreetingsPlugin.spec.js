import HyperFormula from 'hyperformula';
import { GreetingsPlugin } from './GreetingsPlugin';

describe('Custom function implemented with runFunction)', () => {
  it('works for a non-empty string', () => {
    HyperFormula.registerFunctionPlugin(GreetingsPlugin, GreetingsPlugin.translations)

    const engine = HyperFormula.buildFromArray([['Anthony', '=GREET(A1)']])

    expect(engine.getCellValue(adr('B1'))).toEqual('👋 Hello, Anthony!')
  })

  // it('returns #VALUE! error for empty string', () => {
  //   HyperFormula.registerFunctionPlugin(GreetingsPlugin, GreetingsPlugin.translations)

  //   const engine = HyperFormula.buildFromArray([['', '=GREET(A1)']])

  //   expect(engine.getCellValue(adr('B1'))).toEqualError(detailedError(ErrorType.VALUE))
  // })

  // it('propagates #DIV_BY_ZERO! error', () => {
  //   HyperFormula.registerFunctionPlugin(GreetingsPlugin, GreetingsPlugin.translations)

  //   const engine = HyperFormula.buildFromArray([['=1/0', '=GREET(A1)']])

  //   expect(engine.getCellValue(adr('B1'))).toEqualError(detailedError(ErrorType.DIV_BY_ZERO))
  // })

  // it('propagates #CYCLE! error', () => {
  //   HyperFormula.registerFunctionPlugin(GreetingsPlugin, GreetingsPlugin.translations)

  //   const engine = HyperFormula.buildFromArray([['=B1', '=GREET(A1)']])


  //   expect(engine.getCellValue(adr('B1'))).toEqualError(detailedError(ErrorType.CYCLE))
  // })
})
  