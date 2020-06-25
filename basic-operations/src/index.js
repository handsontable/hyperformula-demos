import { renderTable, updateSheetDropdown } from "./renderers";
import { bindEvents } from "./ui";

// // Bind the UI events.
bindEvents();

// Render the table.
renderTable();

// Refresh the sheet dropdown list
updateSheetDropdown();
