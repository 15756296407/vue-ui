<template>
  <div>
    <div>算法基础信息</div>
    <div v-for="component in components" class="components">
      <component :is="component.type" :data="component" :ok="handle"></component>
    </div>
  </div>
</template>
<script>
import Widgets from '@/widgets/index.js';
export default {
  data () {
    return {
      components: [{ type: 'VInput', name: '娃哈哈', value: '111' }]
    }
  },
  components: {
    ...Widgets
  },
  methods: {
    handle () {
      console.log('arguments', arguments)
    }
  }
}
</script>
<style lang="less" scoped>
.components {
  width: 256px;
}
</style>
