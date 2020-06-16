import { renderTable } from "./src/renderers";
import { bindEvents } from "./src/ui";

import "./src/styles.css";
import "../node_modules/milligram/";

// Bind the button events.
bindEvents();

// Render the table.
renderTable();
