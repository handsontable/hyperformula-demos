import HyperFormula from 'hyperformula';
import { playersAData, playersBData, formulasData } from "./data";

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty({
  licenseKey: "gpl-v3"
});

const sheetInfo = {
  teamA: {
    sheetName: "TeamA"
  },
  teamB: {
    sheetName: "TeamB"
  },
  formulas: {
    sheetName: "Formulas"
  }
};

// add 'TeamA' sheet
hf.addSheet(sheetInfo.teamA.sheetName);
// insert playersA content into targeted 'TeamA' sheet
hf.setSheetContent(hf.getSheetId(sheetInfo.teamA.sheetName), playersAData);

// add 'TeamB' sheet
hf.addSheet(sheetInfo.teamB.sheetName);
// insert playersB content into targeted 'TeamB' sheet
hf.setSheetContent(hf.getSheetId(sheetInfo.teamB.sheetName), playersBData);

// add a sheet named 'Formulas'
hf.addSheet(sheetInfo.formulas.sheetName);
// add formulas to that sheet
hf.setSheetContent(hf.getSheetId(sheetInfo.formulas.sheetName), formulasData);

export { hf, sheetInfo };
