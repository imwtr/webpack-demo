if (process.env.NODE_ENV === 'development') {
    require('../../../../views/detail/detail.html');
}

import 'babel-polyfill';

import {showMsg} from './components/util';

import '../../libs/bootstrap-datepicker/datepicker3.css';

import '../../libs/chosen/chosen.1.0.0.css';

import '../../libs/layer/skin/layer.css';

import '../scss/detail.scss';

console.log('Detail: ');

showMsg();

let gen = function* () {
    yield 1;
    yield 2;
    yield 3;
};

console.log([...gen()]);

console.log(Array.from([1,2,32]))
console.log(jQuery('.header__img').length)

if (module.hot) {
    module.hot.accept();
}
