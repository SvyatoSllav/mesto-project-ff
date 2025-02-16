function getCardNode(card, cardTemplate, cardList, templateCardSelectors, openImageModalHandler) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector(templateCardSelectors.title).textContent = card.name;
    cardElement.querySelector(templateCardSelectors.image).src = card.link;
    cardElement.querySelector(templateCardSelectors.image).addEventListener('click', () => openImageModalHandler(
        card.link,
        card.name
    ));
    cardElement.querySelector(templateCardSelectors.deleteButton).addEventListener('click', removeCard);
    cardElement.querySelector(templateCardSelectors.likeButton).addEventListener('click', event => likeCard(event));
    return cardElement;
}

function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

function removeCard(event) {
    event.target.closest('.card').remove();
}
export {getCardNode}