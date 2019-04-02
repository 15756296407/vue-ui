<template>
  <div id="menus">
    <el-tree
      :data="data6"
      node-key="id"
      highlight-current
      :render-content="rendered"
      @node-expand="syncBindDrag"
    ></el-tree>
  </div>
</template>
<script>
import $ from "jquery";
import "@/assets/libs/jquery-ui/jquery-ui.min";
import "@/assets/libs/jquery-ui/jquery-ui.structure.min.css";
import "@/assets/libs/jquery-ui/jquery-ui.theme.min.css";
import { setTimeout } from 'timers';
import axios from 'axios';
let data = [{
  id: 1,
  label: '一级 1',
  children: [{
    id: 4,
    label: '二级 1-1',
    children: [{
      id: 9,
      label: '三级 1-1-1'
    }, {
      id: 10,
      label: '三级 1-1-2'
    }]
  }]
}, {
  id: 2,
  label: '一级 2',
  children: [{
    id: 5,
    label: '二级 2-1'
  }, {
    id: 6,
    label: '二级 2-2'
  }]
}, {
  id: 3,
  label: '一级 3',
  children: [{
    id: 7,
    label: '二级 3-1'
  }, {
    id: 8,
    label: '二级 3-2',
    children: [{
      id: 11,
      label: '三级 3-2-1'
    }, {
      id: 12,
      label: '三级 3-2-2'
    }, {
      id: 13,
      label: '三级 3-2-3'
    }]
  }]
}];
function setData (data) {
  return data.map(e => {
    if (e.children) {
      e.id = e.id + '__children';
      e.children = setData(e.children);
    }
    return e;
  })
}
export default {
  data () {
    return {
      data6: setData(data)
    }
  },
  methods: {
    rendered (h, { node, data, store }) {
      let className = 'menu-label';
      data.children && (className += '-parent');
      return (
        <div class={className} dataId={data.id} >{data.label}</div>
      )
    },
    syncBindDrag () {
      setTimeout(this.bindDrag);
    },
    bindDrag () {
      let _this = this;
      $(".menu-label").draggable({
        helper: "clone",
        placeholder: "ui-state-highlight",
        start (event, ui) {
          let Ele = ui.helper[0];
          $(Ele).css({
            width: 182,
            height: 30,
            boxSizing: "border-box",
            borderRadius: 5,
            color: "#03a9f4",
            backgroundColor: "#fff",
            padding: "0 10px",
            border: "1px #03a9f4 solid",
            marginBottom: 8,
            display: "flex",
            alignItems: "center",
            cursor: "all-scroll"
          });
        },
        stop (event, ui) {
          $(ui.helper[0]).remove();
          return true;
        }
      });
    }
  },
  updated () {

  },
  mounted () {
    this.bindDrag();
     axios({
      url: '/myworknote/alg/listAlgorithms'
    }).then(e => {
      this.data6.splice(0, this.data6.length);
      let data = e.data;
      data = (data && data.data) ? data.data : [];
      data.forEach(item => {
        this.data6.push(item);
      });
    }); 
  }
}
</script>

<style lang="less" scoped>
#menus {
  width: 245px;
  background: gray;
  position: relative;
  box-sizing: border-box;
  border-right: 1px solid gray;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  min-height: 400px;
}
</style>
