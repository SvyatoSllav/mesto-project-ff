import {deleteCardApi, setLikeApi} from "./api";

function getCardNode(card, cardTemplate, templateCardSelectors, openImageModalHandler, userId) {
    const cardElement = cardTemplate.cloneNode(true);
    const imageNode = cardElement.querySelector(templateCardSelectors.image);
    const deleteButton = cardElement.querySelector(templateCardSelectors.deleteButton);
    const likesCounterNode = cardElement.querySelector(templateCardSelectors.likeCounter);
    cardElement.querySelector(templateCardSelectors.title).textContent = card.name;
    imageNode.src = card.link;
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
        deleteButton.addEventListener('click', () => {
            deleteButton.addEventListener('click', () => removeCard(event, card._id));
        })
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

function removeCard(event, cardId) {
    deleteCardApi(cardId)
        .then(() => {
            event.target.closest('.card').remove();
        })
        .catch(err => {
            console.log(`Ошибка при удалении карточки: ${err}`)
        })
}
export {getCardNode}