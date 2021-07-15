const deepClone = require('../src/deepClone_2.js');

const target = {
    field1: 1,
    field2: undefined,
    field3: 'lxcan',
    field4: {
        child: 'child',
        child2: {
            child2: 'child2'
        }
    },
    field5: [1, 2]
};
target.obj = target;

const result = deepClone(target);

console.log(result);
