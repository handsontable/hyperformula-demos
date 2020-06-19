import { tableData } from "./data";

//import frRf from....

// register language
HyperFormula.registerLanguage("frFR", frFR);

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty({
  precisionRounding: 2,
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

export { hf, sheetName, sheetId };
