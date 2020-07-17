import HyperFormula from "hyperformula";
import frFR from "hyperformula/es/i18n/languages/frFR";
import { tableData } from "./data";

// register language
HyperFormula.registerLanguage(
  frFR.langCode,
  frFR
);

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty({
  language: "frFR",
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
hf.addNamedExpression("Year_1", "=SOMME(main!$B$1:main!$B$5)");
hf.addNamedExpression("Year_2", "=SOMME(main!$C$1:main!$C$5)");

export { hf, sheetName, sheetId };
