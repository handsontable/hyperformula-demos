// TODO: replace it with an appropriate import
const FunctionPlugin = HyperFormula.FunctionPlugin;

export class CountHF extends FunctionPlugin {
  hyper(ast, formulaAddress) {
    return "Hyperformula".length;
  }
}

CountHF.implementedFunctions = {
  HYPER: {
    method: "hyper"
  }
};
