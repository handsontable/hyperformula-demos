// TODO: replace it with an appropriate import
const FunctionPlugin = HyperFormula.FunctionPlugin;

/**
 * Custom function plugin.
 */
export class CountHF extends FunctionPlugin {
  hyper(ast, formulaAddress) {
    return "Hyperformula".length;
  }
}

// Static property with the implemented function definitions.
CountHF.implementedFunctions = {
  HYPER: {
    method: "hyper"
  }
};
