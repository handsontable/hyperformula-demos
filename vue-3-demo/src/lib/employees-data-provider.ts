import HyperFormula from 'hyperformula'
import { EMPLOYEES_DATA, TOTAL_EXPRESSIONS } from './employees-data.const'

console.log(`%c Using HyperFormula ${HyperFormula.version}`, 'color: blue; font-weight: bold')

export class EmployeesDataProvider {
  private hf: HyperFormula
  private sheetId: number

  private get sheetName(): string | undefined {
    return this.hf.getSheetName(this.sheetId)
  }

  private get rowsCount(): number {
    const { height } = this.hf.getSheetDimensions(this.sheetId)
    return height
  }

  constructor() {
    this.hf = HyperFormula.buildFromArray(EMPLOYEES_DATA, {
      licenseKey: 'gpl-v3'
    })

    this.sheetId = 0

    this.hf.addNamedExpression(
      'Year_1',
      `=SUM(${this.sheetName}!$B$1:${this.sheetName}!$B$${this.rowsCount})`
    )
    this.hf.addNamedExpression(
      'Year_2',
      `=SUM(${this.sheetName}!$C$1:${this.sheetName}!$C$${this.rowsCount})`
    )
  }

  getTabularData({ calculated }: { calculated: boolean }): (string | number)[][] {
    return calculated
      ? (this.hf.getSheetValues(this.sheetId) as (string | number)[][])
      : (this.hf.getSheetSerialized(this.sheetId) as (string | number)[][])
  }

  getTotals({ calculated }: { calculated: boolean }): (string | number)[] {
    if (!calculated) {
      return TOTAL_EXPRESSIONS
    }

    return TOTAL_EXPRESSIONS.map(
      (expr) => this.hf.calculateFormula(expr, this.sheetId) as string | number
    )
  }
}
