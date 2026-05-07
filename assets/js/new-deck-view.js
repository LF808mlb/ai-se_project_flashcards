/**
 * Displays an error message in the error modal.
 *
 * @param {string} message - The error message to display
 * @returns {void}
 */
function showError(message) {
  errorMessageEl.textContent = message;
  errorModal.classList.add("modal_visible");
}
import { gallery } from "./gallery.js";

const form = document.querySelector("#new-deck-view-form");
const submitBtn = document.querySelector(".new-deck-view__submit-btn");
const textarea = document.querySelector(".new-deck-view__json-textarea");

const errorModal = document.querySelector("#error-modal");
const errorModalCloseBtn = errorModal.querySelector('[aria-label="Close"]');
const errorMessageEl = errorModal.querySelector(".modal__error");

if (errorModalCloseBtn) {
  errorModalCloseBtn.addEventListener("click", () => {
    errorModal.classList.remove("modal_visible");
    errorMessageEl.textContent = "";
  });
}
/**
 * Safely parses a JSON string and returns the resulting object, or null if parsing fails.
 *
 * @param {string} jsonString - The JSON string to parse
 * @returns {object|null} The parsed object if valid, otherwise null
 */
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

/**
 * Validates a deck name string for type and length constraints.
 *
 * @param {string} name - The deck name to validate
 * @returns {string|null} The valid name string, or null if invalid
 */
function validateName(name) {
  if (typeof name != "string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());
  const jsonData = parseJSON(textarea.value);
  if (!jsonData) {
    showError("Invalid JSON. Please check your input.");
    return;
  }
  const validName = validateName(jsonData.name);
  if (!validName) {
    showError("Deck name must be a string between 2 and 80 characters.");
    return;
  }
  if (!Array.isArray(jsonData.cards)) {
    showError("Cards must be an array.");
    return;
  }
  if (jsonData.color) {
    jsonData.color = normalizeColor(jsonData.color);
  }
  const uniqueId = `${slugify(jsonData.name)}-${Date.now()}`;

  const deck = {
    _id: uniqueId,
    color: normalizeColor(values.color),
    cards: jsonData.cards,
    name: jsonData.name,
  };
  gallery.push(deck);
  window.location.hash = `deck/${uniqueId}`;
});

export { disableSubmitBtn, showError };
/**
 * Enables the submit button for the new deck form.
 *
 * @returns {void}
 */
function disableSubmitBtn() {
  submitBtn.disabled = false;
}
const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

/**
 * Converts a string to a URL-safe slug: lowercase with any run of
 * non-alphanumeric characters replaced by a single hyphen, and no leading or
 * trailing hyphens.
 *
 * @param {string} str
 * @returns {string}
 */
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Returns a consistent lowercase hex color string with a leading "#".
 * Accepts values with or without a leading "#". Returns "#64d583" as a
 * fallback if the value is missing or not a valid 6-digit hex.
 *
 * @param {string|undefined} color
 * @returns {string}
 */
function normalizeColor(color) {
  if (!color) return "#64d583";
  const hex = color.startsWith("#") ? color.slice(1) : color;
  if (!HEX_DIGITS.test(hex)) return "#64d583";
  return "#" + hex.toLowerCase();
}
