<template>
  <div class="leftMenu">
    <div
      v-for="item in menus"
      class="menu"
      :class="{[item.type]:true,active:model===item.type}"
      @click="handleActionType(item.type)"
    >{{item.name}}</div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  methods: {
    handleActionType (model) {
      this.$store.commit('leftMenu/setModel', model)
    }
  },
  computed: {
    ...mapState('leftMenu', {
      menus: state => state.menus,
      model: state => state.actionType
    })
  }
}
</script>
<style lang="less" scoped>
.leftMenu {
  width: 100px;
  border-right: 1px solid gray;
  .menu {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 2px solid blue;
    cursor: pointer;
    user-select: none;
    &:hover {
      font-size: 20px;
    }
  }
  .active {
    font-size: 20px;
  }
}
</style>

