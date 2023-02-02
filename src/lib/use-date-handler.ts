// import { format } from 'date-fns';
import { format, parseISO } from "date-fns";
import moment from "moment";
import { DATE_FORMAT } from "../types";

export const useDate = () => {
  const dateFormat = (
    date: Date | string,
    dateFormat = DATE_FORMAT.ddMMyyyy
  ) => {
    return format(new Date(date), dateFormat); //undefiend
  };

  const parseIso = (date: string) => parseISO(date);

  const parseToMoment = (date: string, dateFormat = DATE_FORMAT.ddMMyyyy) =>
    moment(date, dateFormat);

  const dateFormatFromIso = (
    date: string,
    dateFormat = DATE_FORMAT.ddMMyyyy
  ) => {
    const parsedDate = parseIso(date);
    return format(new Date(parsedDate), dateFormat);
  };

  return {
    dateFormat,
    parseIso,
    parseToMoment,
    dateFormatFromIso,
  };
};
