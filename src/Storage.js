export class Storage {
    constructor() {
        this.data = {};
    }

    set(key, value) {
        //this.data[key] = value;
        localStorage.setItem(key, value);
    }

    get(key) {
        //return this.data[key];
        return localStorage.getItem(key);
    }
}