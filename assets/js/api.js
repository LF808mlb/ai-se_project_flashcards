const headers = {
  "Content-Type": "application/json",
  Authorization: "019e0362-dab2-7473-982d-ee3e997a6573",
};
const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";

/**
 * Processes a fetch API Response object, returning parsed JSON if successful,
 * or a rejected Promise with an error message if not.
 *
 * @param {Response} res - The fetch API Response object to process.
 * @returns {Promise<any>} A promise that resolves to the parsed JSON data if the response is OK, or rejects with an error message.
 */
function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

/**
 * Fetches all decks from the API.
 *
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of deck objects.
 */
function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers }).then(processResponse);
}

/**
 * Deletes a deck by its ID from the API.
 *
 * @param {string} deckId - The unique identifier of the deck to delete.
 * @returns {Promise<any>} A promise that resolves to the API response data if successful, or rejects with an error message.
 */
function deleteDeck(deckId) {
  return fetch(`${baseUrl}/decks/${deckId}`, {
    method: "DELETE",
    headers,
  }).then(processResponse);
}

/**
 * Adds a new deck to the API.
 *
 * @param {Object} deck - The deck data to add.
 * @param {string} deck.name - The name of the deck.
 * @param {string} deck.color - The color of the deck.
 * @param {Array<Object>} deck.cards - The array of card objects for the deck.
 * @returns {Promise<Object>} A promise that resolves to the created deck object returned by the API.
 */
function addDeck({ name, color, cards }) {
  return fetch(`${baseUrl}/decks`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, color, cards }),
  }).then(processResponse);
}

export { getDecks, deleteDeck, addDeck };
