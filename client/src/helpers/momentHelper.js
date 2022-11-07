import moment from "moment";

/**
 *
 * @param {Number} back
 * @returns Array of years
 */

const yearsBack = (back) => {
  const year = new Date().getFullYear();
  return Array.from({ length: back }, (v, i) => year - back + i + 1);
};

const arrayOfMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 *
 * Enable to format date parameters into desirable String outcome
 * @param {String} format
 * @param {Date} from
 * @param {String | Date} to
 * @returns String
 */

const dateFromToRange = (format, from, to) => {
  const fromParsed = moment(Date.parse(from)).format(format);
  const toParsed =
    typeof to === "string" || to instanceof String
      ? to
      : moment(Date.parse(to)).format(format);
  return fromParsed + " - " + toParsed;
};

/**
 *
 * Enable to format two date parameters in date difference return as readable text
 * @param {Date} from
 * @param {String | Date} to
 * @returns String
 */

const dateDifferenceFormatted = (from, to) => {
  let fromParsed = moment(Date.parse(from));
  let toParsed =
    to === "Present" || to === "Invalid date"
      ? moment(new Date())
      : moment(Date.parse(to));
  const diffInYears = toParsed.diff(fromParsed, "years");
  fromParsed.add(diffInYears, "years");
  const diffInMonths = toParsed.diff(fromParsed, "months");
  fromParsed.add(diffInMonths, "months");

  return `${diffInYears !== 0 ? diffInYears + " y" : ""} ${
    diffInMonths !== 0 ? diffInMonths + " m" : ""
  }`.trim();
};

const greetings = () => {
  const hour = moment().hour();

  if (hour > 16) {
    return "Good evening";
  }

  if (hour > 11) {
    return "Good afternoon";
  }

  return "Good morning";
};

export {
  dateFromToRange,
  dateDifferenceFormatted,
  yearsBack,
  arrayOfMonths,
  greetings,
};
