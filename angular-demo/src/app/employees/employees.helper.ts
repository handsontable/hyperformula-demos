import { HyperFormula } from 'hyperformula';

console.log(`%c Using HyperFormula ${HyperFormula.version}`, 'color: blue; font-weight: bold');

export const initializeHF = (initSheetId: string) => {
  const hf = HyperFormula.buildEmpty({
    licenseKey: "gpl-v3"
  });

  // Add a new sheet and get its id.
  const sheetName = hf.addSheet(initSheetId);
  const sheetId = hf.getSheetId(sheetName);

  return {
    hf,
    sheetName,
    sheetId
  };
};

export const initializeNamedExpressions = (hf: HyperFormula, sheetName: string) => {
  const sheetId = hf.getSheetId(sheetName);
  const { height } = hf.getSheetDimensions(sheetId);

  // Add named expressions for the "TOTAL" row.
  hf.addNamedExpression(
    "Year_1",
    `=SUM(${sheetName}!$B$1:${sheetName}!$B$${height})`
  );
  hf.addNamedExpression(
    "Year_2",
    `=SUM(${sheetName}!$C$1:${sheetName}!$C$${height})`
  );
};

export const initHFValues = (hf: HyperFormula, sheetId: number, data: any[]) => {
  hf.setCellContents(
    {
      row: 0,
      col: 0,
      sheet: sheetId
    },
    data
  );
};
