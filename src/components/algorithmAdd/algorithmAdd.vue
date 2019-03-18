<template>
  <div id="alginfo">
    <div>算法基础信息</div>
    <!--     <div v-for="component in algorithmCfg" class="components">
      <component :is="component.type" :data="component" :ok="handle"></component>
    </div>-->
    <el-collapse @change="handleChange" v-model="activeName">
      <el-collapse-item
        v-for="components in algorithmCfg"
        :title="components.name"
        :name="components.type"
        :key="components.type"
      >
        <template slot="title" v-if="components.add">
          {{components.name}}
          <el-button type="primary" icon="el-icon-plus" circle @click="add($event,components.type)"></el-button>
        </template>
        <div class="components-container">
          <div style="width:300px;" v-for="(item,ind) in defaultCfg[components.type]">
            <div
              v-for="component in components.components"
              :name="component.name"
              :key="component.name"
            >
              <component
                :is="component.type"
                :data="component"
                :value="item[component.model]"
                :ok="(value)=>handle(components.type,ind,component.model,value)"
                style="margin-bottom:15px;"
              ></component>
            </div>
            <el-button
              v-if="components.add"
              type="primary"
              icon="el-icon-minus"
              circle
              @click="remove($event,components.type,ind)"
            ></el-button>
          </div>
          <div style="width:300px;" v-if="components.middle">
            <component
              :is="components.middle.type"
              :data="components.middle"
              :ok="(value)=>handle(components.type,0,components.middle.model,value)"
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
    <button @click="save">保存</button>
  </div>
</template>
<script>

import Widgets from '@/widgets/index.js';
import { mapState } from 'vuex';
import axios from 'axios';
import $ from 'jquery'
export default {
  data () {
    return {
      components: [{ type: 'VInput', name: '娃哈哈', value: '111' }],
      activeName: ['base', 'input', 'output', 'parmas', 'handles']
    }
  },
  components: {
    ...Widgets
  },
  methods: {
    handle (type, ind, model, value) {
      this.$store.commit('algorithmCfg/updateCfg', { type, ind, model, value });
    },
    handleChange (val) {
      console.log(val);
    },
    add (e, type) {
      e.stopPropagation();
      this.$store.commit('algorithmCfg/addCfg', { type });
    },
    remove (e, type, ind) {
      e.stopPropagation();
      this.$store.commit('algorithmCfg/removeCfg', { type, ind });
    },
    save () {

      let { defaultCfg } = this.$store.state.algorithmCfg;
      let _defaultCfg = $.extend(true, {}, defaultCfg);
      if (!_defaultCfg.base[0].jarpath) {
        return false;
      }
      let data = new FormData();
      data.append("jarpath", _defaultCfg.base[0].jarpath);
      delete _defaultCfg.base[0].jarpath;
      data.append('algorithmBean', JSON.stringify(_defaultCfg.base[0]));
      data.append('inputPorts', JSON.stringify(_defaultCfg.input));
      data.append('outputPorts', JSON.stringify(_defaultCfg.output));
      data.append('parameters', JSON.stringify(_defaultCfg.parmas));
      data.append('actions', JSON.stringify({}));
      data.append('dependenceJars', _defaultCfg.algJarPath);


      axios({
        url: '/myworknote/alg/addAlgorithm',
        method: 'post',
        data
      });

    }
  },
  computed: {
    ...mapState('algorithmCfg', {
      algorithmCfg: state => state.algorithmCfg,
      defaultCfg: state => state.defaultCfg
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
