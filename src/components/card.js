import {deleteCardApi, setLikeApi} from "./api";

function getCardNode(card, cardTemplate, templateCardSelectors, openImageModalHandler, userId) {
    const cardElement= cardTemplate.querySelector(".card").cloneNode(true);
    const imageNode = cardElement.querySelector(templateCardSelectors.image);
    const deleteButton = cardElement.querySelector(templateCardSelectors.deleteButton);
    const likesCounterNode = cardElement.querySelector(templateCardSelectors.likeCounter);
    cardElement.querySelector(templateCardSelectors.title).textContent = card.name;
    imageNode.src = card.link;
    imageNode.alt = card.name;
    likesCounterNode.textContent = card.likes.length;
    imageNode.addEventListener('click', () => openImageModalHandler(
        card.link,
        card.name
    ));

    const likeButton = cardElement.querySelector(templateCardSelectors.likeButton)
    likeButton.addEventListener('click', () => {
        setLikeToCard(likeButton, card._id, likesCounterNode)
    })

    const userHasLiked = card.likes.some(like => like._id === userId)
    if (userHasLiked) {
        likeButton.classList.add('card__like-button_is-active')
    }

    if (card.owner._id !== userId) {
        deleteButton.remove()
    } else {
        deleteButton.addEventListener('click', () => {removeCard(card)})
    }
    return cardElement;
}

export function setLikeToCard(likeButton, cardId, likesCountNode) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active')

    setLikeApi(cardId, isLiked)
        .then(updatedCard => {
            likeButton.classList.toggle('card__like-button_is-active')
            likesCountNode.textContent = updatedCard.likes.length
        })
        .catch(err => console.log(err))
}

function removeCard(card) {
    deleteCardApi(card._id)
        .then(() => {
            card.remove();
        })
        .catch(err => {
            console.log(`Ошибка при удалении карточки: ${err}`)
        })
}
export {getCardNode}