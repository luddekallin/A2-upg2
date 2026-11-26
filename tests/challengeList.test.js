
const { challengesList } = require("./challengesList");
const { filterChallenges} = require("../scripts/filter")
const firstfilter = {
    "minRating": 0,
    "maxRating": 0,
    "tag": [],
    "searchText": "",
    "includeOnline": false,
    "includeOnsite": true
}

test("return empty array if min and max rating 0", () => {
//  expect(isRadio({ target: { type: "radio" } })).toBe(true);
});

test("returnerar false när target inte är en radioknapp", () => {
// expect(isRadio({ target: { type: "booking" } })).toBe(false);
});

//onSiteCheckBox i filter.js

test("returnerar false när target är null", () => {
//  expect(isChecked({ target: null })).toBe(false);
});