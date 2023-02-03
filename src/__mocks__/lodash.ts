// export const repeat = jest.fn().mockImplementation(() => "zika");

export default {
  repeat: jest.fn().mockImplementation(() => "repeat"),
  find: jest.fn().mockImplementation((par1: any) => par1),
};
