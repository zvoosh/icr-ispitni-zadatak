import { renderHook } from "@testing-library/react";
import {format} from "date-fns";
// import { format } from "date-fns";
import { useDate } from "../lib/use-date-handler";

const { result } = renderHook(() => useDate());

it("should test dateFormat function", () => {
  const primerak = "2012-01-12";

  const mockedfn = jest.fn((d) => {
    return result.current.dateFormat(d);
  });

  console.log(jest.isMockFunction(format))

  // const mockRes = mockedfn(primerak);

  // expect(format).toBeCalled();

  // expect(mockRes).toBeDefined();
});

// it("should test parseIso function", () => {
//   const primerak = "2012-01-12";

//   const mockedfn = jest.fn((d) => {
//     return result.current.parseIso(d);
//   });

//   const mockRes = mockedfn(primerak);

//   expect(parseISO).toBeCalled();

//   expect(mockRes).toBeDefined();
// });

// it("should test dateFormatParseIso function", () => {
//   const primerak = "2012-01-12";

//   const mockedfn = jest.fn((d) => {
//     return result.current.parseIso(d);
//   });

//   const mockRes = mockedfn(primerak);

//   expect(parseISO).toBeCalled();
//   expect(parseISO).toBeCalledWith(primerak);
//   expect(format).toBeCalled();

//   expect(mockRes).toBeDefined();
// });

// it("should test parseToMoment function", () => {
//   const primerak = "2012-01-12";

//   const mockedfn = jest.fn((d) => {
//     return  result.current.parseToMoment(d);
//   });

//   const mockRes = mockedfn(primerak);

//   expect(moment).toBeCalled();

//   expect(mockRes).toBeDefined();
// });
