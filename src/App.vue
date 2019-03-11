<template>
  <div id="app">
    <LeftMenu/>
    <div class="app-container">
      <HandleModels v-if="model==='model-train'"/>
      <AlgorithmAdd v-if="model==='algorithm-add'"/>
    </div>
  </div>
</template>
<script>
import '@/assets/styles/app.css'
import LeftMenu from '@/components/leftMenu/leftMenu.vue'
import HandleModels from '@/components/handleModels/handleModels.vue'
import AlgorithmAdd from '@/components/algorithmAdd/algorithmAdd.vue'
import { mapState } from 'vuex';
export default {
  components: { HandleModels, LeftMenu, AlgorithmAdd },
  mounted () {
    console.log(this)
  },
  computed: {
    ...mapState('leftMenu', {
      model: state => state.actionType
    })
  }
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

  .app-container {
    flex: 1;
  }
}
</style>
