import { createRatingStars } from "../src/challengeCard/challengeCard.js";

test("should generate 3 active stars", () => {
  const stars = createRatingStars(3);
  const activeStars = stars.split("challenges__card__star--active");
  console.log(activeStars);
  console.log(activeStars.length - 1);
  expect(activeStars.length - 1).toBe(3);
});

test("should generate 1 half stars", () => {
  const stars = createRatingStars(3.5);
  const halfStars = stars.split("challenges__card__star--half");
  expect(halfStars.length - 1).toBe(1);
});

test("should generate 2 emty stars", () => {
  const stars = createRatingStars(3);
  const emptyStars = stars.split('challenges__card__star"');
  expect(emptyStars.length - 1).toBe(2);
});

test("should  generate emty stars when rating is 0", () => {
    const stars = createRatingStars(0);
    const halfStars = stars.split("challenges__card__star--half");
    const activeStars = stars.split("challenges__card__star--active");
    const emptyStars = stars.split('challenges__card__star"');
    expect(emptyStars.length - 1).toBe(5);
    expect(halfStars.length - 1).toBe(0);
    expect(activeStars.length - 1).toBe(0);
});

test("should generate 5 active stars when rating is 5", () => {
    const stars = createRatingStars(5);
    const activeStars = stars.split("challenges__card__star--active");
    expect(activeStars.length - 1).toBe(5);
});