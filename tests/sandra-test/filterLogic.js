function filterChallenges(challenges, filters) {
  return challenges.filter((challenge) => {
    const matchesRating =
      challenge.rating >= filters.minRating &&
      challenge.rating <= filters.maxRating;

    const matchesType =
      (!filters.includeOnline && !filters.includeOnsite) ||
      (challenge.type === "online" && filters.includeOnline) ||
      (challenge.type === "onsite" && filters.includeOnsite);

    const matchesTag =
      filters.tag.length === 0 ||
      filters.tag.every((tag) => challenge.labels.includes(tag));

    const searchText = filters.searchText.toLowerCase();
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchText) ||
      challenge.description.toLowerCase().includes(searchText);

    return matchesRating && matchesType && matchesTag && matchesSearch;
  });
}

module.exports = { filterChallenges };
