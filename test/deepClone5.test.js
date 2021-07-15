const { deepClone } = require('../src/deepClone_5.js');

const map = new Map();
map.set('key', 'value');
map.set('name', 'lxcan');

const set = new Set();
set.add('javascript');
set.add('vue.js');

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        console.log('ddd');
    },
    func2: function (a, b) {
        return a + b;
    }
};
target.obj = target;
const cloneData = deepClone(target);
target.field3.child = 'xxx';
target.func1 = () => {
    console.log('ddd123');
};
target.func2 = function (a, b, c) {
    return a + b + c;
}
console.log('cloneData', cloneData);
console.log('target', target);