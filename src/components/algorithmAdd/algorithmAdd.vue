<template>
  <div>
    <div>算法基础信息</div>
    <!--     <div v-for="component in algorithmCfg" class="components">
      <component :is="component.type" :data="component" :ok="handle"></component>
    </div>-->
    <el-collapse @change="handleChange">
      <el-collapse-item
        v-for="components in algorithmCfg"
        :title="components.name"
        :name="components.type"
        :key="components.type"
      >
        <template slot="title" v-if="components.add">
          {{components.name}}
          <el-button type="primary" icon="el-icon-plus" circle @click="add($event,'11')"></el-button>
        </template>
        <div class="components-container">
          <div style="width:300px;">
            <div
              v-for="component in components.components"
              :name="component.name"
              :key="component.name"
            >
              <component
                :is="component.type"
                :data="component"
                :ok="handle"
                style="margin-bottom:15px;"
              ></component>
            </div>
          </div>
          <div style="width:300px;" v-if="components.middle">
            <component
              :is="components.middle.type"
              :data="components.middle"
              :ok="handle"
              style="margin-bottom:15px;"
            ></component>
          </div>
          <div style="max-width:500px" v-if="components.left">
            <div style="text-align:left;" v-html="components.left">{{components.left}}</div>
          </div>
          <div style="flex:1"></div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import Widgets from '@/widgets/index.js';
import { mapState } from 'vuex';
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
    },
    handleChange (val) {
      console.log(val);
    },
    add (e) {
      e.stopPropagation();
      console.log(arguments);
    }
  },
  computed: {
    ...mapState('algorithmCfg', {
      algorithmCfg: state => state.algorithmCfg
    })
  }
}
</script>
<style lang="less" scoped>
.components {
  width: 256px;
}
.components-container {
  display: flex;
  align-items: center;
}
</style>
