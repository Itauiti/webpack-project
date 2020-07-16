class Card {
    constructor(obj, popupBigPhoto, apiCards, apiLikes) {
        this._nameValue = obj.name;
        this._linkValue = obj.link;
        this._likes = obj.likes;
        this._ownerId = obj.owner._id;
        this._cardId = obj._id;
        this._apiCards = apiCards;
        this._apiLikes = apiLikes;
        this._popupBigPhoto = popupBigPhoto;
    }

    create = () => {
        const item = document.createElement('div');
        const image = document.createElement('div');
        const deleteIcon = document.createElement('button');
        const description = document.createElement('div');
        const name = document.createElement('h3');
        const likeContainer = document.createElement('div');
        const likeCounter = document.createElement('p');
        const likeIcon = document.createElement('button');

        item.classList.add('place-card');
        image.classList.add('place-card__image');
        image.style.backgroundImage = `url(${this._linkValue})`;
        deleteIcon.classList.add('place-card__delete-icon');
        description.classList.add('place-card__description');
        name.classList.add('place-card__name');
        name.textContent = this._nameValue;
        likeContainer.classList.add('place-card__like-container')
        likeCounter.classList.add('place-card__like-counter')
        likeIcon.classList.add('place-card__like-icon');
        likeCounter.textContent = this._likes.length;

        item.appendChild(image);
        image.appendChild(deleteIcon);
        item.appendChild(description);
        description.appendChild(name);
        description.appendChild(likeContainer);
        likeContainer.appendChild(likeCounter);
        likeContainer.appendChild(likeIcon);

        this._view = item;
        this._likeCounter = this._view.querySelector('.place-card__like-counter');
        this._likeIcon = this._view.querySelector('.place-card__like-icon');
        this._deleteIcon = this._view.querySelector('.place-card__delete-icon');
        this._image = this._view.querySelector('.place-card__image');

        this._makeVisibleDeleteIcon();
        this._makeMyLikeVisible();
        this._setListeners();
        return item;
    }

    _setListeners = () => {
        this._likeIcon.addEventListener('click', this._like);
        this._deleteIcon.addEventListener('click', this.remove);
        this._image.addEventListener('click', this._openImg);
    }

    _removeListeners = () => {
        this._likeIcon.removeEventListener('click', this._like);
        this._deleteIcon.removeEventListener('click', this.remove);
        this._image.removeEventListener('click', this._openImg);
    }

    _makeVisibleDeleteIcon = () => {
        if (this._ownerId === '056e654b427e282023b806ef') {
            this._deleteIcon.style.display = 'block';
        }
    }

    _makeMyLikeVisible = () => {
        const arrLikesId = this._likes.map(item => item._id);
        if (arrLikesId.includes('056e654b427e282023b806ef')) {
            this._likeIcon.classList.add('place-card__like-icon_liked');
        }
    }

    _openImg = () => {
        this._popupBigPhoto.createLink(this._linkValue);
        this._popupBigPhoto.open();
    }

    _like = () => {
        if (!this._likeIcon.classList.contains('place-card__like-icon_liked')) {
            this._apiLikes.setlike(this._cardId)
                .then((res) => {
                    this._likeCounter.textContent = res.likes.length;
                    this._likeIcon.classList.add('place-card__like-icon_liked');
                })
                .catch(err => console.log(err));
        } else {
            this._apiLikes.delete(this._cardId)
                .then((res) => {
                    this._likeCounter.textContent = res.likes.length;
                    this._likeIcon.classList.remove('place-card__like-icon_liked');
                })
                .catch(err => console.log(err));
        }
    }

    remove = () => {
        event.stopPropagation();
        if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
            this._apiCards.delete(this._cardId)
                .then(() => {
                    this._removeListeners();
                    this._view.remove();
                })
                .catch(err => console.log(err));
        }
    }
}