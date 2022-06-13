import HyperFormula from 'hyperformula';
import { getSampleData, state } from "./data";

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty({
  licenseKey: "gpl-v3"
});

// Add a new sheet and get its id.
state.currentSheet = "InitialSheet";
const sheetName = hf.addSheet(state.currentSheet);
const sheetId = hf.getSheetId(sheetName);

// Fill the HyperFormula sheet with data.
hf.setSheetContent(sheetId, getSampleData(5, 5));

export { hf };
