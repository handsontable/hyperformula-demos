import { hf } from "./hyperformulaConfig";

export function handleStateInput() {
  const stateInput = document.querySelector("#state");
  const formulaInput = document.querySelector("#formula");
  const state = stateInput.value;

  if (!state) {
    return;
  }

  const formula = `=XLOOKUP("${state}"; B1:B5; A1:A5; "No such state")`;
  formulaInput.value = formula;
}

export function bindEvents() {
  const stateInput = document.querySelector("#state");
  const runButton = document.querySelector("#run");
  const resultSpan = document.querySelector("#result");

  stateInput.addEventListener("keyup", () => {
    handleStateInput();
  });

  runButton.addEventListener("click", (e) => {
    e.preventDefault();
    const formulaInput = document.querySelector("#formula");
    const formula = formulaInput.value;
    const result = hf.calculateFormula(formula, 0);
    resultSpan.textContent = result;
  });
}

export const ANIMATION_ENABLED = true;