import { tableData } from "./fixture/data";
import {
  initializeHF,
  initializeNamedExpressions,
  initHFValues
} from "./employees.hf";

const TOTAL_EXPRESSIONS = ["=SUM(Year_1)", "=SUM(Year_2)"];
const EMPLOYEE_SHEET_ID = "employeeSheet";

const EmployeesDataProvider = {
  data: () => ({
    withCalculations: false
  }),
  created() {
    const { hf, sheetId, sheetName } = initializeHF(EMPLOYEE_SHEET_ID);
    this.hf = hf;
    this.sheetId = sheetId;
    this.sheetName = sheetName;

    // Fill the HyperFormula sheet with data.
    initHFValues(hf, sheetId, tableData);

    // Add named expressions
    initializeNamedExpressions(hf, sheetName);
  },
  computed: {
    tableValues: function() {
      if (this.withCalculations) {
        const calculatedValues = this.hf.getSheetValues(this.sheetId);
        // format the display of numbers
        const formmatedValues = calculatedValues.map(row => {
          return row.map(cell => {
            if (!isNaN(cell)) return cell.toFixed(2);
            return cell;
          });
        });
        return formmatedValues;
      }
      return this.hf.getSheetSerialized(this.sheetId);
    },
    tableTotals: function() {
      if (this.withCalculations) {
        return TOTAL_EXPRESSIONS.map(expression =>
          this.hf.calculateFormula(expression, this.sheetId).toFixed(2)
        );
      }
      return TOTAL_EXPRESSIONS;
    }
  },
  methods: {
    setWithCalculationsFlag: function(withCalculations) {
      this.withCalculations = withCalculations;
    }
  },
  render() {
    return this.$scopedSlots.default({
      data: this.tableValues,
      totals: this.tableTotals,
      setWithCalculationsFlag: this.setWithCalculationsFlag
    });
  }
};

export default EmployeesDataProvider;
