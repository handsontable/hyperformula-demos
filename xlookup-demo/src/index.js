import { renderTable } from "./renderers";
import { bindEvents, handleStateInput } from "./ui";

// Bind the button events.
bindEvents();

// Render the table.
renderTable();

handleStateInput();