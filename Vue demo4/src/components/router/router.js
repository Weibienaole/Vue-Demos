current = {
  path: '/', // 路径
  query: {}, // query
  params: {}, // params
  name: '', // 路由名
  fullPath: '/', // 完整路径
  route: {} // 记录当前路由属性
}
class Observer {
  constructor (value) {
    this.walk(value)
  }

  walk (obj) {
    Object.keys(obj).forEach((key) => {
      // 如果是对象，则递归调用walk，保证每个属性都可以被defineReactive
      if (typeof obj[key] === 'object') {
        this.walk(obj[key])
      }
      defineReactive(obj, key, obj[key])
    })
  }
}

function defineReactive (obj, key, value) {
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get: () => {
      if (Dep.target) {
        // 依赖收集
        dep.add()
      }
      return value
    },
    set: (newValue) => {
      value = newValue
      // 通知更新，对应的更新视图
      dep.notify()
    }
  })
}

export function observer (value) {
  return new Observer(value)
}

export class Dep {
  constructor () {
    this.deppend = []
  }
  add () {
    // 收集watcher
    this.deppend.push(Dep.target)
  }
  notify () {
    this.deppend.forEach((target) => {
      // 调用watcher的更新函数
      target.update()
    })
  }
}

Dep.target = null

export function setTarget (target) {
  Dep.target = target
}

export function cleanTarget () {
  Dep.target = null
}

// Watcher
export class Watcher {
  constructor (vm, expression, callback) {
    this.vm = vm
    this.callbacks = []
    this.expression = expression
    this.callbacks.push(callback)
    this.value = this.getVal()
  }
  getVal () {
    setTarget(this)
    // 触发 get 方法，完成对 watcher 的收集
    let val = this.vm
    this.expression.split('.').forEach((key) => {
      val = val[key]
    })
    cleanTarget()
    return val
  }

  // 更新动作
  update () {
    this.callbacks.forEach((cb) => {
      cb()
    })
  }
}

// 响应式数据劫持
observer(this.current)

// 对 current.route 对象进行依赖收集，变化时通过 render 来更新
// eslint-disable-next-line no-new
new Watcher(this.current, 'route', this.render.bind(this))
