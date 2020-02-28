<template>
  <div>
    <input type='text' v-model="InputValue"/>
    {{listeners}}
    <!-- <slot>i am BBox</slot> -->
    <slot :Arthas='Arthas'></slot>
    <!-- slot 标签内的内容属于默认值 如果父组件的子组件标签内部没有内容，默认值就会传入 -->

    <slot name='Monica'></slot>
  </div>
</template>

<script>
export default {
  // 定义model属性
  model: {
    // prop即 父组件使用 v-model 绑定的属性,这个名称是自定义的
    prop: 'ars',
    // event即 子组件会向父组件触发的事件,父组件的 v-model可以监听到这个事件,并将vlaue赋值给v-model绑定的属性
    event: 'input'
  },
  props: {
    // 这里的 prop 定义必须与 model中定义的 prop 同名
    ars: String
  },
  data () {
    return {
      Arthas: 'ttttt'
    }
  },
  computed: {
    // 定义一个计算属性,给子组件的 v-model使用
    InputValue: {
      // 计算属性的 get 返回父组件传入的 value,即model,props中定义的 prop
      get () {
        return this.ars
      },
      set (value) {
        // 向父组件触发事件,此事件为model中定义的event,子组件v-model绑定了该计算属性,输入时会触发计算属性的set方法,即向父组件触发该事件
        this.$emit('input', value)
      }
    },
    listeners: function () {
      console.log(this.$listeners)
      return 'a'
    }
  }
}
</script>
