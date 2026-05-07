/**
 * Renders a single card in the deck view by creating its DOM element and appending it to the card list.
 *
 * @param {Object} cardData - The card data object containing question and answer.
 * @param {string} cardData.question - The question text for the card.
 * @param {string} cardData.answer - The answer text for the card.
 * @param {string} deckColor - The background color to use for the card.
 * @returns {void}
 */
function renderCard(cardData, deckColor) {
  const deckView = document.getElementById("deck-view");
  const cardList = deckView.querySelector(".gallery__list");
  const cardEl = createCard(cardData, deckColor);
  cardList.appendChild(cardEl);
}
/**
 * Creates a DOM element for a single card in the deck view, including flip and delete button logic.
 *
 * @param {Object} cardData - The card data object containing question and answer.
 * @param {string} cardData.question - The question text for the card.
 * @param {string} cardData.answer - The answer text for the card.
 * @param {string} deckColor - The background color to use for the card.
 * @returns {HTMLElement} The DOM element representing the card.
 */
function createCard(cardData, deckColor) {
  const deckView = document.getElementById("deck-view");
  const cardTemplate = deckView.querySelector("#deck-card-template");
  const fragment = cardTemplate.content.cloneNode(true);
  const cardEl = fragment.querySelector(".card");

  // Set question as the default text
  cardEl.querySelector(".card__title").textContent = cardData.question;
  cardEl.style.backgroundColor = deckColor;

  // Flip button logic
  const flipBtn = document.createElement("button");
  flipBtn.className = "card__btn card__btn_type_flip";
  flipBtn.type = "button";
  flipBtn.setAttribute("aria-label", "Flip card");
  flipBtn.textContent = "⟳";
  let flipped = false;
  flipBtn.onclick = () => {
    flipped = !flipped;
    if (flipped) {
      cardEl.querySelector(".card__title").textContent = cardData.answer;
      cardEl.style.backgroundColor = "#fff";
    } else {
      cardEl.querySelector(".card__title").textContent = cardData.question;
      cardEl.style.backgroundColor = deckColor;
    }
  };

  // Delete button logic
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "card__btn card__btn_type_delete";
  deleteBtn.type = "button";
  deleteBtn.setAttribute("aria-label", "Delete card");
  deleteBtn.addEventListener("click", () => {
    cardEl.remove();
  });

  // Add flip button to the left and delete button to the right in card row
  const cardRow = cardEl.querySelector(".card__row");
  cardRow.insertBefore(flipBtn, cardRow.firstChild);
  cardRow.appendChild(deleteBtn);

  return cardEl;
}
/**
 * Renders the entire deck view, including the title, all cards, and the practice button.
 *
 * @param {Object} deck - The deck object to render.
 * @param {string} deck._id - The unique identifier for the deck.
 * @param {string} deck.name - The name of the deck.
 * @param {string} deck.color - The color of the deck.
 * @param {Array<Object>} deck.cards - The array of card objects in the deck.
 * @returns {void}
 */
export function renderDeckView(deck) {
  // Select elements at the top
  const deckView = document.getElementById("deck-view");
  const title = deckView.querySelector(".gallery__title");
  const cardList = deckView.querySelector(".gallery__list");
  const cardTemplate = deckView.querySelector("#card-template");

  // 1. Set the title text
  title.textContent = deck.name;

  // 2. Prevent card duplication
  cardList.innerHTML = "";

  // 3. cardTemplate is now selected above
  // 4. Render each card in the deck
  deck.cards.forEach((card) => {
    renderCard(card, deck.color);
  });

  // Set up Practice button to go to carousel page
  const practiceBtn = deckView.querySelector(".gallery__practice-btn");
  practiceBtn.onclick = () => {
    window.location.hash = `#carousel/${deck._id}`;
  };
}
