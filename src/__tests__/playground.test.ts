import { renderHook } from "@testing-library/react";
const mockedModule = jest.createMockFromModule("../lib/use-date-handler") as any; 
mockedModule.dateFormat = jest.fn(()=> mockedModule)
import { useDate } from "../lib/use-date-handler";

const { result } = renderHook(() => useDate());

it("should...", () => {
  // console.log(jest.isMockFunction(result.current.dateFormat));
  console.log(jest.isMockFunction(mockedModule.dateFormat));
  // console.log(result.current);
});
export {};
