export function createChallengeCard(challenge) {
  const card = document.createElement('div');
  card.className = 'challenge-card';
  card.dataset.challengeId = challenge.id;
  card.dataset.challengeType = challenge.type;
  card.id = challenge.id;

  const stars = createRatingStars(challenge.rating);
  const participants = `${challenge.minParticipants}-${challenge.maxParticipants} participants`;

  card.innerHTML = `
    <img
      class="challenge-card__img"
      src="${challenge.image}"
      alt="${challenge.title}"
      loading="lazy"
    />

    <div class="challenge-card__content">
      <h3 class="challenge-card__title">${challenge.title} ${challenge.type === 'online' ? 'Online' : 'Onsite'}</h3>

      <div class="challenge-card__meta">
        <div class="challenge-card__stars">
          ${stars}
        </div>
        <span class="challenge-card__participants">
          ${participants}
        </span>
      </div>

      <p class="challenge-card__text">
        ${challenge.description}
      </p>

      <a
          class="challenge-card__btn"
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
    stars += `<span class="star ${isActive ? 'star--active' : ''}">★</span>`;
  }

  return stars;
}