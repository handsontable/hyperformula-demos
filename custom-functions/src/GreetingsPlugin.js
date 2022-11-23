import { FunctionPlugin } from 'hyperformula';

/**
 * Custom function plugin.
 */
export class GreetingsPlugin extends FunctionPlugin {
  greet(ast, state) {
    return this.runFunction(
      ast.args,
      state,
      this.metadata("GREET"),
      (username) => `Hello, ${username}!`,
    );
  }
}

// Static property with the custom functions definitions
GreetingsPlugin.implementedFunctions = {
  GREET: {
    method: "greet",
    parameters: [
      { argumentType: "STRING" }
    ],
  }
};

// Static property with the custom functions translations
GreetingsPlugin.translations = {
  enGB: {
    GREET: "GREET",
  },
  enUS: {
    GREET: "GREET",
  }
};
