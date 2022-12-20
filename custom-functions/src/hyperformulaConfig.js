import HyperFormula from 'hyperformula';
import { tableData } from './data';
import { MyCustomPlugin, MyCustomPluginTranslations } from './MyCustomPlugin';

console.log(`%c Using HyperFormula ${HyperFormula.version}`, 'color: blue; font-weight: bold');

// Register the custom function plugin
HyperFormula.registerFunctionPlugin(MyCustomPlugin, MyCustomPluginTranslations);

// Create an empty HyperFormula instance.
const hf = HyperFormula.buildEmpty({
  licenseKey: 'gpl-v3'
});

// Add a new sheet and get its id.
const sheetName = hf.addSheet('main');
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
