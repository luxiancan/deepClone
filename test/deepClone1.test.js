const deepClone = require('../src/deepClone_1.js');

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

const result = deepClone(target);

console.log(result);
