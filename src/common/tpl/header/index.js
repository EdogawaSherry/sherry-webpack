import tpl from './index.tpl';
import './index.styl';

export default class Header {
    constructor (data) {
        this.data = data;
    }

    create() {
        return tpl(this.data);
    }
}