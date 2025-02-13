
function openModal(modalNode) {
    // Если модалка уже открыта, не добавляем на неё логику
    if (!modalNode.classList.contains('popup_is-animated')) return;
    modalNode.classList.remove('popup_is-animated')
    // Так как обработчик срабатывает сразу при нажатии и анимация модалки не успевает отрисоваться
    // и сразу же закрыавется, то вешаем обработчик после выполнения анимации браузером
    requestAnimationFrame(() => {
        closeModalOnOverlayClick.currentOpenedMoadl = modalNode;
        closeModalOnEscapeKeydown.currentOpenedMoadl = modalNode;
        document.addEventListener('click', closeModalOnOverlayClick);
        document.addEventListener('keydown', closeModalOnEscapeKeydown);
    })
}

function closeModalOnOverlayClick(event) {
    if (!event.target.closest('.popup')) {
        closeModal(closeModalOnOverlayClick.currentOpenedMoadl);
    }
}

function closeModalOnEscapeKeydown(event) {
    if (event.key === 'Escape') {
        closeModal(closeModalOnEscapeKeydown.currentOpenedMoadl);
    }
}

function closeModal(modalNode) {
    modalNode.classList.add('popup_is-animated')
    document.removeEventListener('click', closeModalOnOverlayClick);
    document.removeEventListener('keydown', closeModalOnEscapeKeydown);
}

export {openModal, closeModal}