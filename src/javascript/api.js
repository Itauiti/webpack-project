class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }

    get() {
        return fetch(this.url, {
            headers: this.headers
        })

        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("Ошибка HTTP: " + res.status);
        });
    }

    create(newInfo, method) {
        return fetch(this.url, {
            method: method,
            headers: this.headers,
            body: JSON.stringify(newInfo)
        })

        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("Ошибка HTTP: " + res.status);
        });
    }

    setlike(id) {
        return fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: this.headers,
        })

        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("Ошибка HTTP: " + res.status);
        });
    }

    delete(id) {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })

        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject("Ошибка HTTP: " + res.status);
        });
    }
}