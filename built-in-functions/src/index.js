import { renderTable } from "./renderers";
import { sheetInfo } from "./hyperformulaConfig";

// Render the preview tables.
for (const [tableName, tableInfo] of Object.entries(sheetInfo)) {
  renderTable(
    tableInfo.sheetName,
    tableInfo.sheetName === "Formulas" ? 0 : false
  );
}
