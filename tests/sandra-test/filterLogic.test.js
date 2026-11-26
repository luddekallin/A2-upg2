const { filterChallenges } = require("./filterLogic");

const mockChallenges = [
  {
    title: "Hacker Heist",
    description: "Steal data from the server",
    rating: 4.5,
    type: "online",
    labels: ["coding", "hard"],
  },
  {
    title: "The Haunted Basement",
    description: "Escape before midnight",
    rating: 2.0,
    type: "onsite",
    labels: ["horror"],
  },
];

describe("filterChallenges", () => {
  test("filtrerar fram endast online-challenges när includeOnsite är false", () => {
    const filters = {
      minRating: 0.0,
      maxRating: 5.0,
      tag: [],
      searchText: "",
      includeOnline: true,
      includeOnsite: false,
    };

    const result = filterChallenges(mockChallenges, filters);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Hacker Heist");
  });

  test("filtrerar fram endast challenges med minRating 2.0 och maxRating 3.0", () => {
    const filters = {
      minRating: 2.0,
      maxRating: 3.0,
      tag: [],
      searchText: "",
      includeOnline: true,
      includeOnsite: true,
    };

    const result = filterChallenges(mockChallenges, filters);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe("The Haunted Basement");
  });

  test("filtrerar fram endast challenges med tag coding", () => {
    const filters = {
      minRating: 0.0,
      maxRating: 5.0,
      tag: ["coding"],
      searchText: "",
      includeOnline: true,
      includeOnsite: true,
    };

    const result = filterChallenges(mockChallenges, filters);

    expect(result.length).toBe(1);
    expect(result[0].title).toBe("Hacker Heist");
  });

  test("filtrerar fram endast challenges med searchText Gaming", () => {
    const filters = {
      minRating: 0.0,
      maxRating: 5.0,
      tag: [],
      searchText: "Gaming",
      includeOnline: true,
      includeOnsite: true,
    };

    const result = filterChallenges(mockChallenges, filters);

    expect(result.length).toBe(0);
  });
});
