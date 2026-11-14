const activeFilters = {
  minRating: 1,
  maxRating: 5,
};

const minContainer = document.getElementById("min-stars");
const maxContainer = document.getElementById("max-stars");

for (let i = 5; i >= 1; i--) {
  const minRadio = document.createElement("input");
  minRadio.type = "radio";
  minRadio.name = "minRating";
  minRadio.id = "min-" + i;
  minRadio.value = i;

  const minLabel = document.createElement("label");
  minLabel.htmlFor = "min-" + i;
  minLabel.innerHTML = `<img src="images/Star 5.png" class="star-empty" alt="${i} stjärnor">
 <img src="images/Star 2.png" class="star-filled" alt="${i} stjärnor"> `;

  minContainer.appendChild(minRadio);
  minContainer.appendChild(minLabel);

  const maxRadio = document.createElement("input");
  maxRadio.type = "radio";
  maxRadio.name = "maxRating";
  maxRadio.id = "max-" + i;
  maxRadio.value = i;

  const maxLabel = document.createElement("label");
  maxLabel.htmlFor = "max-" + i;
  maxLabel.innerHTML = `<img src="images/Star 5.png" class="star-empty" alt="${i} stjärnor">
 <img src="images/Star 2.png" class="star-filled" alt="${i} stjärnor">`;

  maxContainer.appendChild(maxRadio);
  maxContainer.appendChild(maxLabel);
}

minContainer.addEventListener("change", (event) => {
  activeFilters.minRating = Number(event.target.value);
  if (activeFilters.minRating > activeFilters.maxRating) {
    activeFilters.maxRating = activeFilters.minRating;
    document.getElementById("max-" + activeFilters.minRating).checked = true;
  }
});

maxContainer.addEventListener("change", (event) => {
  activeFilters.maxRating = Number(event.target.value);
  if (activeFilters.maxRating < activeFilters.minRating) {
    activeFilters.minRating = activeFilters.maxRating;
    document.getElementById("min-" + activeFilters.maxRating).checked = true;
  }
});
