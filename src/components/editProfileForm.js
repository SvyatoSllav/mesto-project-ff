// Находим форму в DOM
const formElement = document.forms['edit-profile']
// Находим поля формы в DOM
const nameInput = formElement.elements.name
const jobInput = formElement.elements.description
const profileName = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);