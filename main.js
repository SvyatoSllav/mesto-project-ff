(()=>{"use strict";var e={title:".card__title",deleteButton:".card__delete-button",image:".card__image",likeButton:".card__like-button",likeCounter:".card__like-counter"},t={baseUrl:"https://nomoreparties.co/v1/cohort-mag-4",headers:{authorization:"95a63b5f-9412-4ab3-b8e4-0e2f1e7584f6","Content-Type":"application/json"}},n=function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))};function r(e,r,o,c,a){var i=r.cloneNode(!0),u=i.querySelector(o.image),l=i.querySelector(o.deleteButton),s=i.querySelector(o.likeCounter);i.querySelector(o.title).textContent=e.name,u.src=e.link,s.textContent=e.likes.length,u.addEventListener("click",(function(){return c(e.link,e.name)}));var d=i.querySelector(o.likeButton);return d.addEventListener("click",(function(){!function(e,r,o){(function(e,r){var o=r?"DELETE":"PUT";return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{method:o,headers:t.headers}).then(n)})(r,e.classList.contains("card__like-button_is-active")).then((function(t){e.classList.toggle("card__like-button_is-active"),o.textContent=t.likes.length})).catch((function(e){return console.log(e)}))}(d,e._id,s)})),e.likes.some((function(e){return e._id===a}))&&d.classList.add("card__like-button_is-active"),e.owner._id!==a?l.remove():l.addEventListener("click",(function(){l.addEventListener("click",(function(){return function(e,r){(function(e){return fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers}).then(n)})(r).then((function(){e.target.closest(".card").remove()})).catch((function(e){console.log("Ошибка при удалении карточки: ".concat(e))}))}(event,e._id)}))})),i}function o(e){e.classList.contains("popup_is-animated")&&(e.classList.remove("popup_is-animated"),requestAnimationFrame((function(){c.currentOpenedMoadl=e,a.currentOpenedMoadl=e,document.addEventListener("click",c),document.addEventListener("keydown",a)})))}function c(e){e.target.closest(".popup")||i(c.currentOpenedMoadl)}function a(e){"Escape"===e.key&&i(a.currentOpenedMoadl)}function i(e){e.classList.add("popup_is-animated"),document.removeEventListener("click",c),document.removeEventListener("keydown",a)}var u=function(e,t,n){e.textContent=t,e.classList.add(n),e.style.display="inline-block"},l=function(e,t){e.textContent="",e.classList.remove(t)},s=function(e,t){return Array.from(e.querySelectorAll(t)).some((function(e){return!e.validity.valid}))},d=function(e,t){e.classList.add(t)},p=function(e,t){e.classList.remove(t)};function f(e,t){var n=e.querySelector(t.submitButtonSelector);Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(r){var o=e.querySelector(".".concat(r.id,"Error"));l(o),s(e,t.inputSelector)?d(n,t.inactiveButtonClass):p(n,t.inactiveButtonClass)}))}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var v=null,_=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),h=document.querySelector(".profile__image"),b=document.querySelector("#card-template").content,S=document.querySelector(".places__list"),k=document.querySelector(".popup_type_image");function C(e,t){k.querySelector(".popup__image").src=e,k.querySelector(".popup__caption").textContent=t,o(k)}Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then(n),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then(n)]).then((function(t){var n,o,c=(o=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(n,o)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],i=c[1];v=a._id,_.textContent=a.name,y.textContent=a.about,h.style.backgroundImage="url(".concat(a.avatar,")"),function(e,t,n){e.map((function(e){S.appendChild(r(e,t,n,C,v))}))}(i,b,e)})).catch((function(e){return console.log(e)})),k.querySelector(".popup__close").addEventListener("click",(function(){return i(k)}));var g=document.querySelector(".popup_type_edit"),q=document.querySelector(".profile__edit-button"),E=g.querySelector(".popup__close"),L=document.forms["edit-profile"],x=L.elements.name,A=L.elements.description;x.value=_.textContent,A.value=y.textContent,L.addEventListener("submit",(function(e){var r,o;e.preventDefault(),w(!0,L),(r=x.value,o=A.value,fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:t.headers,body:JSON.stringify({name:r,about:o})}).then(n)).then((function(e){_.textContent=e.name,y.textContent=e.about,i(g)})).catch((function(e){return console.log(e)})).finally((function(){w(!1,L)}))})),q.addEventListener("click",(function(){L.reset(),x.value=_.textContent,A.value=y.textContent,f(L,D),o(g)})),E.addEventListener("click",(function(){return i(g)}));var B=document.forms["new-place"],O=document.querySelector(".popup_type_new-card"),U=document.querySelector(".profile__add-button "),T=O.querySelector(".popup__close");U.addEventListener("click",(function(){B.elements["place-name"].value="",B.elements.link.value="",f(O,D),o(O)})),T.addEventListener("click",(function(){return i(O)})),B.addEventListener("submit",(function(o){!function(o,c){var a,u;o.preventDefault(),w(!0,c),(a=c.elements["place-name"].value,u=c.elements.link.value,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:a,link:u})}).then(n)).then((function(t){var n=r(t,b,e,C,v);S.prepend(n),c.reset(),i(O)})).catch((function(e){return console.error(e)})).finally((function(){w(!1,c)}))}(o,B)}));var w=function(e,t){var n=t.querySelector(".popup__button");e?(n.setAttribute("data-button-text",n.textContent),n.textContent="Сохранение..."):(n.textContent=n.getAttribute("data-button-text"),n.removeAttribute("data-button-text"))},M=document.querySelector(".popup_type_avatar"),j=document.querySelector('.popup__form[name="edit-avatar"]'),P=j.querySelector(".popup__input_type_avatar");M.querySelector(".popup__close").addEventListener("click",(function(){return i(M)})),h.addEventListener("click",(function(){j.reset(),f(j,D),o(M)})),j.addEventListener("submit",(function(e){var r;e.preventDefault(),w(!0,j),(r=P.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:t.headers,body:JSON.stringify({avatar:r})}).then(n)).then((function(e){h.style.backgroundImage="url(".concat(e.avatar,")"),j.reset(),i(M)})).catch((function(e){return console.log(e)})).finally((function(){w(!1,j)}))}));var D={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(e){document.querySelectorAll(e.formSelector).forEach((function(t){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);s(t,e.inputSelector)&&d(r,e.inactiveButtonClass),n.forEach((function(n){n.addEventListener("input",(function(){return function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"Error"));t.setCustomValidity(""),t.validity.patternMismatch?(t.setCustomValidity(t.dataset.errorText),u(o,t.validationMessage,r.errorClass),d(n,r.inactiveButtonClass)):t.validity.valid?(l(o,r.errorClass),s(e,r.inputSelector)||p(n,r.inactiveButtonClass)):(u(o,t.validationMessage,r.errorClass),d(n,r.inactiveButtonClass))}(t,n,r,e)}))}))}))}(D)})();