const { filterBySearch, challenges } = require("./filterSearch");

test("filtrerar fram de challenges som innehåller sökordet i titeln", () => {
  const activeFilters = { searchText: "DEMystified" };

  const result = filterBySearch(challenges, activeFilters);

  expect(result.length).toBe(2);
});

test("filtrera fram de challenges som innehåller sökordet i description", () => {
  const activeFilters = { searchText: "skills" };

  const result = filterBySearch(challenges, activeFilters);

  expect(result.length).toBe(1);
});

test("filtrera fram de challenges som innehåller sökordet i både description och titeln", () => {
  const activeFilters = { searchText: "HACK" };

  const result = filterBySearch(challenges, activeFilters);

  expect(result.length).toBe(3);
});
