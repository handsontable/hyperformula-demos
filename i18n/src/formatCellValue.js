import { hf } from "./hyperformulaConfig";
import moment from "moment";

const columnTypes = ['string', 'string', 'string', 'string'];

/**
 * Display value in human-readable format
 *
 * @param {SimpleCellAddress} cellAddress Cell address.
 */
export function formatCellValue(cellAddress) {
  if (hf.isCellEmpty(cellAddress)) {
    return "";
  }

  if (columnTypes[cellAddress.col] === 'time') {
    return formatTime(hf.numberToTime(hf.getCellValue(cellAddress)));
  }

  if (columnTypes[cellAddress.col] === 'date') {
    return formatDate(hf.numberToDate(hf.getCellValue(cellAddress)));
  }

  if (columnTypes[cellAddress.col] === 'currency') {
    return formatCurrency((hf.getCellValue(cellAddress)));
  }

  return hf.getCellValue(cellAddress)
}

/**
 * Date formatting function.
 *
 * @param {{month: *, year: *, day: *}} dateObject Object with date-related information.
 */
 export function formatDate(dateObject) {
  dateObject.month -= 1;

  return moment(dateObject).format('MM/DD/YYYY');
};

/**
 * Time formatting function.
 *
 * @param dateTimeObject Object with date and time information.
 */
 export function formatTime(dateTimeObject) {
  return moment(dateTimeObject).format('h:mm A');
};

/**
 * Currency formatting function.
 *
 * @param value Number representing the currency value
 */
 export function formatCurrency(value) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
