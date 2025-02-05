const cardTemplate = document.querySelector('#card-template').content;

const cardList = document.querySelector('.places__list');

function getCardNode(card) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', event => removeCard(event));
    cardElement.querySelector('.card__image').src = card.link;
    return cardElement;
}

function removeCard(event) {
    cardList.removeChild(event.target.closest('.card'));
}

initialCards.map(card => cardList.appendChild(getCardNode(card)))