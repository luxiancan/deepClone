// 最终版本-处理循环引用，优化 for-in 循环，处理其他数据类型

// 可继续遍历的数据类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';
const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

// 不可继续遍历的数据类型
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

// 通用while循环
function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

// 判断是否为引用类型
function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

// 获取数据的实际类型
function getType(target) {
    return Object.prototype.toString.call(target);
}

// 初始化被克隆的对象
function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

// 克隆Symbol
function cloneSymbol(target) {
    return Object(Symbol.prototype.valueOf.call(target));
}

// 克隆正则
function cloneReg(target) {
    const reFlags = /\w*$/;
    const result = new target.constructor(target.source, reFlags.exec(target));
    result.lastIndex = target.lastIndex;
    return result;
}

// 克隆不可遍历的数据类型
function cloneOtherType(target, type) {
    const Ctor = target.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(target);
        case regexpTag:
            return cloneReg(target);
        case symbolTag:
            return cloneSymbol(target);
        case funcTag:
            return target;
        default:
            return null;
    }
}

function deepClone (target, map = new WeakMap()) {
    // 非引用类型数据直接返回
    if (!isObject(target)) {
        return target;
    }

    // 根据不同数据类型进行操作
    const type = getType(target);
    let cloneTarget;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target);
    } else {
        return cloneOtherType(target, type);
    }

    // 处理循环引用
    if (map.get(target)) {
        return target;
    }
    map.set(target, cloneTarget);

    // 处理Set
    if (type === setTag) {
        target.forEach((value) => {
            cloneTarget.add(deepClone(value));
        });
        return cloneTarget;
    }
    // 处理Map
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, deepClone(value));
        });
        return cloneTarget;
    }

    // 处理对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = deepClone(target[key], map);
    });
    return cloneTarget;
}

module.exports = {
    deepClone
}
