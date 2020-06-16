import { tableData } from "./data";

//import frRf from....

// register language
HyperFormula.registerLanguage("frFR", frFR);

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty({
  precisionRounding: 2,
  language: "frFR"
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
hf.addNamedExpression("Year_1", "=SOMME(main!B1:main!B5)");
hf.addNamedExpression("Year_2", "=SOMME(main!C1:main!C5)");

export { hf, sheetName, sheetId };
