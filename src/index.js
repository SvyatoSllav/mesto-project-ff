import './pages/index.css';
import {initialCards, templateCardSelectors} from './components/consts.js'
import {getCardNode} from './components/card.js'
import {openModal, closeModal} from './components/modal.js'

// Логика карточек
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const imageModal = document.querySelector('.popup_type_image');
imageModal.querySelector('.popup__close').addEventListener('click', () => closeModal(imageModal));

function addCardsToPage(cardsData, cardTemplate, templateCardSelectors, imageModal, openModalHandler, closeModalHandler) {
    cardsData.map((card) => {
        cardList.appendChild(
            getCardNode(
                card,
                cardTemplate,
                templateCardSelectors,
                openImageModal,
            )
        )
    })
}

function openImageModal(cardLink, cardName) {
    imageModal.querySelector('.popup__image').src = cardLink;
    imageModal.querySelector('.popup__caption').textContent = cardName;
    openModal(imageModal);
}

addCardsToPage(initialCards, cardTemplate, templateCardSelectors);


// Логика модалки редактирования профиля
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const closeEditProfileButton = editProfileModal.querySelector('.popup__close');

// Находим форму в DOM
const formElement = document.forms['edit-profile']
// Находим поля формы в DOM
const nameInput = formElement.elements.name
const jobInput = formElement.elements.description
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

function handleProfileFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editProfileModal)
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleProfileFormSubmit);
editProfileButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(editProfileModal)
});
closeEditProfileButton.addEventListener('click', () => closeModal(editProfileModal));


// Логика сохранения нового места
const newPlaceForm = document.forms['new-place']

// Логика модалки добавления места
const newPlaceModal = document.querySelector('.popup_type_new-card');
const newPlaceModalButton = document.querySelector('.profile__add-button ');
const closeNewPlaceModalButton = newPlaceModal.querySelector('.popup__close');
newPlaceModalButton.addEventListener('click', () => openModal(newPlaceModal));
closeNewPlaceModalButton.addEventListener('click', () => closeModal(newPlaceModal));

function newPlaceFormSubmitHandler(event, newPlaceForm) {
    event.preventDefault();
    const newCard = {};
    newCard.name = newPlaceForm.elements['place-name'].value;
    newCard.link = newPlaceForm.elements.link.value;
    const cardNode = getCardNode(newCard, cardTemplate, templateCardSelectors, openImageModal);
    cardList.prepend(cardNode);
    closeModal(newPlaceModal)
    newPlaceForm.reset();
}

newPlaceForm.addEventListener('submit', (event) => {
    newPlaceFormSubmitHandler(event, newPlaceForm)
})
