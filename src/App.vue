<template>
  <div id="app">
    <Menus/>
    <Canvass/>
    <Panels/>
  </div>
</template>
<script>
import '@/assets/styles/app.css'
import Canvass from '@/components/canvas/canvas.vue'
import Panels from '@/components/panels/index.vue'
import Menus from '@/components/tabs-menu/index.vue'
export default {
  components: { Canvass, Panels, Menus }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}
</style>
