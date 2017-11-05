// 开发环境时，引入页面文件，方便改变页面文件后及时模块热更新
if (process.env.NODE_ENV === 'development') {
    require('../../../../views/home/home.html');
}


// 异步模块加载例子
// require('./components/async2').log();

$('.bg-input').click(() => {
    console.log('clicked, loading async.js')

    // require(['./components/async1']);

    require.ensure([], require => {
        require('./components/async').log();
        // require('./components/async2').log();
        // require('./components/async1').log();
        console.log('loading async.js done');
    }, 'async_chunk');
});


// 设置允许模块热替换
if (module.hot) {
    module.hot.accept();

    // 页面文件更新 自动刷新页面
    module.hot.accept('../../../../views/home/home.html', () => {
        location.reload();
    });
}

import {showMsg} from './components/util';


// React使用例子
let React = require('react');
let ReactDOM = require('react-dom')

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name || 'myName'
        };
    }

    showYear(e) {
        console.log(this);

        let elem = ReactDOM.findDOMNode(e.target);
        console.log('year ' + elem.getAttribute('data-year'));
    }

    render() {
        return <p onClick={this.showYear} data-year={this.props.year}>{this.state.name}</p>
    }
}

Info.defaultProps = {
    year: new Date().getFullYear()
};

ReactDOM.render(<Info />, document.querySelector('#box'));




// import '../../libs/magicsearch/jquery.magicsearch2.css';
// import '../../libs/magicsearch/jquery.magicsearch2.js';

import '../../libs/bootstrap-datepicker/datepicker3.css';
import '../../libs/bootstrap-datepicker/bootstrap-datepicker.js';
import '../../libs/bootstrap-datepicker/bootstrap-datepicker.zh-CN.js';

import '../../libs/chosen/chosen.1.0.0.css';
import '../../libs/chosen/chosen.jquery.1.0.0.js';

import '../../libs/layer/skin/layer.css';
import '../../libs/layer/layer.js';

import '../../libs/handlebars/handlebars-v4.0.5.js';

import '../../libs/font-awesome/css/font-awesome.min.css';

// import '../scss/detail.scss';
import '../scss/home.scss';

console.log('Home: ');
showMsg();

let arr = [11111, 2, 4, 5, 4, 1];

let sum = Math.max(...arr);

console.log('Max is ', sum);

console.log('.header__img length', jQuery('.header__img').length);

$('.magicsearch-input').magicsearch({
    dataSource: [{
        id: 10,
        name: 'Jack',
        age: '12'
    }, {
        id: 12,
        name: 'Peter',
        age: '24'
    }],
    fields: ['name', 'age'],
    format: '%name% %age%',
    id: 'id'
});

$('.date-input').datepicker();



setTimeout(() => {
    layer.msg('Hello');
}, 2000);
