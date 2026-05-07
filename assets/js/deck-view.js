// Renders a card in the deck view
function renderCard(cardData, deckColor) {
  const deckView = document.getElementById("deck-view");
  const cardList = deckView.querySelector(".gallery__list");
  const cardEl = createCard(cardData, deckColor);
  cardList.appendChild(cardEl);
}
// Creates a card element for the deck view
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
