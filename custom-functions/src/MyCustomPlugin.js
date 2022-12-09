import { FunctionPlugin, CellError, SimpleRangeValue } from 'hyperformula';

/**
 * Custom function plugin.
 */
export class MyCustomPlugin extends FunctionPlugin {
  greet(ast, state) {
    return this.runFunction(
      ast.args,
      state,
      this.metadata('GREET'),
      (username) => {
        if (!username) {
          return new CellError('VALUE');
        }

        return `👋 Hello, ${username}!`;
      },
    );
  }

  double(ast, state) {
    return this.runFunction(
      ast.args,
      state,
      this.metadata('DOUBLE'),
      (range) => {
        const dataAsNumbers = range.data.map(row => row.map(val => this.internalScalarValueToNumber(val)));

        if (dataAsNumbers.some(row => row.some(val => val === undefined))) {
          return new CellError('VALUE');
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

  // TODO
  doubleResultArraySize(ast, state) {
    console.log(ast);
    return { width: 1, height: 3, isScalar: () => false }; // use ArraySize
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
  DOUBLE: {
    method: 'double',
    arraySizeMethod: 'doubleResultArraySize',
    parameters: [
      { argumentType: 'RANGE' },
    ],
  }
};

// Static property with the custom functions translations
MyCustomPlugin.translations = {
  enGB: {
    GREET: 'GREET',
    DOUBLE: 'DOUBLE',
  },
  enUS: {
    GREET: 'GREET',
    DOUBLE: 'MAKE_TWICE',
  }
};
