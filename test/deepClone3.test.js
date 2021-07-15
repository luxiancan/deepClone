const { deepClone1, deepClone2 } = require('../src/deepClone_3.js');


const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
};

target.target = target;

console.time();
const result = deepClone1(target);
console.timeEnd();

console.time();
const result2 = deepClone2(target);
console.timeEnd();