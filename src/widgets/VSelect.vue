<template>
  <el-row type="flex" align="middle">
    <el-col :span="6">
      <div class="grid-name">{{data.name}}</div>
    </el-col>
    <el-col :span="18">
      <el-select v-model="value" placeholder="请选择" @change="onChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-col>
  </el-row>
</template>
<script>
import axios from 'axios';
export default {
  props: {
    data: {
      type: Object
    },
    ok: {
      type: Function
    },
    value: {
      type: String
    }
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  methods: {
    onChange (value) {
      this.ok(value)
    }
  },
  mounted () {
    this.data.src && axios({
      method: "get",
      url: this.data.src + '_' + +new Date(),
      responseType: "json",
      headers: {
        "content-type":
          "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "application/json"
      }
    }).then(e => {
      console.log(e)
    })
  }
}
</script>
<style lang="less" scoped>
</style>

