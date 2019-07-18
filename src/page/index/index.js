// import './index.css'
import './index.styl';
import Header from 'common/tpl/header';
import Test from './tpl/test';

// console.log(Header);
const header = new Header({ title: '你好' });
console.log(header.create());

const test = new Test({ name: '皮卡丘' });
console.log(test.create());

class Person {
    constructor(name) {
        this.name = name;
    }
}
class A extends Person {
    constructor(id, name) {
        super(name);
        this.id = id;
    }
}
const a = new A(1, 'ff');
let b = new A(2, '22');
console.log(a);

const demo1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() * 100 > 50) {
            resolve(true);
        } else {
            resolve(false);
        }
    }, 3000);
});

async function demo2() {
    const hh = await demo1;
    console.log(hh);
}
demo2();
