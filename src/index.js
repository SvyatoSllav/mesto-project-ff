import './pages/index.css';
import {initialCards, templateCardSelectors} from './components/consts.js'
import {addCardsToPage} from './components/card.js'
import {openModal, closeModal} from './components/modal.js'
import {newPlaceFormSubmitHandler} from './components/newPlaceForm.js'
import './components/editProfileForm'

// Логика карточек
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
addCardsToPage(initialCards, cardTemplate, cardList, templateCardSelectors);

// Логика модалки редактирования профиля
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const closeEditProfileButton = editProfileModal.querySelector('.popup__close');
editProfileButton.addEventListener('click', () => openModal(editProfileModal));
closeEditProfileButton.addEventListener('click', () => closeModal(editProfileModal));

// Логика модалки добавления места
const newPlaceModal = document.querySelector('.popup_type_new-card');
const newPlaceModalButton = document.querySelector('.profile__add-button ');
const closeNewPlaceModalButton = newPlaceModal.querySelector('.popup__close');
newPlaceModalButton.addEventListener('click', () => openModal(newPlaceModal));
closeNewPlaceModalButton.addEventListener('click', () => closeModal(newPlaceModal));

// Логика сохранения нового места
const newPlaceForm = document.forms['new-place']
newPlaceForm.addEventListener('submit', (event) => {
    newPlaceFormSubmitHandler(event, newPlaceForm)
    addCardsToPage(initialCards, cardTemplate, cardList, templateCardSelectors);
})