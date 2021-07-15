// 基础版本-处理循环引用

// 解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
// 这个存储空间，需要可以存储 key-value形式的数据，且 key可以是一个引用类型，我们可以选择 Map 这种数据结构。使用 WeakMap 替代 Map 达到弱引用的目的，解决拷贝大对象时内存消耗过大的问题，弱引用的 WeakMap 不需要我们手动清除属性就能释放这块内存。

// 检查map中有无克隆过的对象
// 有 - 直接返回
// 没有 - 将当前对象作为key，克隆对象作为value进行存储
// 继续克隆

module.exports = function deepClone (target, map = new WeakMap()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return target;
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = deepClone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
}