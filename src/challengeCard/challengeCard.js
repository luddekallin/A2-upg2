export function createChallengeCard(challenge) {
  const card = document.createElement('div');
  card.className = 'challenges__card';
  card.dataset.challengeId = challenge.id;
  card.dataset.challengeType = challenge.type;
  card.id = challenge.id;

  const stars = createRatingStars(challenge.rating);
  const participants = `${challenge.minParticipants}-${challenge.maxParticipants} participants`;

  card.innerHTML = `
    <img
      class="challenges__card__img"
      src="${challenge.image}"
      alt="${challenge.title}"
      loading="lazy"
    />

    <div class="challenges__card__content">
      <h3 class="challenges__card__title">${challenge.title} ${challenge.type === 'online' ? 'Online' : 'On-site'}</h3>

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

  return card;
}

function createRatingStars(rating) {
  const maxRating = 5;
  let stars = '';

  for (let i = 1; i <= maxRating; i += 1) {
    const isActive = i <= rating;
    stars += `<span class="challenges__card__star ${isActive ? 'challenges__card__star--active' : ''}">★</span>`;
  }

  return stars;
}