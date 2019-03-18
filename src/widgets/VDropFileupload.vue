<template>
  <div class="dropfile-upload" ref="aa1">
    <span>依赖包</span>
    <p class="info">将文件拖动到这里进行上传</p>
  </div>
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
  mounted () {
    this.bindEvent();
    $(document).on({
      dragleave: function (e) {    //拖离 
        e.preventDefault();
      },
      drop: function (e) {  //拖后放 
        e.preventDefault();
      },
      dragenter: function (e) {    //拖进 
        e.preventDefault();
      },
      dragover: function (e) {    //拖来拖去 
        e.preventDefault();
      }
    });
  },
  destroyed () {
    this.removeDrop();
  },
  methods: {
    bindEvent () {
      $(this.$refs.aa1).on('drop', this.bindDrop);
    },
    bindDrop (e) {
      e.preventDefault();
      let fileList = e.originalEvent.dataTransfer.files; //获取文件对象 
      if (!fileList.length || (fileList.length && !fileList[0].type)) {
        return false;
      }
        this.ok(fileList[0])
    },
    removeDrop () {

    }
  }
}
</script>
<style lang="less" scoped>
.dropfile-upload {
  width: 200px;
  height: 200px;
  text-align: left;
  border: 1px solid gray;
  .info {
    line-height: 100%;
  }
}
</style>

