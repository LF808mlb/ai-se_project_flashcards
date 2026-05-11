/**
 * Remove a deck from fetchedDecks by _id (in place)
 * @param {string} _id - The unique identifier for the deck
 * @returns {boolean} True if a deck was removed, false otherwise
 */
export function removeDeckByID(_id) {
  const index = fetchedDecks.findIndex((deck) => deck._id === _id);
  if (index !== -1) {
    fetchedDecks.splice(index, 1);
    return true;
  }
  return false;
}
/**
 * Helper to remove a deck from DOM and fetchedDecks by _id
 * @param {string} _id - The unique identifier for the deck
 * @returns {Promise<void>} Resolves when removed
 */
export function deleteDeckHelper(_id) {
  return new Promise((resolve) => {
    // Find the deck element in the DOM
    const deckEl = document.querySelector(`.card__link[href="#deck/${_id}"]`);
    if (deckEl && deckEl.closest(".card")) {
      deckEl.closest(".card").remove();
    }
    // Remove from fetchedDecks
    const idx = fetchedDecks.findIndex((deck) => deck._id === _id);
    if (idx !== -1) {
      fetchedDecks.splice(idx, 1);
    }
    resolve();
  });
}
export const fetchedDecks = [];

/**
 * Find a deck by its ID
 * @param {string} deckId - The ID of the deck to find
 * @returns {Object|undefined} - The deck object or undefined if not found
 */
export function getDeckByID(deckId) {
  return fetchedDecks.find((deck) => deck._id === deckId);
}
