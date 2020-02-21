<template>
  <div>
i am Box
  </div>
</template>

<script>
export default {
  data () {
    return {
      obj: {
        a: '123',
        b: '456'
      }
    }
  },
  created () {
  },
  mounted () {
    this.box()
  },
  methods: {
    box () {
    // Observe
      function Dep () {
        this.subs = []
      }
      Dep.prototype = {
        addSub: function (sub) {
          this.subs.push(sub)
        },
        notify: function () {
          this.subs.forEach(function (sub) {
            sub.update()
          })
        }
      }

      const obja = {name: 'Arthas'}

      traverseObj(obja)

      obja.name = 'Monica'

      function traverseObj (obj) {
        if (!obj || typeof obj !== 'object') return

        for (let i of Object.keys(obj)) {
          getLisenter(obj, i, obj[i])
        }
      }

      function getLisenter (obj, key, value) {
        const dep = new Dep()
        traverseObj(value)

        Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: false,

          get: () => {
            console.log('监听到有人拿值')
            // 需要在闭包内添加Watcher，所以在这里用dep定义一个全局target属性，暂存watcher，添加完移除
            Dep.target && dep.addSub(Dep.target)
            return value
          },

          set: (newValue) => {
            console.log('数值发生了变化', '现在为 ', newValue)
            value = newValue
            dep.notify() // 通知订阅者
          }
        })
      }

      // Compile
      function Compile (el) {
        this.$el = this.isElementNode(el) ? el : document.querySelector(el)

        if (this.$el) {
          this.$fragment = this.node2Fragment(this.$el)
          this.init()
          this.$el.appendChild(this.$fragment)
        }
      }
      Compile.prototype = {
        init: function () { this.compileElement(this.$fragment) },
        node2Fragment: function (el) {
          let fragment = document.createDocumentFragment()
          let child
          // eslint-disable-next-line no-cond-assign
          while (child = el.firstChild) {
            fragment.appendChild(child)
          }
          return fragment
        },
        compileElement: function (el) {
          let childNodes = el.childNodes
          let me = this
          let arr = []
          arr.slice.call(childNodes).forEach(function (node) {
            let text = node.textContent
            let reg = /\{\{(.*)\}\}/ // 表达式文本
            // 按元素节点的方式编译
            if (me.isElementNode(node)) {
              me.compile(node)
            } else if (me.isTextNode(node) && reg.text(text)) {
              me.compileText(node, RegExp.$1)
            }
            // 遍历编译子节点
            if (node.childNodes && node.childNodes.length) {
              me.compileElement(node)
            }
          })
        },
        compile: function (node) {
          let nodeAttrs = node.attributes
          let me = this
          let arr = []
          arr.slice.call(nodeAttrs).forEach(function (attr) {
            // 规定 指定以  v-xxx 命名
            // 如 <span v-text='content'></span> 中指令为 v-text
            let attrName = attr.name // v-text
            if (me.isDirective(attrName)) {
              let exp = attr.value // content
              let dir = attrName.subString(2) // text
              if (me.isEventDirective(dir)) {
                // 事件指令  如 v-on:click
                compileUntil.eventHandle(node, me.$vm, exp)
              } else {
                // 普通指令 如
                compileUntil[dir] && compileUntil[dir](node, me.$vm, exp)
              }
            }
          })
        }
      }
      // 指令处理集合
      const compileUntil = {
        text: function (node, vm, exp) {
          this.bind(node, vm, 'text')
        },
        bind: function (node, vm, exp, dir) {
          let updaterFn = updater[dir + 'Updater']
          // 第一次初始化视图
          updaterFn && updaterFn(node, vm[exp])
          // 实例化订阅者，此操作会在对应的属性消息订阅器中添加了g该订阅者Watcher
          // eslint-disable-next-line no-new
          new Watcher(vm, exp, function (value, oldValue) {
            // 一旦属性值发生变化会收到通知执行此函数，更新视图
            updaterFn && updaterFn(node, value, oldValue)
          })
        }
      }
      // 更新函数
      const updater = {
        textUpdater: function (node, value) {
          node.yexyContent = typeof value === 'undefined' ? '' : value
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
