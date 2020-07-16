class Popup {
    constructor(element, openedClass) {
        this._popup = element;
        this._openedClass = openedClass;
    }

    open = () => {
        this._popup.classList.add(this._openedClass);
    }

    close = () => {
        this._popup.classList.remove(this._openedClass);
    }
}