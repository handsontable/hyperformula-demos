import { run } from "./renderers";
import { HyperFormula } from "hyperformula";

/**
 * Bind the events to the buttons.
 */
export function bindEvents() {
  const runButton = document.querySelector("#run");

  runButton.addEventListener("click", () => {
    run();
  });

  const hyperFormulaVersionContainer = document.querySelector("#hyperformula-version");
  hyperFormulaVersionContainer.innerHTML = `HyperFormula version: ${HyperFormula.version}`;
}

export const ANIMATION_ENABLED = true;
