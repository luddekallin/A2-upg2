import { challengesList, getTopChallenges } from "./challengesList";

test("should return 3 results", () => {
  const topC = getTopChallenges(challengesList);
  expect(topC.length).toBe(3);
});

test("should return challenges with the highest ratings", () => {
  const topC = getTopChallenges(challengesList);

  const expectedRatings = challengesList
    .map((c) => c.rating)
    .sort((a, b) => b - a)
    .slice(0, 3);

  const actualRatings = topC.map((c) => c.rating);

  expect(actualRatings).toEqual(expectedRatings);
});

test("top challenges are not lower than the rest", () => {
  const topC = getTopChallenges(challengesList);
  const rest = challengesList.filter((c) => !topC.includes(c));

  const minTop = Math.min(...topC.map((c) => c.rating));
  const maxRest = Math.max(...rest.map((c) => c.rating));

  expect(minTop).toBeGreaterThanOrEqual(maxRest);
});
