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
        const doubledData = range.data.map(row => row.map(val => val)); // TODO
        return SimpleRangeValue.onlyValues(doubledData);
      },
    );
  }

  // TODO
  doubleResultArraySize(ast, state) {
    return { width: 1, height: 3, isScalar: () => false }; // array size
  }
}

// Static property with the custom functions definitions
MyCustomPlugin.implementedFunctions = {
  GREET: {
    method: "greet",
    parameters: [
      { argumentType: "STRING" }
    ],
  },
  DOUBLE: {
    method: "double",
    arraySizeMethod: 'doubleResultArraySize',
    parameters: [
      { argumentType: "RANGE" },
    ],
  }
};

// Static property with the custom functions translations
MyCustomPlugin.translations = {
  enGB: {
    GREET: "GREET",
    DOUBLE: "DOUBLE",
  },
  enUS: {
    GREET: "GREET",
    DOUBLE: "MAKE_TWICE",
  }
};
