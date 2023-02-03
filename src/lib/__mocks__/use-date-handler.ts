import { format } from "date-fns";

export const useDate = {
  dateFormat: jest.fn().mockImplementation((date, dateFormat)=> format(date,dateFormat))
};
