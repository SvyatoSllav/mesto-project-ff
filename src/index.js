import './pages/index.css';
import {templateCardSelectors} from './components/consts.js'
import {getCardNode} from './components/card.js'
import {openModal, closeModal} from './components/modal.js'
import {enableValidation, clearValidation} from "./components/validation";
import {getUserDataApi, getInitialCardsApi, editUserDataApi, addNewCardApi, updateAvatarApi} from './components/api.js'

// Логика получения пользователя и отображения изначальных карточек
let currentUserId = null
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileAvatar = document.querySelector('.profile__image')
const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');
const imageModal = document.querySelector('.popup_type_image');
Promise.all([getUserDataApi(), getInitialCardsApi()])
    .then(([userData, initialCards]) => {
        currentUserId = userData._id
        profileName.textContent = userData.name
        profileDescription.textContent = userData.about
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`

        addCardsToPage(initialCards, cardTemplate, templateCardSelectors)
    })
    .catch(error => console.log(error))


imageModal.querySelector('.popup__close').addEventListener('click', () => closeModal(imageModal));

function addCardsToPage(cardsData, cardTemplate, templateCardSelectors) {
    cardsData.map((card) => {
        cardList.appendChild(
            getCardNode(
                card,
                cardTemplate,
                templateCardSelectors,
                openImageModal,
                currentUserId,
            )
        )
    })
}

function openImageModal(cardLink, cardName) {
    imageModal.querySelector('.popup__image').src = cardLink;
    imageModal.querySelector('.popup__caption').textContent = cardName;
    openModal(imageModal);
}


// Логика модалки редактирования профиля
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const closeEditProfileButton = editProfileModal.querySelector('.popup__close');

// Находим форму в DOM
const editProfileFormNode = document.forms['edit-profile']
// Находим поля формы в DOM
const nameInput = editProfileFormNode.elements.name
const descriptionInput = editProfileFormNode.elements.description
nameInput.value = profileName.textContent;
descriptionInput.value = profileDescription.textContent;

function handleProfileFormSubmit(event) {
    event.preventDefault();
    renderLoading(true, editProfileFormNode)

    editUserDataApi(nameInput.value, descriptionInput.value)
        .then(userData => {
            profileName.textContent = userData.name;
            profileDescription.textContent = userData.about;
            closeModal(editProfileModal)
        })
        .catch(err => console.log(err))
        .finally(() => {
            renderLoading(false, editProfileFormNode)
        })
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editProfileFormNode.addEventListener('submit', handleProfileFormSubmit);
editProfileButton.addEventListener('click', () => {
    editProfileFormNode.reset();
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    clearValidation(editProfileFormNode, validationConfig)
    openModal(editProfileModal)
});
closeEditProfileButton.addEventListener('click', () => closeModal(editProfileModal));


// Логика сохранения нового места
const newPlaceForm = document.forms['new-place']

// Логика модалки добавления места
const newPlaceModal = document.querySelector('.popup_type_new-card');
const newPlaceModalButton = document.querySelector('.profile__add-button ');
const closeNewPlaceModalButton = newPlaceModal.querySelector('.popup__close');
newPlaceModalButton.addEventListener('click', () => {
    newPlaceForm.elements['place-name'].value = '';
    newPlaceForm.elements.link.value = '';
    clearValidation(newPlaceModal, validationConfig)
    openModal(newPlaceModal)
});
closeNewPlaceModalButton.addEventListener('click', () => closeModal(newPlaceModal));

function newPlaceFormSubmitHandler(event, newPlaceForm) {
    event.preventDefault();
    renderLoading(true, newPlaceForm)

    const cardName = newPlaceForm.elements['place-name'].value;
    const imageUrl = newPlaceForm.elements.link.value;

    addNewCardApi(cardName, imageUrl)
        .then(card => {
            const cardNode = getCardNode(card, cardTemplate, templateCardSelectors, openImageModal, currentUserId);
            cardList.prepend(cardNode);
            newPlaceForm.reset();
            closeModal(newPlaceModal)
        })
        .catch(err => console.error(err))
        .finally(() => {
            renderLoading(false, newPlaceForm)
        })
}

newPlaceForm.addEventListener('submit', (event) => {
    newPlaceFormSubmitHandler(event, newPlaceForm)
})

const renderLoading = (isLoading, formElement) => {
    const buttonElement = formElement.querySelector('.popup__button')
    if (isLoading) {
        buttonElement.setAttribute('data-button-text', buttonElement.textContent)
        buttonElement.textContent = 'Сохранение...'
    } else {
        buttonElement.textContent = buttonElement.getAttribute('data-button-text')
        buttonElement.removeAttribute('data-button-text')
    }
}


// Обновление аватарки
const editAvatarModal = document.querySelector('.popup_type_avatar')
const editAvatarForm = document.querySelector('.popup__form[name="edit-avatar"]')
const avatarUrlInput = editAvatarForm.querySelector('.popup__input_type_avatar')
const avatarModalCloseButton = editAvatarModal.querySelector('.popup__close');
avatarModalCloseButton.addEventListener('click', () => closeModal(editAvatarModal));
profileAvatar.addEventListener('click', () => {
    editAvatarForm.reset()
    clearValidation(editAvatarForm, validationConfig)
    openModal(editAvatarModal)
})

function handleEditAvatarSubmit(evt) {
    evt.preventDefault()
    renderLoading(true, editAvatarForm)
    const avatarUrl = avatarUrlInput.value
    updateAvatarApi(avatarUrl)
        .then(avatar => {
            profileAvatar.style.backgroundImage = `url(${avatar.avatar})`
            editAvatarForm.reset()
            closeModal(editAvatarModal)
        })
        .catch(err => console.log(err))
        .finally(() => {
            renderLoading(false, editAvatarForm)
        })
}

editAvatarForm.addEventListener('submit', handleEditAvatarSubmit)


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

enableValidation(validationConfig);