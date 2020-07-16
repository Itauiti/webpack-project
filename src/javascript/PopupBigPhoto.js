class PopupBigPhoto extends Popup {
    constructor(element, openedClass, imgPlace) {
        super(element, openedClass);
        this._imgPlace = imgPlace;
    }

    createLink = (link) => {
        this._imgPlace.src = link;
    }
}