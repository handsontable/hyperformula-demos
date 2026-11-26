import { HyperFormula, AlwaysDense } from "hyperformula";
import { tableData } from "./data";

console.log(
  `%c Using HyperFormula ${HyperFormula.version}`,
  "color: blue; font-weight: bold"
);

export const hf = HyperFormula.buildFromArray([], {
  licenseKey: 'your-license-key', // get a key at https://handsontable.com/pricing/?tab=hyperformula
  maxRows: 500100,
  chooseAddressMappingPolicy: new AlwaysDense(),
})

export const sheetId = 0

export function loadSpreadsheet() {
  hf.setSheetContent(sheetId, tableData);
}
