### 说说什么是浅拷贝？什么是深拷贝？

引用类型的数据在赋值的过程中，其实是拷贝了内存地址，比如将b对象赋值给a变量，这两个变量都指向了同一个内存地址，修改了a变量之后b对象也会跟着改变。而我们希望得到的是，修改a不会影响b，这两个对象不会相互影响，针对这种场景就可以使用浅拷贝和深拷贝。

浅拷贝是指将对象的所有属性值拷贝到新的对象，进行一层属性的拷贝，但是如果属性值也是对象的话，依旧是拷贝那个对象的地址，上面的问题还是会出现。这种情况就可以使用深拷贝来解决，即使属性值是对象，深拷贝也可以做到无限层级拷贝，切断两个引用类型变量之间的关系，不会相互影响。

浅拷贝的方法：遍历对象属性赋值，Object.assign()，展开运算符...

深拷贝的方法：浅拷贝+递归，JSON.parse(JSON.stringify(obj))

JSON.parse(JSON.stringify())这个方法有一定的局限性：
序列化时遇到如下情况需要注意：
- 时间对象 => 字符串的形式
- RegExp,Error => {}
- 会丢失 function,undefined
- NaN,Infinity,-Infinity => null
- 如果对象中存在循环引用的情况也无法实现深拷贝

终极深拷贝的方法可以参考 lodash 的深拷贝。`./src/deepClone_5.js` 中深拷贝的方法采用的是 浅拷贝+递归 的方式实现。