jest.mock("date-fns");
jest.mock("moment");

import { format, parseISO } from "date-fns";
import moment from "moment";
import { useDate } from "../lib/use-date-handler";
import { DATE_FORMAT } from "../types";

const { dateFormat, parseIso, dateFormatFromIso, parseToMoment } = useDate();
const stringFormat = DATE_FORMAT.ddMMyyyy;

beforeAll(() => {
  (format as any).mockImplementation(() => 'format');
  (parseISO as any).mockImplementation(() => 'iso');
  (moment as any).mockImplementation(() => 'moment');
});

it("should test dateFormat function", () => {
  const primerak = "2012-01-12";

  const mockedfn = jest.fn((d) => {
    return dateFormat(d);
  });

  const mockRes = mockedfn(primerak);

  const result = format(new Date(primerak), stringFormat);

  expect(format).toBeCalled();

  expect(mockRes).toBeDefined();
  expect(mockRes).toEqual(result);
});

it("should test parseIso function", () => {
  const primerak = "2012-01-12";

  const mockedfn = jest.fn((d) => {
    return parseIso(d);
  });

  const mockRes = mockedfn(primerak);

  expect(parseISO).toBeCalled();

  const result = parseIso(primerak);

  expect(mockRes).toBeDefined();
  expect(mockRes).toEqual(result);
});

it("should test dateFormatParseIso function", () => {
  const primerak = "2012-01-12";

  const mockedfn = jest.fn((d) => {
    return dateFormatFromIso(d);
  });

  const mockRes = mockedfn(primerak);

  expect(parseISO).toBeCalled();
  expect(parseISO).toBeCalledWith(primerak);
  expect(format).toBeCalled();

  const parsedDate = parseIso(primerak);
  const result = format(new Date(parsedDate), stringFormat);

  expect(mockRes).toBeDefined();
  expect(mockRes).toEqual(result);
});

it("should test parseToMoment function", () => {
  const primerak = "2012-01-12";

  const mockedfn = jest.fn((d) => {
    return parseToMoment(d);
  });

  const mockRes = mockedfn(primerak);

  expect(moment).toBeCalled();

  const result = moment(primerak, stringFormat);

  expect(mockRes).toBeDefined();
  expect(mockRes).toEqual(result);
});
