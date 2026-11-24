export function createChallengeCard(challenge, design = "figma") {
  const card = document.createElement("div");
  card.className = "challenges__card";
  if (design === "wireframe") {
    card.classList.add("challenges__card--wireframe");
  }
  card.dataset.challengeId = challenge.id;
  card.dataset.challengeType = challenge.type;
  card.id = challenge.id;

  const stars = createRatingStars(challenge.rating);
  const participants = `${challenge.minParticipants}-${challenge.maxParticipants} participants`;

  card.innerHTML = `
  
    <img
      class="challenges__card__img challenges__card-img"
      src="${challenge.image}"
      alt="${challenge.title}"
      loading="lazy"
    />

    <div class="challenges__card__content">
      <h3 class="challenges__card__title">${challenge.title} ${challenge.type === "online" ? "Online" : "On-site"}</h3>

      <div class="challenges__card__meta">
        <div class="challenges__card__stars">
          ${stars}
        </div>
        <span class="challenges__card__participants">
          ${participants}
        </span>
      </div>

      <p class="challenges__card__text">
        ${challenge.description}
      </p>

      <a
          class="challenges__card__btn"
          href="/challenges.html?challenge=${challenge.id}"
        >
          Book this room
      </a>
    </div>
  `;
  if (design === "wireframe") {
    const image = card.querySelector(".challenges__card__img");

    const media = document.createElement("div");
    media.className = "challenges__card-media";

    image.before(media);
    media.appendChild(image);
    image.src = "images/main-img.png";
    const icon = document.createElement("img");
    if (challenge.type === "online") {
      icon.src = "images/laptop.svg";
    } else {
      icon.src = "images/house.svg";
    }
    icon.className = "challenges__card-icon";
    icon.alt = "";
    media.appendChild(icon);
    const rating = card.querySelector(".challenges__card__stars");

    rating.classList.add("challenges__card-rating");

    media.appendChild(rating);
    const title = card.querySelector(".challenges__card__title");
    title.classList.add("challenges__card-title");
    const participantsText = card.querySelector(
      ".challenges__card__participants",
    );
    participantsText.classList.add("challenges__card-participants");
    const description = card.querySelector(".challenges__card__text");
    description.classList.add("challenges__card-description");
    const button = card.querySelector(".challenges__card__btn");
    button.classList.add("challenges__card-btn");
    if (challenge.type === "online") {
      button.textContent = "Take challenge online";
    }
  }
  return card;
}

function createRatingStars(rating) {
  const maxRating = 5;
  let stars = "";

  for (let i = 1; i <= maxRating; i += 1) {
    const isActive = i <= rating;
    const isHalfStar = rating - (i - 1) === 0.5;
    console.log(rating, i, isActive, isHalfStar);
    let starClass = "challenges__card__star";
    if (isHalfStar) {
      starClass += " challenges__card__star--half";
    }
    else if (isActive) {
      starClass += " challenges__card__star--active";
    }
    stars += `<span class="${starClass}">★</span>`;
  }

  return stars;
}
