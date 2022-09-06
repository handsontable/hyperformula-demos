import { FunctionPlugin } from 'hyperformula';

/**
 * Custom function plugin.
 */
 export class CountHF extends FunctionPlugin {
  hyper(ast, state) {
    return this.runFunction(ast.args, state, this.metadata('HYPER'), () => 'Hyperformula'.length);
  }
}

// Static property with the custom functions definitions
CountHF.implementedFunctions = {
  HYPER: {
    method: 'hyper',
  },
};

// Static property with the custom functions translations
CountHF.translations = {
  enGB: {
    HYPER: 'HYPER',
  },
};
