import HyperFormula from 'hyperformula';
import { tableData } from "./data";

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty({
  licenseKey: "agpl-v3"
});

// Add a new sheet and get its id.
const sheetName = hf.addSheet("main");
const sheetId = hf.getSheetId(sheetName);

// Fill the HyperFormula sheet with data.
reinitializeData();

/**
 * Reinitialize the HF data.
 */
function reinitializeData() {
  hf.setCellContents(
    {
      row: 0,
      col: 0,
      sheet: sheetId
    },
    tableData
  );
}

export { hf, sheetName, sheetId, reinitializeData };
