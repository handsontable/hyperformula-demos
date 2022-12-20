// usage:
// npm run tsc && node index.js

const txt: string = "world";
console.log("hello", txt);

import { HyperFormula, FunctionPlugin, FunctionArgumentType } from 'hyperformula';

export class MyCustomPlugin extends FunctionPlugin {
  public static translations;

  greet(ast, state) {
    return this.runFunction(
      ast.args,
      state,
      this.metadata('GREET'),
      (firstName) => {
        return `👋 Hello, ${firstName}!`;
      },
    );
  }

  doubleRangeResultArraySize(ast, state) {
    const arg = ast?.args?.[0];

    if (arg?.start == null || arg?.end == null) {
      return ArraySize.scalar();
    }

    const width = arg.end.col - arg.start.col + 1;
    const height = arg.end.row - arg.start.row + 1;

    return new ArraySize(width, height);
  }
  doubleRange(ast, state) {
    return this.runFunction(
      ast.args,
      state,
      this.metadata('DOUBLE_RANGE'),
      (range) => {
        const resultArray = //...
        return SimpleRangeValue.onlyValues(resultArray);
      },
    );
    }
}

MyCustomPlugin.implementedFunctions = {
  // let's define the function's ID as `GREET`
  GREET: {
    method: "greet",
    parameters: [
      { argumentType: FunctionArgumentType.STRING }
    ],
  },
  DOUBLE_RANGE: {
    method: 'doubleRange',
    arraySizeMethod: 'doubleRangeResultArraySize',
    parameters: [
      { argumentType: FunctionArgumentType.RANGE },
    ],
  }
};

MyCustomPlugin.translations = {
  enGB: {
    GREET: "GREET",
  },
  enUS: {
    GREET: "GREET",
  }
  // repeat for all languages used in your system...
};

HyperFormula.registerFunctionPlugin(MyCustomPlugin, MyCustomPlugin.translations);

const hf = HyperFormula.buildEmpty({
  language: 'enGB', // TODO: change to enUS
  dateFormats: ['MM/DD/YYYY', 'MM/DD/YY', 'YYYY/MM/DD'],
  timeFormats: ['hh:mm', 'hh:mm:ss.sss'],
  decimalSeparator: '.',
  thousandSeparator: ',',
  functionArgSeparator: ';',
  currencySymbol: ['$', 'USD'],
  localeLang: 'en-US',
  licenseKey: "gpl-v3",
});

const sheetName = hf.addSheet("main");
const sheetId = hf.getSheetId(sheetName);

const tableData = [
  ["Greg Black", "=GREET(A1)", "05/23/1989", "=YEAR(NOW())-YEAR(C1)", "$80,000.00"],
  ["Anne Carpenter", "12:30 PM", "01/01/1980", "=YEAR(NOW())-YEAR(C2)", "$95,000.00"],
  ["Natalie Dem", "1:30 PM", "12/13/1973", "=YEAR(NOW())-YEAR(C3)","$78,500.00"],
  ["John Sieg", "2:00 PM", "10/31/1995", "=YEAR(NOW())-YEAR(C4)", "$114,000.00"],
  ["Chris Aklips", "11:30 AM", "08/18/1987", "=YEAR(NOW())-YEAR(C5)", "$71,900.00"],
  ["AVERAGE", null, null, "=AVERAGE(D1:D5)", "=AVERAGE(E1:E5)"]
];

hf.setCellContents(
  {
    row: 0,
    col: 0,
    sheet: sheetId
  },
  tableData
);

console.log(hf.getAllSheetsValues());