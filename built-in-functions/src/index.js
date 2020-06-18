import { renderTable } from "./renderers";
import { sheetInfo } from "./hyperformulaConfig";

import "./styles.css";

// Render the preview tables.
for (const [tableName, tableInfo] of Object.entries(sheetInfo)) {
  renderTable(
    tableInfo.sheetName,
    tableInfo.sheetName === "Formulas" ? 0 : false
  );
}
