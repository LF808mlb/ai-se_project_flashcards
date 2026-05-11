import { getDeckByID, fetchedDecks, deleteDeckHelper } from "./decks.js";
import { renderCarouselView } from "./carousel.js";
import { hexToString } from "./colorMap.js";
import { renderDeckView } from "./deck-view.js";
import { disableSubmitBtn } from "./new-deck-view.js";
import { getDecks, deleteDeck } from "./api.js";
import { showError } from "./new-deck-view.js";

let currentDeckID = null;

const cardTemplate = document.getElementById("card-template");
const galleryList = document.querySelector(".gallery__list");
const homeView = document.getElementById("home");
const notFoundView = document.getElementById("not-found");
const carouselView = document.getElementById("carousel");
const deckView = document.getElementById("deck-view");
const mainEl = document.querySelector("main.page__main-content");
const newDeckView = document.getElementById("new-deck-view");

/**
 * Handles client-side routing for the application by showing and hiding
 * the appropriate view based on the current URL hash.
 * Updates the display of main sections (home, deck, carousel, not found, new deck view)
 * and manages page layout classes for mobile and carousel views.
 */
function renderRoute() {
  const hash = window.location.hash;
  const aboutView = document.getElementById("about");
  // Hide all views first
  homeView.style.display = "none";
  notFoundView.style.display = "none";
  carouselView.style.display = "none";
  deckView.style.display = "none";
  newDeckView.style.display = "none";
  if (aboutView) aboutView.style.display = "none";

  if (hash === "" || hash === "#home") {
    homeView.style.display = "";
  } else if (hash === "#about") {
    if (aboutView) aboutView.style.display = "block";
  } else if (hash.startsWith("#deck/")) {
    // Extract deck ID from hash
    const deckID = hash.split("/")[1];
    const deck = getDeckByID(deckID);
    if (deck && Array.isArray(deck.cards)) {
      renderDeckView(deck);
      deckView.style.display = "block";
    } else {
      notFoundView.style.display = "";
    }
  } else if (hash.startsWith("#carousel/")) {
    // Extract deck ID from hash
    const deckID = hash.split("/")[1];
    const deck = getDeckByID(deckID);
    if (deck && Array.isArray(deck.cards) && deck.cards.length > 0) {
      renderCarouselView(deck);
      carouselView.style.display = "flex";
    } else {
      notFoundView.style.display = "";
    }
  } else if (hash === "#new-deck-view") {
    newDeckView.style.display = "block";
    if (typeof disableSubmitBtn === "function") disableSubmitBtn();
  } else {
    notFoundView.style.display = "";
  }
}

/**
 * Creates a DOM element representing a deck card for the gallery view.
 *
 * @param {Object} item - The deck object to render.
 * @param {string} item._id - The unique identifier for the deck.
 * @param {string} item.name - The name of the deck.
 * @param {string} item.color - The color of the deck.
 * @param {Array} item.cards - The array of card objects in the deck.
 * @returns {HTMLElement} The DOM element representing the deck card.
 */
function createDeckEl(item) {
  const fragment = cardTemplate.content.cloneNode(true);
  const deckEl = fragment.querySelector(".card");
  deckEl.querySelector(".card__title").textContent = item.name;
  deckEl.querySelector(".card__count-btn").textContent =
    `${item.cards.length} cards`;

  const colorName = hexToString(item.color);
  deckEl.classList.add(`card_color_${colorName}`);

  const deckLink = deckEl.querySelector(".card__link");
  deckLink.href = `#deck/${item._id}`;
  deckLink.addEventListener("click", () => {
    currentDeckID = item._id;
  });
  return deckEl;
}

/**
 * Renders a deck element in the gallery list and sets up its delete button handler.
 *
 * @param {Object} item - The deck object to render.
 * @param {string} item._id - The unique identifier for the deck.
 * @param {string} item.name - The name of the deck.
 * @param {string} item.color - The color of the deck.
 * @param {Array} item.cards - The array of card objects in the deck.
 * @returns {void}
 */
function renderDeckEl(item) {
  const deckEl = createDeckEl(item);
  const deleteBtn = deckEl.querySelector(".card__btn_type_delete");

  deleteBtn.addEventListener("click", () => {
    deleteDeck(item._id)
      .then(() => deleteDeckHelper(item._id))
      .catch(() => {
        showError("Error deleting deck");
      });
  });
  galleryList.prepend(deckEl);
}

window.addEventListener("DOMContentLoaded", () => {
  getDecks()
    .then((decks) => {
      fetchedDecks.push(...decks);
      decks.forEach(renderDeckEl);
    })
    .catch(() => {
      showError("Error fetching decks");
    })
    .finally(() => {
      renderRoute();
      // Add event listener for New Deck button in home view
      const newDeckBtn = document.querySelector("#home .gallery__new-card-btn");
      if (newDeckBtn) {
        newDeckBtn.addEventListener("click", () => {
          window.location.hash = "#new-deck-view";
        });
      }
    });
});

window.addEventListener("hashchange", renderRoute);
renderRoute();
