import { tableData } from "./data";
import { CountHF } from "./countHFFunctionPlugin";
import { countHFTranslations } from "./countHFTranslations";

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

HyperFormula.registerFunctionPlugin(CountHF, countHFTranslations);

export { hf, sheetName, sheetId };
