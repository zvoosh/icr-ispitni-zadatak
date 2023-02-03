var { format, ...rest } = jest.requireActual("date-fns");

format = jest.fn().mockImplementation((par1:any, par2: any) => {
  return {
    prvi: par1,
    drugi: par2
  }
});

export {format, } from 'date-fns';
