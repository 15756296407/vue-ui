<template>
  <el-row type="flex" align="middle">
    <el-col :span="6">
      <div class="grid-name">{{data.name}}</div>
    </el-col>
    <el-col :span="18">
      <el-input
              ref="input"
        type="file"
        v-model="data.value"
        :value="data.value"
        placeholder="请输入内容"
        @change="onChange"
      ></el-input>
    </el-col>
  </el-row>
</template>
<script>
    import $ from 'jquery';
export default {
  props: {
    data: {
      type: Object
    },
    ok: {
      type: Function
    }
  },
  methods: {
    onChange (value) {
        let input = $(this.$refs.input.$el).find('input')[0];
      this.ok(input.files[0])
    }
  }
}
</script>
<style lang="less" scoped>
</style>

