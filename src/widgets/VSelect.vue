<template>
  <div>
    <el-row type="flex" align="middle" v-if="data.towards === 'row'">
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
    <el-row
      type="flex"
      style="flex-direction:column"
      align="middle"
      v-else-if="data.towards === 'col'"
    >
      <el-col :span="16" v-if="!ind">
        <div class="grid-name">{{data.name}}</div>
      </el-col>
      <el-col :span="16">
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
  </div>
</template>
<script>
import axios from 'axios';
let cfg = { "status": "SUCCESS", "data": [{ "id": "1", "parentId": "-1", "label": "数据源", "children": [{ "id": "2", "parentId": "1", "label": "关系型数据库数据源", "children": null }] }, { "id": "3", "parentId": "-1", "label": "数据源1", "children": [{ "id": "4", "parentId": "3", "label": "关系型数据库数据源2", "children": null }] }, { "id": "5", "parentId": "-1", "label": "机器学习", "children": [{ "id": "6", "parentId": "5", "label": "分类", "children": [{ "id": "9", "parentId": "6", "label": "二分类", "children": null }, { "id": "10", "parentId": "6", "label": "多分类", "children": null }] }, { "id": "7", "parentId": "5", "label": "回归", "children": null }, { "id": "8", "parentId": "5", "label": "聚类", "children": null }, { "id": "9", "parentId": "6", "label": "二分类", "children": null }, { "id": "10", "parentId": "6", "label": "多分类", "children": null }] }], "message": null };
export default {
  name: 'items',
  props: {
    data: {
      type: Object
    },
    ok: {
      type: Function
    },
    value: {
      type: String
    },
    model: {
      type: Object
    },
    ind: {
      type: Number
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
      }],
      ooptions: cfg,
      value7: ''
    }
  },
  methods: {
    onChange (value) {
      this.ok(value)
    }
  },
  computed: {
    isFolder () {
      return this.model.children && this.model.children.length
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

