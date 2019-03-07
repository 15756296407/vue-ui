<template>
  <div id="canvas">
    <div class="container">
      <div class="drag-container">
        <div
          class="canvas-drag"
          :id="item.timer"
          v-for="item in nodes"
          :style="{left:item.info.left + 'px',top:item.info.top+'px'}"
        >{{item.id}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import { mapState } from 'vuex';
export default {
  data () {
    return {
      isAdd: true
    }
  },
  mounted () {
    let _this = this;
    $('#canvas').droppable({
      drop: function (event, ui) {
        let dataId = ui.helper[0].getAttribute("dataId");
        let boundry = ui.helper[0].getBoundingClientRect(),
          x = boundry.x - $('#menus').width(),
          y = boundry.y;
        let _time = +new Date();
        _this.isAdd = true;//是否是添加组件的标记
        _this.$store.commit('handleModels/addNodes', {
          name: dataId,
          id: dataId + '__' + _time,
          timer: '_' + _time,
          info: {
            left: x,
            top: y
          }
        });
      }
    });
    jsPlumb.ready(function () {
      var color = "gray";
      var instance = _this.jsPlumbInstance = jsPlumb.getInstance({
        Connector: ["Bezier", { curviness: 50 }],
        DragOptions: { cursor: "pointer", zIndex: 2000 },
        PaintStyle: { stroke: color, strokeWidth: 2 },
        EndpointStyle: { radius: 9, fill: color },
        HoverPaintStyle: { stroke: "#ec9f2e" },
        EndpointHoverStyle: { fill: "#ec9f2e" },
        Container: $('.drag-container')[0],
        ConnectionOverlays: [
          ['Arrow', {
            location: 0.7,
            arrowCommon: {
              foldback: 0.7, fill: color, width: 14
            },
          }],
        ],
      });
      instance.bind('beforeDrop', function (info) {
        let { sourceId, targetId } = info;
        if (_this.checkLine(sourceId, targetId)) {
          _this.$store.commit('handleModels/updateNode', {
            id: sourceId,
            type: 'outputCfg',
            value: targetId
          });
          _this.$store.commit('handleModels/updateNode', {
            id: targetId,
            type: 'inputCfg',
            value: sourceId
          });
          return true;
        } else {
          return false;
        }
      });
      instance.batch(function () {
        var arrowCommon = { foldback: 0.7, fill: color, width: 14 },
          overlays = [
            ["Arrow", { location: 0.7 }, arrowCommon]
          ];
        _this.dropPoint($('.canvas-drag'));
        /* var conn = instance.connect({ uuids: ["li3-bottom", "li6-top"], detachable: true, reattach: true });
        instance.connect({ uuids: ["li1-bottom", "li2-top"], });
        instance.connect({ uuids: ["li1-bottom", "li3-top"] });
        instance.connect({ uuids: ["li2-bottom", "li4-top"], });
        instance.connect({ uuids: ["li2-bottom", "li5-top"] }); */
        // instance.draggable(_windows);
      });
      jsPlumb.fire('jsPlumbDemoLoaded', instance);
    });
  },
  updated: function () {
    this.$nextTick(function () {
      let _node = $('#' + this.lastNode.timer);
      this.isAdd && this.dropPoint(_node);
    })
  },
  methods: {
    checkLine (id, output) {
      let nodes = this.$store.state.handleModels.nodes;
      let _node = nodes.find(e => e.timer === id);
      return _node && _node.outputCfg.indexOf(output) === -1;
    },
    dropPoint (nodes) {
      this.isAdd = false;
      let instance = this.jsPlumbInstance,
        _this = this;
      let _nodes = this.nodes;
      if (instance) {
        nodes.each((ind, item) => {
          let _id = item.getAttribute("id"),
            _node = _nodes.find(e => e.timer === _id);

          //添加端点
          instance.addEndpoint(item, {
            uuid: _id + "-top",
            anchor: "Top",
            isTarget: true,
            maxConnections: 10
          });
          instance.addEndpoint(item, {
            uuid: _id + "-bottom",
            anchor: "Bottom",
            isSource: true,
            maxConnections: 10
          });
          instance.draggable(item, {
            containment: '.drag-container',
            force: true,
            start: function (event) {

            },
            stop: function (event) {
              const pos = event.pos
              let left = pos[0] < 0 ? 0 : pos[0]
              let top = pos[1] < 0 ? 0 : pos[1]

              _this.posLeft = null
              _this.posTop = null
              _this.$store.commit('handleModels/updateNode', {
                id: _id,
                type: 'info',
                value: {
                  left,
                  top
                }
              });
            }
          });
        });
        _nodes.forEach(e => {
          e.outputCfg.forEach(item => {
            instance.connect({ uuids: [e.timer + "-bottom", item + "-top"], });
          })
        })
      }
    }
  },
  computed: {
    ...mapState('handleModels', {
      nodes: state => state.nodes,
      lastNode: state => state.nodes.slice(-1)[0],
    })
  }
}
</script>

<style lang="less" scoped>
#canvas {
  flex: 1;
  position: relative;
  .container {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .drag-container {
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>
