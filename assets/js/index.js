import { gallery, getDeckByID } from "./gallery.js";
import { renderCarouselView } from "./carousel.js";
import { hexToString } from "./colorMap.js";
import { renderDeckView } from "./deck-view.js";
import { disableSubmitBtn } from "./new-deck-view.js";
import { getDecks } from "./api.js";

let currentDeckID = null;

const cardTemplate = document.getElementById("card-template");
const galleryList = document.querySelector(".gallery__list");
const homeView = document.getElementById("home");
const notFoundView = document.getElementById("not-found");
const carouselView = document.getElementById("carousel");
const deckView = document.getElementById("deck-view");
const mainEl = document.querySelector("main.page__main-content");
const newDeckView = document.getElementById("new-deck-view");

function renderRoute() {
  const hash = window.location.hash;
  const pageEl = document.querySelector(".page");

  if (hash === "" || hash === "#home") {
    homeView.style.display = "";
    notFoundView.style.display = "none";
    carouselView.style.display = "none";
    deckView.style.display = "none";
    mainEl.classList.remove("page__main-content_location_carousel");
    if (pageEl) pageEl.classList.remove("page_no-mobile-bar");
  } else if (hash.startsWith("#deck/")) {
    const deckID = hash.split("/")[1];
    const deck = getDeckByID(deckID);
    if (deck && Array.isArray(deck.cards)) {
      renderDeckView(deck);
      homeView.style.display = "none";
      notFoundView.style.display = "none";
      carouselView.style.display = "none";
      deckView.style.display = "block";
      mainEl.classList.remove("page__main-content_location_carousel");
      if (pageEl) pageEl.classList.remove("page_no-mobile-bar");
    } else {
      homeView.style.display = "none";
      notFoundView.style.display = "";
      carouselView.style.display = "none";
      deckView.style.display = "none";
      mainEl.classList.remove("page__main-content_location_carousel");
      if (pageEl) pageEl.classList.remove("page_no-mobile-bar");
    }
  } else if (hash.startsWith("#carousel/")) {
    const deckID = hash.split("/")[1];
    const deck = getDeckByID(deckID);
    if (deck && Array.isArray(deck.cards) && deck.cards.length > 0) {
      renderCarouselView(deck);
      homeView.style.display = "none";
      notFoundView.style.display = "none";
      carouselView.style.display = "flex";
      deckView.style.display = "none";
      mainEl.classList.add("page__main-content_location_carousel");
      if (pageEl) pageEl.classList.add("page_no-mobile-bar");
    } else {
      homeView.style.display = "none";
      notFoundView.style.display = "";
      carouselView.style.display = "none";
      deckView.style.display = "none";
      mainEl.classList.remove("page__main-content_location_carousel");
      if (pageEl) pageEl.classList.remove("page_no-mobile-bar");
    }
  } else if (hash === "#new-deck-view") {
    homeView.style.display = "none";
    notFoundView.style.display = "none";
    carouselView.style.display = "none";
    deckView.style.display = "none";
    newDeckView.style.display = "block";
    mainEl.classList.remove("page__main-content_location_carousel");
    if (pageEl) pageEl.classList.remove("page_no-mobile-bar");
    disableSubmitBtn();
  } else {
    homeView.style.display = "none";
    notFoundView.style.display = "";
    carouselView.style.display = "none";
    deckView.style.display = "none";
    mainEl.classList.remove("page__main-content_location_carousel");
    if (pageEl) pageEl.classList.remove("page_no-mobile-bar");
  }
}

function createDeckEl(item) {
  const fragment = cardTemplate.content.cloneNode(true);
  const deckEl = fragment.querySelector(".card");
  deckEl.querySelector(".card__title").textContent = item.name;
  deckEl.querySelector(".card__count-btn").textContent =
    `${item.cards.length} cards`;

  const colorName = hexToString(item.color);
  deckEl.classList.add(`card_color_${colorName}`);

  const deckLink = deckEl.querySelector(".card__link");
  deckLink.href = `#deck/${item.id}`;
  deckLink.addEventListener("click", () => {
    currentDeckID = item.id;
  });
  return deckEl;
}

function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  const deleteBtn = deckEl.querySelector(".card__btn_type_delete");

  deleteBtn.addEventListener("click", () => {
    deckEl.remove();
  });
  galleryList.prepend(deckEl);
}
gallery.forEach(renderDeckEl);

window.addEventListener("hashchange", renderRoute);
renderRoute();
