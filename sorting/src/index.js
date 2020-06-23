import { renderTable } from "./renderers";
import { bindEvents } from "./ui";

import "./styles.css";
import "../node_modules/milligram/";

// Bind the button events.
bindEvents();

// Render the table.
renderTable();
