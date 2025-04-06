//
// function openModal(modalNode) {
//     // Если модалка уже открыта, не добавляем на неё логику
//     if (!modalNode.classList.contains('popup_is-animated')) return;
//     modalNode.classList.remove('popup_is-animated')
//     // Так как обработчик срабатывает сразу при нажатии и анимация модалки не успевает отрисоваться
//     // и сразу же закрыавется, то вешаем обработчик после выполнения анимации браузером
//     requestAnimationFrame(() => {
//         closeModalOnOverlayClick.currentOpenedMoadl = modalNode;
//         closeModalOnEscapeKeydown.currentOpenedMoadl = modalNode;
//         document.addEventListener('click', closeModalOnOverlayClick);
//         document.addEventListener('keydown', closeModalOnEscapeKeydown);
//     })
// }
//
// function closeModalOnOverlayClick(event) {
//     if (!event.target.closest('.popup')) {
//         closeModal(closeModalOnOverlayClick.currentOpenedMoadl);
//     }
// }
//
// function closeModalOnEscapeKeydown(event) {
//     if (event.key === 'Escape') {
//         closeModal(closeModalOnEscapeKeydown.currentOpenedMoadl);
//     }
// }
//
// function closeModal(modalNode) {
//     modalNode.classList.add('popup_is-animated')
//     document.removeEventListener('click', closeModalOnOverlayClick);
//     document.removeEventListener('keydown', closeModalOnEscapeKeydown);
// }
//
// export {openModal, closeModal}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleCloseByEsc);
    popup.addEventListener('click', handleCloseByOverlay);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleCloseByEsc);
    popup.removeEventListener('click', handleCloseByOverlay);
}

function handleCloseByEsc(evt) {
    if(evt.key === 'Escape') {
        const popupIsOpen = document.querySelector('.popup_is-opened');
        closeModal(popupIsOpen);
    }
}

function handleCloseByOverlay(evt) {
    if(evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
}

export { openModal, closeModal };
