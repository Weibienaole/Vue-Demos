function Arthas (option = {}) {
  this.$options = option //  将所有属性挂载在$options上
  let data = (this._data = this.$options.data)
  observe(data)
  // this 代理了 this._data
  for (let key in data) {
    Object.defineProperty(this, key, {
      enumerable: true,
      get () {
        return this._data[key] // this.a = {a:1}
      },
      set (newVal) {
        this._data[key] = newVal
      }
    })
  }
  initComputed.call(this)
  new Compile(option.el, this)
}

function Observer (obj) {
  let dep = new Dep()
  for (let key in obj) {
    let val = obj[key]
    observe(val)
    Object.defineProperty(obj, key, {
      enmuerable: true,
      get () {
        Dep.target && dep.addsub(Dep.target) // 如果Dep.target有值 就将Watcher添加到队列中 [watcher]
        return val
      },
      set (newVal) {
        if (val === newVal) return
        val = newVal
        observe(newVal)
        dep.notify() // 执行所有的watcher的update()方法
      }
    })
  }
}

function Compile (el, vm) {
  // el 表示替换的范围
  vm.$el = document.querySelector(el)
  const fragment = document.createDocumentFragment() // 新建文档碎片
  let child
  while ((child = vm.$el.firstChild)) {
    // 有值就循环
    fragment.appendChild(child) // 将app的内容移入到内存中
  }
  replace(fragment)
  function replace (fragment) {
    Array.from(fragment.childNodes).forEach(function (node) {
      // 数组化后循环每一个node节点
      const text = node.textContent // 拿到节点文本
      const reg = /\{\{(.*)\}\}/ // 匹配双大括号的正则
      if (node.nodeType === 3 && reg.test(text)) {
        // node节点的type === 3(文本节点)且匹配到有双大括号
        let arr = RegExp.$1.split('.')
        let val = vm
        arr.forEach(function (k) {
          val = val[k.trim()] // 赋值，将option里面的值
        })
        // eslint-disable-next-line no-new
        new Watcher(vm, RegExp.$1, function (newVal) {
          // 触发回调函数后根据传来的新值进行替换
          node.textContent = text.replace(/\{\{(.*)\}\}/, newVal)
        })
        // 新值替换旧值
        node.textContent = text.replace(/\{\{(.*)\}\}/, val)
      }
      if (node.nodeType === 1) {
        const nodeAttrs = node.attributes // 拿到节点属性的集合
        // 遍历循环每一个属性
        Array.from(nodeAttrs).forEach(function (attr) {
          let name = attr.name // 拿到属性名
          let exp = attr.value // 拿到属性的值
          // 根据name拿到v-model
          if (name.indexOf('v-') === 0) {
            // 将vm中对应exp的值赋给node节点
            node.value = vm[exp]
            // eslint-disable-next-line no-new
            new Watcher(vm, exp, function (newVal) {
              // 当Watcher被调用也就是vm中的值被修改触发set从而触发Watcher
              node.value = newVal // 将拿到的新值重新赋值给node节点
            })
            // 监听input
            node.addEventListener('input', function (e) {
              // 拿到input框的值
              let newVal = e.target.value
              // 将拿到的值赋给vm中匹配的属性名，并触发set，从而触发Watcher
              vm[exp] = newVal
            })
          }
        })
      }
      if (fragment.childNodes) replace(node) // 如果当前node节点还有childNodes则递归
    })
  }
  vm.$el.appendChild(fragment) // 将内存中的文档碎片移出到app
}

//  观察对象给对象添加Object.defineProperty()
function observe (obj) {
  if (!obj || typeof obj !== 'object') return
  return new Observer(obj)
}

function initComputed () {
  const vm = this
  const computed = this.$options.computed // 全局拿到computed
  Object.keys(computed).forEach(function (key) {
    // 循环键名，并通过Object.defineProperty()进行get更新
    Object.defineProperty(vm, key, {
      // 如果是函数就直接触发函数，如果是对象就查找对象内部的get
      get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
      set () {}
    })
  })
}

// vue特点 不能新增不存在的属性，不存在的属性没有set和get
// 深度相应 每次赋予一个新对象都会给这个新对象增加数据劫持(Object.defineProperty())

// 发布 - 订阅模式
function Dep () {
  // 观察队列
  this.subs = []
}
// 绑定的方法都有update属性
Dep.prototype = {
  addsub: function (sub) {
    // 订阅
    this.subs.push(sub)
  },
  notify: function () {
    this.subs.forEach(sub => sub.update()) // 触发后循环触发每一个sub(Watcher)的update()
  }
}

function Watcher (vm, exp, fn) {
  /*
    vm : 最顶层的this，也就是Arthas函数的this
    exp : node节点中第一个成功匹配正则的数据
    fn : new Watcher 中的回调函数
  */
  this.vm = vm
  this.exp = exp
  this.fn = fn
  Dep.target = this // 定义一个全局的Dep属性 this 指 Watcher
  let val = vm
  let arr = exp.split('.')
  arr.forEach(function (k) {
    val = val[k.trim()] // 这里顶层this的值更改了，触发了Observe()的set()和get()
  })
  Dep.target = null
}
Watcher.prototype = {
  update: function () {
    let val = this.vm
    let arr = this.exp.split('.')
    arr.forEach(function (k) {
      val = val[k.trim()] // 修改值,触发Observe()的set()和get()
    })
    this.fn(val) // 触发回调函数，并返回新值
  }
}
