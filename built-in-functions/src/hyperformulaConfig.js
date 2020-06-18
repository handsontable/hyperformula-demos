import { formulas, data } from "./data";

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty({
  licenseKey: "agpl-v3"
});

const sheetInfo = {
  formulas: {
    sheetName: "Formulas"
  },
  data: {
    sheetName: "Data"
  }
};

// add 'Data' sheet
hf.addSheet(sheetInfo.data.sheetName);
hf.setSheetContent(sheetInfo.data.sheetName, data);

// add 'Formulas' sheet
hf.addSheet(sheetInfo.formulas.sheetName);
hf.setSheetContent(sheetInfo.formulas.sheetName, formulas);

export { hf, sheetInfo };
