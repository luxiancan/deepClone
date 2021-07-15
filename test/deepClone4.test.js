const { deepClone } = require('../src/deepClone_4.js');

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
};

const result = deepClone(target);

console.log(result);
console.log(result.map === target.map); // false