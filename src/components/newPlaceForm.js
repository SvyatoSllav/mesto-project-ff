import {initialCards} from './consts.js'

function newPlaceFormSubmitHandler(event, newPlaceForm) {
    event.preventDefault();
    const newCard = {};
    newCard.name = newPlaceForm.elements['place-name'].value;
    newCard.link = newPlaceForm.elements.link.value;
    initialCards.unshift(newCard)
    newPlaceForm.reset();
}

export {newPlaceFormSubmitHandler}