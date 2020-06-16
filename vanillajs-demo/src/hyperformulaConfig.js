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
hf.addNamedExpression("Year_1", "=SUM(main!B1:main!B5)");
hf.addNamedExpression("Year_2", "=SUM(main!C1:main!C5)");

export { hf, sheetName, sheetId };
