import { getSampleData, state } from "./data";

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty({
  precisionRounding: 2,
  licenseKey: "agpl-v3"
});

// Add a new sheet and get its id.
state.currentSheet = "InitialSheet";
const sheetName = hf.addSheet(state.currentSheet);

// Fill the HyperFormula sheet with data.
hf.setSheetContent(sheetName, getSampleData(5, 5));

export { hf };
