import { renderTable } from "./renderers";
import { bindEvents } from "./ui";
import { sheetInfo } from "./hyperformulaConfig";

// Bind the button events.
bindEvents();

// Render the preview tables.
for (const [tableName, tableInfo] of Object.entries(sheetInfo)) {
  renderTable(tableInfo.sheetName);
}
