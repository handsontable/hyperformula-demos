import HyperFormula, { type CellValue, type RawCellContent } from 'hyperformula'
import { markRaw } from 'vue'
import type { EmployeeRow } from './types'

console.log(`%c Using HyperFormula ${HyperFormula.version}`, 'color: blue; font-weight: bold')

export const initializeHF = (initSheetId: string) => {
  const hf = markRaw(
    HyperFormula.buildEmpty({
      licenseKey: 'gpl-v3'
    })
  )

  const sheetName = hf.addSheet(initSheetId)
  const sheetId = hf.getSheetId(sheetName)
  if (typeof sheetId !== 'number') throw new Error('Sheet ID is not a number')

  return { hf, sheetName, sheetId }
}

export const initializeNamedExpressions = (hf: HyperFormula, sheetName: string) => {
  const sheetId = hf.getSheetId(sheetName) as number
  const { height } = hf.getSheetDimensions(sheetId)

  hf.addNamedExpression('Year_1', `=SUM(${sheetName}!$B$1:${sheetName}!$B$${height})`)
  hf.addNamedExpression('Year_2', `=SUM(${sheetName}!$C$1:${sheetName}!$C$${height})`)
}

export const initHFValues = (
  hf: HyperFormula,
  sheetId: number,
  data: RawCellContent | RawCellContent[][]
) => {
  hf.setCellContents({ row: 0, col: 0, sheet: sheetId }, data)
}

export const formatCellValues = (values: (CellValue | RawCellContent)[][]): EmployeeRow[] => {
  return values.map((arr) => arr.map((v) => v?.toString() ?? '')) as EmployeeRow[]
}
