import { tableData } from "./data";

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty({
  precisionRounding: 2
});

// Add a new sheet and get its id.
const sheetName = hf.addSheet("main");
const sheetId = hf.getSheetId(sheetName);

// Fill the HyperFormula sheet with data.
hf.setCellContents(
  {
    row: 0,
    col: 0,
    sheet: sheetId
  },
  tableData
);

// Add named expressions for the "TOTAL" row.
hf.addNamedExpression("myOneCell", "=main!A1");
hf.addNamedExpression("myTwoCells", "=SUM(main!A1, main!A2)");
hf.addNamedExpression("myOneColum", "=SUM(main!A1:main!A3)");
hf.addNamedExpression("myTwoColumns", "=SUM(main!A1:main!B3)");
hf.addNamedExpression("myOneRow", "=SUM(main!A1:main!D1)");
hf.addNamedExpression("myTwoRows", "=SUM(main!A1:main!D2)");
hf.addNamedExpression("myFormula", "=SUM(0; 1; 1; 2; 3; 5; 8; 13)");
// hf.addNamedExpression("myNumber", "=21");

export { hf, sheetName, sheetId };
