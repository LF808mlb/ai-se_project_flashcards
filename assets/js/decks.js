export const fetchedDecks = [];

/**
 * Find a deck by its ID
 * @param {string} deckId - The ID of the deck to find
 * @returns {Object|undefined} - The deck object or undefined if not found
 */
export function getDeckByID(deckId) {
  return fetchedDecks.find((deck) => deck._id === deckId);
}
