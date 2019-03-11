<template>
  <el-row type="flex" align="middle">
    <el-col :span="6">
      <div class="grid-name">{{data.name}}</div>
    </el-col>
    <el-col :span="18">
      <el-input v-model="data.value" :value="data.value" placeholder="请输入内容" @change="onChange"></el-input>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    ok: {
      type: Function,
      required: true
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

