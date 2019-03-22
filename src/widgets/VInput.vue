<template>
  <div>
    <el-row type="flex" align="middle" v-if="data.towards === 'row'">
      <el-col :span="6">
        <div class="grid-name">{{data.name}}</div>
      </el-col>
      <el-col :span="18">
        <el-input v-model="value" :value="value" placeholder="请输入内容" @change="onChange"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" style="flex-direction:column" align="middle" v-if="data.towards === 'col'">
      <el-col :span="16" v-if="!ind">
        <div class="grid-name">{{data.name}}</div>
      </el-col>
      <el-col :span="16">
        <el-input v-model="value" :value="value" placeholder="请输入内容" @change="onChange"></el-input>
      </el-col>
    </el-row>
  </div>
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
    },
    ind: {
      type: Number
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

