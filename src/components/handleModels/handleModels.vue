<template>
  <div class="handleModels">
    <Menus/>
    <Canvass/>
    <Panels/>
  </div>
</template>
<script>
import Canvass from './canvas/canvas.vue'
import Panels from './panels/index.vue'
import Menus from './tabs-menu/index.vue'
export default {
  components: { Canvass, Panels, Menus }
}
</script>
<style lang="less" scoped>
.handleModels {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
