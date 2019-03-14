<template>
  <el-row type="flex" align="middle">
    <el-col :span="6">
      <div class="grid-name">{{data.name}}</div>
    </el-col>
    <el-col :span="18">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="value" @change="onChange"></el-input>
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
    },
    value: {
      type: String
    }
  },
  data () {
    return {
      textarea: ''
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

