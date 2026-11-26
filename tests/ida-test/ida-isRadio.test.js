const { isRadio, isChecked } = require("./ida-isRadio");

//maxContainer i filter.js
test("returnerar true när target är en radioknapp", () => {
  expect(isRadio({ target: { type: "radio" } })).toBe(true);
});

test("returnerar false när target inte är en radioknapp", () => {
  expect(isRadio({ target: { type: "booking" } })).toBe(false);
});

//onSiteCheckBox i filter.js

test("returnerar false när target är null", () => {
  expect(isChecked({ target: null })).toBe(false);
});
