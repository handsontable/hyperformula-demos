import { doSortDESC, doSortASC } from "./renderers";

/**
 * Bind the events to the buttons.
 */
export function bindEvents() {
  const ascSort = document.querySelector("#asc");
  const descSort = document.querySelector("#desc");

  ascSort.addEventListener("click", () => {
    doSortASC();
  });

  descSort.addEventListener("click", () => {
    doSortDESC();
  });
}

export const ANIMATION_ENABLED = true;
