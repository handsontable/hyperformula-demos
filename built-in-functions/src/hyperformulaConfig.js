import HyperFormula from 'hyperformula';
import { formulas, data } from "./data";

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty({
  licenseKey: "gpl-v3"
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
hf.setSheetContent(hf.getSheetId(sheetInfo.data.sheetName), data);

// add 'Formulas' sheet
hf.addSheet(sheetInfo.formulas.sheetName);
hf.setSheetContent(hf.getSheetId(sheetInfo.formulas.sheetName), formulas);

export { hf, sheetInfo };
