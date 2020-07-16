class CardList {
    constructor(container) {
        this._container = container;
    }

    addCard = (newCard) => {
        this._container.appendChild(newCard);
    }

    render = (cardsArr) => {
        cardsArr.forEach((item) => {
            this.addCard(item);
        });
    }
}