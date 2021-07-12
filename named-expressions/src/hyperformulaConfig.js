import HyperFormula from 'hyperformula';
import { tableData } from "./data";

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty({
  licenseKey: "gpl-v3"
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

// Add named expressions
hf.addNamedExpression("myOneCell", "=main!$A$1");
hf.addNamedExpression("myTwoCells", "=SUM(main!$A$1, main!$A$2)");
hf.addNamedExpression("myOneColumn", "=SUM(main!$A$1:main!$A$3)");
hf.addNamedExpression("myTwoColumns", "=SUM(main!$A$1:main!$B$3)");
hf.addNamedExpression("myOneRow", "=SUM(main!$A$1:main!$D$1)");
hf.addNamedExpression("myTwoRows", "=SUM(main!$A$1:main!$D$2)");
hf.addNamedExpression("myFormula", "=SUM(0, 1, 1, 2, 3, 5, 8, 13)");
hf.addNamedExpression("myNumber", "=21");
hf.addNamedExpression("myText", "Apollo 11");

export { hf, sheetName, sheetId };
