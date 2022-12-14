import { FunctionPlugin, CellError, SimpleRangeValue, ArraySize } from 'hyperformula';

/**
 * Custom function plugin.
 */
export class MyCustomPlugin extends FunctionPlugin {
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

  doubleRange(ast, state) {
    return this.runFunction(
      ast.args,
      state,
      this.metadata('DOUBLE_RANGE'),
      (range) => {
        const rangeData = range.data;
        const dataAsNumbers = rangeData.map(row => row.map(val => this.internalScalarValueToNumber(val)));

        if (dataAsNumbers.some(row => row.some(val => val === undefined))) {
          return new CellError('VALUE', 'Function DOUBLE_RANGE operates only on numbers.');
        }

        const doubledData = dataAsNumbers.map(row => row.map(val => val*2));
        return SimpleRangeValue.onlyValues(doubledData);
      },
    );
  }

  internalScalarValueToNumber(value) {
    const rawValue = value.val ?? value;
    return typeof rawValue === 'number' ? rawValue : undefined;
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
}

// Static property with the custom functions definitions
MyCustomPlugin.implementedFunctions = {
  GREET: {
    method: 'greet',
    parameters: [
      { argumentType: 'STRING' }
    ],
  },
  DOUBLE_RANGE: {
    method: 'doubleRange',
    arraySizeMethod: 'doubleRangeResultArraySize',
    parameters: [
      { argumentType: 'RANGE' },
    ],
  }
};

// Static property with the custom functions translations
MyCustomPlugin.translations = {
  enGB: {
    GREET: 'GREET',
    DOUBLE_RANGE: 'DOUBLE_RANGE',
  },
  enUS: {
    GREET: 'GREET',
    DOUBLE_RANGE: 'MAKE_TWICE',
  }
};
