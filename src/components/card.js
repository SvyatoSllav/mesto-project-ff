import {openModal, closeModal} from './modal.js'

const imageModal = document.querySelector('.popup_type_image');

function getCardNode(card, cardTemplate, cardList, templateCardSelectors) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector(templateCardSelectors.title).textContent = card.name;
    cardElement.querySelector(templateCardSelectors.image).src = card.link;
    setCardNodeEventListeners(cardElement, card, cardList, templateCardSelectors);
    return cardElement;
}

function setCardNodeEventListeners(cardElement, card, cardList, templateCardSelectors) {
    cardElement.querySelector(templateCardSelectors.deleteButton).addEventListener('click', event => removeCard(event, cardList));
    cardElement.querySelector(templateCardSelectors.likeButton).addEventListener('click', event => likeCard(event));
    cardElement.querySelector(templateCardSelectors.image).addEventListener('click', () => openImageModal(card.link, card.name));
}

function openImageModal(cardLink, cardName) {
    imageModal.querySelector('.popup__image').src = cardLink;
    imageModal.querySelector('.popup__caption').textContent = cardName;
    imageModal.querySelector('.popup__close').addEventListener('click', () => closeModal(imageModal));
    openModal(imageModal);
}

function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

function removeCard(event, cardList) {
    cardList.removeChild(event.target.closest('.card'));
}

function resetCardList(cardList){
    cardList.innerHTML = '';
}

function addCardsToPage(cardsData, cardTemplate, cardList, templateCardSelectors) {
    resetCardList(cardList);
    cardsData.map((card) => {
        cardList.appendChild(
            getCardNode(
                card,
                cardTemplate,
                cardList,
                templateCardSelectors
            )
        )
    })

}
export {addCardsToPage}