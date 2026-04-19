import { gallery, getDeckByID } from "./gallery.js";
import { renderCarouselView } from "./carousel.js";
import { hexToString } from "./colorMap.js";

let currentDeckID = null;

const cardTemplate = document.getElementById("card-template");
const galleryList = document.querySelector(".gallery__list");
const homeView = document.getElementById("home");
const notFoundView = document.getElementById("not-found");
const carouselView = document.getElementById("carousel");
const mainEl = document.querySelector("main.page__main-content");

function renderRoute() {
  const hash = window.location.hash;

  if (hash === "" || hash === "#home") {
    homeView.style.display = "";
    notFoundView.style.display = "none";
    carouselView.style.display = "none";
    mainEl.classList.remove("page__main-content_location_carousel");
  } else if (hash.startsWith("#carousel/")) {
    const deckID = hash.split("/")[1];
    const deck = getDeckByID(deckID);
    if (deck && Array.isArray(deck.cards) && deck.cards.length > 0) {
      renderCarouselView(deck);
      homeView.style.display = "none";
      notFoundView.style.display = "none";
      carouselView.style.display = "flex";
      mainEl.classList.add("page__main-content_location_carousel");
    } else {
      homeView.style.display = "none";
      notFoundView.style.display = "";
      carouselView.style.display = "none";
      mainEl.classList.remove("page__main-content_location_carousel");
    }
  } else {
    homeView.style.display = "none";
    notFoundView.style.display = "";
    carouselView.style.display = "none";
    mainEl.classList.remove("page__main-content_location_carousel");
  }
}

function createDeckEl(item) {
  const fragment = cardTemplate.content.cloneNode(true);
  const deckEl = fragment.querySelector(".card");
  deckEl.querySelector(".card__title").textContent = item.name;
  deckEl.querySelector(".card__count").textContent =
    `${item.cards.length} cards`;

  const colorName = hexToString(item.color);
  deckEl.classList.add(`card_color_${colorName}`);

  const deckLink = deckEl.querySelector(".card__link");
  deckLink.href = `#carousel/${item.id}`;
  deckLink.addEventListener("click", () => {
    currentDeckID = item.id;
  });
  return deckEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  const deleteBtn = deckEl.querySelector(".card__delete-btn");

  deleteBtn.addEventListener("click", () => {
    deckEl.remove();
  });
  galleryList.prepend(deckEl);
}
gallery.forEach(renderDeckEl);

window.addEventListener("hashchange", renderRoute);
renderRoute();
