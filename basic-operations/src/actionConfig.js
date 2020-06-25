/**
 * Input configuration and definition.
 *
 * @type {object}
 */
export const inputConfig = {
  "add-sheet": {
    inputs: [
      {
        type: "text",
        placeholder: "Sheet name"
      }
    ],
    buttonText: "Add Sheet",
    disclaimer:
      "For the sake of this demo, the new sheets will be filled with random data."
  },
  "remove-sheet": {
    inputs: [
      {
        type: "text",
        placeholder: "Sheet name"
      }
    ],
    buttonText: "Remove Sheet"
  },
  "add-rows": {
    inputs: [
      {
        type: "number",
        placeholder: "Index"
      },
      {
        type: "number",
        placeholder: "Amount"
      }
    ],
    buttonText: "Add Rows"
  },
  "add-columns": {
    inputs: [
      {
        type: "number",
        placeholder: "Index"
      },
      {
        type: "number",
        placeholder: "Amount"
      }
    ],
    buttonText: "Add Columns"
  },
  "remove-rows": {
    inputs: [
      {
        type: "number",
        placeholder: "Index"
      },
      {
        type: "number",
        placeholder: "Amount"
      }
    ],
    buttonText: "Remove Rows"
  },
  "remove-columns": {
    inputs: [
      {
        type: "number",
        placeholder: "Index"
      },
      {
        type: "number",
        placeholder: "Amount"
      }
    ],
    buttonText: "Remove Columns"
  },
  "get-value": {
    inputs: [
      {
        type: "text",
        placeholder: "Cell Address"
      },
      {
        type: "text",
        disabled: "disabled",
        placeholder: ""
      }
    ],
    disclaimer: "Cell addresses format examples: A1, B4, C6.",
    buttonText: "Get Value"
  },
  "set-value": {
    inputs: [
      {
        type: "text",
        placeholder: "Cell Address"
      },
      {
        type: "text",
        placeholder: "Value"
      }
    ],
    disclaimer: "Cell addresses format examples: A1, B4, C6.",
    buttonText: "Set Value"
  }
};
