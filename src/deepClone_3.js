// 基础版本-处理循环引用，优化 for-in 循环

function deepClone1 (target, map = new WeakMap()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return target;
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = deepClone1(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
}


function forEach (array, iteratee) {
    let index = -1;
    let length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

function deepClone2 (target, map = new WeakMap()) {
    if (typeof target === 'object') {
        const isArray = Array.isArray(target);
        let cloneTarget = isArray ? [] : {};
        if (map.get(target)) {
            return target;
        }
        map.set(target, cloneTarget);

        const keys = isArray ? undefined : Object.keys(target);
        forEach(keys || target, (value, key) => {
            if (keys) {
                key = value
            }
            cloneTarget[key] = deepClone2(target[key], map);
        });
        return cloneTarget;
    } else {
        return target;
    }
}

module.exports = {
    deepClone1,
    deepClone2
};