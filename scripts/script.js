import { getChallenges } from '../scripts/api.js';
import { createChallengeCard } from '../src/challengeCard/challengeCard.js';

//variables
const menuBtn = document.querySelector("#menu-btn");
const navMenu = document.querySelector("#nav-menu");
const menuList = document.querySelector("#nav-menu__list");
const menuListChildren = menuList.querySelectorAll("li");
const body = document.querySelector("body");

//event listeners
menuBtn.addEventListener(
    "click",
    openMenu
);

//functions
function openMenu(){
    if (navMenu.getAttribute("class") == "header__nav__menu"){
        navMenu.setAttribute("class", "");
        body.setAttribute("class", "");
        menuBtn.setAttribute("class", "header__hamburger");
        menuList.setAttribute("class", "header__nav");
        menuListChildren.forEach(child => {
            child.classList.remove("header__nav__menu__list__children")
        });
    }

    else{
        navMenu.setAttribute("class", "header__nav__menu");
        body.setAttribute("class", "no-scroll");
        menuBtn.setAttribute("class", "header__nav__menu__close-btn");
        menuList.setAttribute("class", "header__nav__menu__list");
        menuListChildren.forEach(child => {
            child.classList.add("header__nav__menu__list__children")
        });
    }
}

const topChallengesContainer = document.querySelector('#top-challenges');

async function renderTopChallenges() {
  try {
    const challenges = await getChallenges();

    const topChallenges = [...challenges]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);

    topChallengesContainer.innerHTML = '';

    topChallenges.forEach((challenge) => {
      const card = createChallengeCard(challenge);
      topChallengesContainer.append(card);
    });
  } catch (error) {
    console.error(error);

    topChallengesContainer.innerHTML = `
      <li>No matching challenges</li>
    `;
  }
}

if (topChallengesContainer) {
  renderTopChallenges();
}