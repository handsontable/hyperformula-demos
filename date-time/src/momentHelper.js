import moment from "moment";

/**
 * Function defining the way HF should handle the provided date string.
 *
 * @param {string} dateString The date string.
 * @param {string} dateFormat The date format.
 * @returns {{month: *, year: *, day: *}} Object with date-related information.
 */
export const customParseDate = (dateString, dateFormat) => {
  const momentDate = moment(dateString, dateFormat, true);

  if (momentDate.isValid()) {
    return {
      year: momentDate.year(),
      month: momentDate.month() + 1,
      day: momentDate.date()
    };
  }
};

/**
 * Date formatting function.
 *
 * @param {{month: *, year: *, day: *}} dateObject Object with date-related information.
 * @returns {string} Formatted date string.
 */
export const getFormattedDate = dateObject => {
  dateObject.month -= 1;

  return moment(dateObject).format("MMM D YY");
};
