function filterBySearch(challenges, activeFilters) {
  return challenges.filter((challenge) => {
    const searchText = activeFilters.searchText.toLowerCase();
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchText) ||
      challenge.description.toLowerCase().includes(searchText);

    return matchesSearch;
  });
}

const challenges = [
  {
    id: 1,
    title: "Hacking demystified",
    description: "Go out into space and back without leaving your computer",
    labels: ["ctf", "coding", "javascript"],
  },

  {
    id: 4,
    title: "Intelligence in space",
    description: "Hackers of the world, unite",
    labels: ["linux", "bash", "ssh", "javascript"],
  },

  {
    id: 6,
    title: "Revolution of Doom",
    description: "Take the ultimate challenge in this ultimate challenge",
    labels: ["electronics", "ssh", "phreaking"],
  },

  {
    id: 10,
    title: "Hacking for hackers",
    description: "Hackers of the world, unite",
    labels: ["phreaking", "bash"],
  },

  {
    id: 12,
    title: "Mystery demystified",
    description: "Bring back the skills of the past",
    labels: ["ssh", "bash"],
  },
];
module.exports = { filterBySearch, challenges };
