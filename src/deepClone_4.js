// 进阶版本-处理循环引用，优化 for-in 循环，处理 Set 和 Map

const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

function forEach (array, iteratee) {
    let index = -1;
    let length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

function isObject (target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

function getType (target) {
    return Object.prototype.toString.call(target);
}

function getInit (target) {
    const Ctor = target.constructor;
    return new Ctor();
}

function deepClone (target, map = new WeakMap()) {
    // 克隆原始类型
    if (!isObject(target)) {
        return target
    }
    // 初始化
    let type = getType(target);
    let cloneTarget;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target);
    }

    // 处理循环引用
    if (map.get(target)) {
        return target;
    }
    map.set(target, deepClone);

    // 克隆 Set 数据类型
    if (type === setTag) {
        target.forEach((value) => {
            cloneTarget.add(deepClone(value));
        });
        return cloneTarget;
    }
    // 克隆 Map 数据类型
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, deepClone(value));
        })
        return cloneTarget;
    }
    // 克隆 数组和对象
    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value
        }
        cloneTarget[key] = deepClone(target[key], map);
    });
    return cloneTarget
}

module.exports = {
    deepClone
}