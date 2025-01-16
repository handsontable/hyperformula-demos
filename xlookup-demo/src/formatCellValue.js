import { hf } from "./hyperformulaConfig";
import moment from "moment";

const columnTypes = ['string', 'string', 'currency'];

/**
 * Display value in human-readable format
 *
 * @param {SimpleCellAddress} cellAddress Cell address.
 */
export function formatCellValue(cellAddress) {
  const value = hf.getCellValue(cellAddress);

  if (hf.isCellEmpty(cellAddress)) {
    return "";
  }

  // Only attempt currency formatting if the value is a number
  if (columnTypes[cellAddress.col] === 'currency' && typeof value === 'number') {
    return formatCurrency(value);
  }

  return value;
}

/**
 * Date formatting function.
 *
 * @param {{month: *, year: *, day: *}} dateObject Object with date-related information.
 */
export function formatDate(dateObject) {
  dateObject.month -= 1;
  return moment(dateObject).format('MM/DD/YYYY');
}

/**
 * Time formatting function.
 *
 * @param dateTimeObject Object with date and time information.
 */
export function formatTime(dateTimeObject) {
  return moment(dateTimeObject).format('h:mm A');
}

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
}