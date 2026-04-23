import { removeColorClasses, hexToString } from "./colorMap.js";
import { getCarouselTitleString } from "./gallery.js";

export function renderCarouselView(deck) {
  let currentCardIndex = 0;
  let showingQuestion = true;
  const carouselSection = document.getElementById("carousel");
  const carouselTitle = carouselSection.querySelector(".carousel__title");
  const carouselCard = carouselSection.querySelector(".carousel__card");
  const carouselCardText = carouselSection.querySelector(
    ".carousel__card-text",
  );
  const carouselFlipBtn = carouselSection.querySelector(
    ".carousel__btn_type_flip",
  );
  carouselFlipBtn.onclick = () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  };
  const leftBtn = carouselSection.querySelector(".carousel__btn_type_left");
  const rightBtn = carouselSection.querySelector(".carousel__btn_type_right");

  function updateDisplay() {
    const currentCard = deck.cards[currentCardIndex];
    if (showingQuestion) {
      carouselCardText.textContent = currentCard.question;
    } else {
      carouselCardText.textContent = currentCard.answer;
    }

    carouselTitle.textContent = getCarouselTitleString(deck, currentCardIndex);
    leftBtn.disabled = currentCardIndex === 0;
    rightBtn.disabled = currentCardIndex === deck.cards.length - 1;
    leftBtn.classList.toggle("carousel__btn_disabled", currentCardIndex === 0);
    rightBtn.classList.toggle(
      "carousel__btn_disabled",
      currentCardIndex === deck.cards.length - 1,
    );
    const colorName = hexToString(deck.color);
    removeColorClasses(carouselCard);
    carouselCard.classList.add(`carousel__card_color_${colorName}`);
    // Ensure white background only when showing answer
    if (!showingQuestion) {
      carouselCard.classList.add("carousel__card_color_white");
    } else {
      carouselCard.classList.remove("carousel__card_color_white");
    }
  }

  leftBtn.onclick = () => {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  };

  rightBtn.onclick = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      currentCardIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  };

  updateDisplay();
}
