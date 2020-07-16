(function() {
    const root = document.querySelector('.root');
    const placesList = root.querySelector('.places-list');
    const userNewCardButton = root.querySelector('.user-info__button');
    const userInfoEditButton = root.querySelector('.user-info__edit-button');
    const userAvatarEditButton = root.querySelector('.user-info__photo');
    const popupNew = root.querySelector('.popup__new');
    const popupEdit = root.querySelector('.popup__edit');
    const popupImg = root.querySelector('.popup__img');
    const popupAvatar = root.querySelector('.popup__edit-avatar');
    const nameValue = root.querySelector('.user-info__name');
    const jobValue = root.querySelector('.user-info__job');

    const img = root.querySelector('#img');
    const closeButton = root.querySelectorAll('.close');

    const openedClassPopup = 'popup_is-opened';

    const formNew = document.forms.new;
    const formEdit = document.forms.edit;
    const formAvatar = document.forms.avatar;

    const errorMessages = {
        empty: 'Это обязательное поле',
        wrongLength: 'Должно быть от 2 до 30 символов',
        wrongUrl: 'Здесь должна быть ссылка',
    };

    const headersForPraktikum = {
        authorization: '82711996-974e-4eaf-bd2a-12e5652f58e4',
        'Content-Type': 'application/json'
    }

    const cardApiData = {
        url: 'https://praktikum.tk/cohort11/cards',
        headers: headersForPraktikum,
    };

    const userInfoApiData = {
        url: 'https://praktikum.tk/cohort11/users/me',
        headers: headersForPraktikum,
    };

    const cardLikeApi = {
        url: 'https://praktikum.tk/cohort11/cards/like',
        headers: headersForPraktikum,
    };

    const avatarApiData = {
        url: 'https://praktikum.tk/cohort11/users/me/avatar',
        headers: headersForPraktikum,
    };

    const cardLike = new Api(cardLikeApi);
    const avatarApi = new Api(avatarApiData);
    const userInfoApi = new Api(userInfoApiData);
    const cardApi = new Api(cardApiData);

    const userInfo = new UserInfo(nameValue, jobValue, userInfoApi);
    const cardList = new CardList(placesList);

    const popupNewCard = new Popup(popupNew, openedClassPopup);
    const popupEditCard = new Popup(popupEdit, openedClassPopup);
    const popupAvatarEdit = new Popup(popupAvatar, openedClassPopup);
    const popupBigPhotos = new PopupBigPhoto(popupImg, openedClassPopup, img);

    const formValidatorNew = new FormValidator(formNew, errorMessages);
    const formValidatorEdit = new FormValidator(formEdit, errorMessages);
    const formValidatorAvatar = new FormValidator(formAvatar, errorMessages);

    userInfoApi.get().then(res => {
        userInfo.setInfo(res);
        userInfo.setAvatar(res, userAvatarEditButton);
        userInfo.update();
    });

    cardApi.get().then(res => {
            res.map(item => {
                const card = new Card(item, popupBigPhotos, cardApi, cardLike);
                const x = [];
                x.push(card.create());
                cardList.render(x);
            })
        })
        .catch(err => console.log(err))

    closeButton.forEach(item => item.addEventListener("click", () => {
        popupNewCard.close();
        popupEditCard.close();
        popupBigPhotos.close();
        popupAvatarEdit.close();
    }));


    function renderLoadingText(button, isLoading) {
        if (isLoading) {
            button.textContent = 'Загрузка...';
        } else {
            button.textContent = 'Сохранить';
        }
    }

    userNewCardButton.addEventListener('click', () => {
        formNew.reset();
        formValidatorNew.initialization();
        formValidatorNew.deleteErrorMessege();
        popupNewCard.open();
    });

    userInfoEditButton.addEventListener('click', () => {
        formValidatorEdit.initialization();
        formValidatorEdit.deleteErrorMessege();
        const { name, job } = userInfo.get();
        formEdit.elements.user.value = name;
        formEdit.elements.about.value = job;
        popupEditCard.open();
    });

    userAvatarEditButton.addEventListener('click', () => {
        formAvatar.reset();
        formValidatorAvatar.initialization();
        formValidatorAvatar.deleteErrorMessege();
        popupAvatarEdit.open();
    });

    formNew.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = {
            name: formNew.elements.name.value,
            link: formNew.elements.link.value,
        };

        cardApi.create(data, 'POST')
            .then((obj) => {
                const card = new Card(obj, popupBigPhotos, cardApi, cardLike);
                cardList.addCard(card.create());
                formNew.reset();
                popupNewCard.close();
            })
            .catch(err => console.log(err));
    });

    formEdit.addEventListener('submit', (event) => {
        event.preventDefault();
        renderLoadingText(formEdit.elements.button, true);
        const data = {
            name: formEdit.elements.user.value,
            about: formEdit.elements.about.value,
        };

        userInfoApi.create(data, 'PATCH')
            .then((obj) => {
                userInfo.setInfo(obj);
                userInfo.update();
                popupEditCard.close();
            })
            .catch(err => console.log(err))
            .finally(() => {
                renderLoadingText(formEdit.elements.button, false);
            });
    });

    formAvatar.addEventListener('submit', (event) => {
        event.preventDefault();
        renderLoadingText(formAvatar.elements.button, true);
        const data = {
            avatar: formAvatar.elements.avatar.value
        };

        avatarApi.create(data, 'PATCH')
            .then((obj) => {
                userInfo.setAvatar(obj, userAvatarEditButton);
                formAvatar.reset();
                popupAvatarEdit.close();
            })
            .catch(err => console.log(err))
            .finally(() => {
                renderLoadingText(formAvatar.elements.button, false);
            })
    });
})();