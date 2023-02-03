import lodash from "lodash";
import dateFns from 'date-fns'

it("should", () => {
  // <============ LODASH ===========>
  // console.log("dddd", lodash.repeat('ss'));
  // console.log("dddd", lodash.find('4'));
  expect(lodash.repeat()).toBe("repeat")// passes;
  // <============ date-fns ==========>
  // console.log('date-fns', dateFns.format())
});
