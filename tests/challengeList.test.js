import { challengesList } from "./challengesList";
import { filterChallenges } from "../scripts/filter";

const baseFilter = {
  minRating: 0,
  maxRating: 5,
  tag: [],
  searchText: "",
  includeOnline: false,
  includeOnsite: true,
};

const ids = (list) => list.map((c) => c.id);

beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});
afterEach(() => {
  jest.restoreAllMocks();
});

const cases = [
  ["rating 0 to 0", { minRating: 0, maxRating: 0 }, [10, 25]],
  ["rating 4.5 to 5", { minRating: 4.5 }, [9, 12, 18, 29]],
  ["no rating match", { minRating: 0.2, maxRating: 0.4 }, []],
  ["online only (no online data)", { includeOnline: true, includeOnsite: false }, []],
  ["both types off shows all", { includeOnline: false, includeOnsite: false }, "ALL"],
  ["tag ctf", { tag: ["ctf"] }, [4, 16, 23, 27]],
  ["tags ctf + ssh (AND)", { tag: ["ctf", "ssh"] }, [4, 23]],
  ["search 'space'", { searchText: "space" }, [4, 7, 9, 16, 19, 25]],
  ["search is case-insensitive", { searchText: "SPACE" }, [4, 7, 9, 16, 19, 25]],
  ["search no match", { searchText: "zzz" }, []],
  ["combined: tag javascript + rating >= 4", { tag: ["javascript"], minRating: 4 }, [4, 9, 18]],
];

test.each(cases)("%s", (_name, overrides, expected) => {
  globalThis.activeFilters = { ...baseFilter, ...overrides };
  const result = filterChallenges(challengesList);
  const expectedIds = expected === "ALL" ? ids(challengesList) : expected;
  expect(ids(result).sort((a, b) => a - b)).toEqual(expectedIds);
});