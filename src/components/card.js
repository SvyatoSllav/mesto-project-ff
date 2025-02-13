function getCardNode(card, cardTemplate, cardList, templateCardSelectors, imageModal, openModalHandler, closeModalHandler) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector(templateCardSelectors.title).textContent = card.name;
    cardElement.querySelector(templateCardSelectors.image).src = card.link;
    setCardNodeEventListeners(cardElement, card, cardList, templateCardSelectors, imageModal, openModalHandler, closeModalHandler);
    return cardElement;
}

function setCardNodeEventListeners(cardElement, card, cardList, templateCardSelectors, imageModal, openModalHandler, closeModalHandler) {
    cardElement.querySelector(templateCardSelectors.deleteButton).addEventListener('click', event => removeCard(event, cardList));
    cardElement.querySelector(templateCardSelectors.likeButton).addEventListener('click', event => likeCard(event));
    imageModal.querySelector('.popup__close').addEventListener('click', () => closeModalHandler(imageModal));
    cardElement.querySelector(templateCardSelectors.image).addEventListener('click', () => openImageModal(card.link, card.name, imageModal, openModalHandler));
}

function openImageModal(cardLink, cardName, imageModal, openModalHandler) {
    imageModal.querySelector('.popup__image').src = cardLink;
    imageModal.querySelector('.popup__caption').textContent = cardName;
    openModalHandler(imageModal);
}

function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

function removeCard(event, cardList) {
    cardList.removeChild(event.target.closest('.card'));
}
export {getCardNode}