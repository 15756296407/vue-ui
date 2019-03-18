<template>
  <el-row type="flex" align="middle">
    <el-col :span="6">
      <div class="grid-name">{{data.name}}</div>
    </el-col>
    <el-col :span="18">
      <el-checkbox v-model="checked3" label="item.label" border v-for="item in options"></el-checkbox>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    data: {
      type: Object
    },
    ok: {
      type: Function
    }
  },
  data () {
    return {
      checked3: '',
      options: [{
        value: '选项1',
        label: '查看结果数据'
      },{
        value: '选项2',
        label: '查看结果数据'
      }],
      value: ''
    }
  },
  methods: {
    onChange (value) {
      this.ok(value)
    }
  }
}
</script>
<style lang="less" scoped>
</style>

