function getCardNode(card, cardTemplate, templateCardSelectors, openImageModalHandler) {
    const cardElement = cardTemplate.cloneNode(true);
    const imageNode = cardElement.querySelector(templateCardSelectors.image);
    cardElement.querySelector(templateCardSelectors.title).textContent = card.name;
    imageNode.src = card.link;
    imageNode.addEventListener('click', () => openImageModalHandler(
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