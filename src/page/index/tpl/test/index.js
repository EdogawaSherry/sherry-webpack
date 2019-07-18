import tpl from './index.tpl';

export default class Template {
    constructor (data) {
        this.data = data;
    }

    create() {
        return tpl(this.data);
    }
}