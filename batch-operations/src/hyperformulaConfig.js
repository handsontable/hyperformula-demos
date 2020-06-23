import { tableData } from "./data";

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty({
  licenseKey: "agpl-v3"
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
hf.addNamedExpression("Year_1", "=SUM(main!$B$1:main!$B$5)");
hf.addNamedExpression("Year_2", "=SUM(main!$C$1:main!$C$5)");

export { hf, sheetName, sheetId };
