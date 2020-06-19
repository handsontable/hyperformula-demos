import moment from "moment";

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
