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
import axios from 'axios';
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
          x = boundry.x - $('#menus').width() - 100,
          y = boundry.y;
        let _time = +new Date();
        axios({
          url: '/myworknote/alg/queryAlgorithmById',
          method: 'post',
          params: {
            algId: dataId
          }
        }).then(e => {
          var data = e.data;
              if(data.status == 'SUCCESS'){
                  var data = data.data;
                  var inputPorts = [];
                  var outputPorts = [];
                  var parameters = {};
                  if(data.hasOwnProperty('inputports')){
                      inputPorts = data.inputports
                  }
                  if(data.hasOwnProperty('outputports')){
                      outputPorts = data.outputports
                  }
                  if(data.hasOwnProperty('parameters')){
                      parameters = data.parameters;
                  }
                _this.isAdd = true;//是否是添加组件的标记
               _this.$store.commit('handleModels/addNodes', {
                  name: dataId,
                  id: data.algname,
                  timer: 'algnode_' + _time,
                  inputCfg:inputPorts,
                  outputCfg:outputPorts,
                   parameters:parameters,
                  info: {
                      left: x,
                      top: y
                  }
              });
             }else{
                 alert("服務器異常，請稍後再試")
             }

        })
        _this.isAdd = true;//是否是添加组件的标记
      }
    });
    jsPlumb.ready(function () {
      var color = "gray";
      var instance = _this.jsPlumbInstance = jsPlumb.getInstance({
        Connector: ["Bezier", { curviness: 5 }],
        DragOptions: { cursor: "pointer", zIndex: 2000 },
        PaintStyle: { stroke: color, strokeWidth: 1 },
        EndpointStyle: { radius: 4, fill: color },
        HoverPaintStyle: { stroke: "#ec9f2e" },
        EndpointHoverStyle: { fill: "#ec9f2e" },
        Container: $('.drag-container')[0],
        ConnectionOverlays: [
          ['Arrow', {
            location: 0.7,
            arrowCommon: {
              foldback: 0.7, fill: color, width: 1
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
      instance.bind('dblclick',
              function (conn, originalEvent) {
                      instance.deleteConnection(conn)
              });

      var selectNode;
      var menuList = [
          {
              'text': '删除',
              'id': 'delete'
          }
      ];
      // 获取菜单的宽和高
      function getStyle(list) {
          var wid = 0,hei = 0;
          for(var i = 0, l = list.length; i < l; i++) {
              var res = textSize(list[i].text);
              if(res.width > wid) {
                  wid = res.width
              }
              hei += res.height;
          }
          // 加上间距
          hei += i*5+20;
          wid += 10;
          return {
              wid: wid,
              hei: hei
          };
      };
      // 右键点击显示菜单项
      document.oncontextmenu=function(ev){
          // 如果菜单项已经存在了，则删除
          selectNode = event.target.getAttribute("id")
          if(!selectNode){
              return;
          }

          if(!selectNode.startsWith('algnode_')){
              return;
          }
          var ctx=document.getElementById('contextMenu');
          if(ctx) {
              ctx.parentNode.removeChild(ctx);
          }
          var menu = document.createElement('ul');
          menu.id = 'contextMenu';
          menu.style.display = 'none';
          for(var i = 0, l = menuList.length; i < l; i++) {
              var list=document.createElement("li");
              list.id = menuList[i].id;
              var node=document.createTextNode(menuList[i].text);
              list.appendChild(node);
              menu.appendChild(list);
          }
          document.getElementsByTagName('body')[0].appendChild(menu);
          var
                  l,t,
                  eve = ev||event,
                  sty = getStyle(menuList),
                  wid = parseInt(sty.wid),
                  hei = parseInt(sty.hei);
          l = eve.clientX+wid>document.body.offsetWidth ? eve.clientX - wid : eve.clientX;
          t = eve.clientY+hei>document.documentElement.clientHeight ? eve.clientY - hei : eve.clientY;
          menu.style.left    = l+'px';
          menu.style.top     = t+'px';
          menu.style.display = 'block';
          menu.style.position = 'absolute';

          return false;
      };
      // 当点击页面时，删除菜单项
      window.onclick=function (event)
      {
          var targetId = event.target.getAttribute("id");
          if(targetId && targetId.startsWith("algnode_")){
              _this.$store.commit('handleModels/updateNode', {
                  id: targetId,
                  type: 'showParamters',
                  value: {
                      targetId
                  }
              });
          }
          if(event.target.className === 'drag-container'){
            _this.$store.commit('handleModels/updateNode', {
                id: '',
                type: 'showParamters',
                value: {
                    targetId
                }
            });
          }
          var ctx=document.getElementById('contextMenu');
          if(ctx) {
              if(event.target.parentNode.id === 'contextMenu') {
                  ctx.style.display = 'none';
                  if(event.target.getAttribute("id") === 'delete'){
                      instance.remove(selectNode)
                      selectNode = '';
                  }

              };
              ctx.parentNode.removeChild(ctx);
          }
      };
      function textSize(text) {
          //计算一段文本的真实长度和高度
          var span = document.createElement("span");
          var result    = {};
          result.width  = span.offsetWidth;
          result.height = span.offsetHeight;
          span.style.visibility = "hidden";
          document.getElementsByTagName('body')[0].appendChild(span);
          if(typeof span.textContent !== "undefined"){
              span.textContent = text;
          } else {
              span.innerText = text
          }
          result.width  = span.offsetWidth - result.width;
          result.height = span.offsetHeight - result.height;
          span.parentNode.removeChild(span);
          return result;
      };
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
            if(_node.inputCfg){
              //添加端点
              instance.addEndpoint(item, {
                uuid: _id + "-top",
                anchor: "Top",
                isTarget: true,
                maxConnections: 1,
                //overlays: [["Label", { label: '46545614651561561', labelStyle: { font: 20, color: '#fff' } }]],
                beforeDetach: function (conn) {   //绑定一个函数，在连线前弹出确认框  
                  //   console.log('conn', conn);
                  let { sourceId, targetId } = conn;
                  _this.$store.commit('handleModels/updateNode', {
                    id: sourceId,
                    type: 'deleteConn',
                    value: {
                      sourceId,
                      targetId
                    }
                  });
                },
              });
            }
            if(_node.outputCfg){
              instance.addEndpoint(item, {
                uuid: _id + "-bottom",
                anchor: "Bottom",
                isSource: true,
                maxConnections: 10,
                overlays: [["Label", { label: '46545614651561561', labelStyle: { font: 20, color: '#fff' } }]]
              });
            }

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

<style lang="less">
ntextMenu {position: absolute; border:1px solid sliver; position:absolute;margin:5px;padding: 0;}
    #contextMenu li{list-style:none;margin-bottom: 5px;cursor:pointer;background-color: rgb(255, 174, 0);border-bottom: 1px solid #fff;}
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
  .jtk-overlay {
    display: none;
    transform: translate(-50%, -100% - 5px) !important;
    border: 1px solid gray;
    user-select: none;
    pointer-events: none;
    background: gray;
  }
  .jtk-hover {
    display: block;
  }
}
</style>
