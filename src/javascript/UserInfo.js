class UserInfo {
    constructor(nameValue, jobValue, api) {
        this._currentName = nameValue;
        this._currentJob = jobValue;
        this._api = api;
        this._job = '';
        this._name = '';
    }

    setInfo = (obj) => {
        this._name = obj.name;
        this._job = obj.about;
    }

    setAvatar = (obj, place) => {
        this._avatar = obj.avatar;
        place.style.backgroundImage = `url(${this._avatar})`;
    }

    get = () => {
        return {
            name: this._name,
            job: this._job,
        };
    }

    update = () => {
        this._currentName.textContent = this._name;
        this._currentJob.textContent = this._job;
    }
}