<template>
  <div class="hello">
    <button id="add-node" @click="addNode">添加</button>
    <ul id="drag">
      <li class="li" :id="item.id" v-for="item in arr"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      jsPlumbInstance: null,
      arr: [{
        id: 'li1'
      }, {
        id: 'li2'
      }, {
        id: 'li3'
      }, {
        id: 'li4'
      }, {
        id: 'li5'
      }]
    }
  },
  methods: {
    addNode () {
      this.arr.push({ id: 'li6' });
    }
  },
  updated: function () {
    this.$nextTick(function () {
      let _node = document.querySelector('#li6');
      if (this.jsPlumbInstance) {
        this.jsPlumbInstance.addEndpoint(_node, {
          uuid: _node.getAttribute("id") + "-top",
          anchor: "Top",
          isTarget: true,

          maxConnections: 10
        });
        this.jsPlumbInstance.addEndpoint(_node, {
          uuid: _node.getAttribute("id") + "-top",
          anchor: "Bottom",
          isSource: true,
          maxConnections: 10
        });
        this.jsPlumbInstance.draggable(_node);
      }
    })
  },
  mounted () {
    let _this = this;
    jsPlumb.ready(function () {

      var color = "gray";
      var instance = _this.jsPlumbInstance = jsPlumb.getInstance({
        // notice the 'curviness' argument to this Bezier curve.  the curves on this page are far smoother
        // than the curves on the first demo, which use the default curviness value.
        Connector: ["Bezier", { curviness: 50 }],
        DragOptions: { cursor: "pointer", zIndex: 2000 },
        PaintStyle: { stroke: color, strokeWidth: 2 },
        EndpointStyle: { radius: 9, fill: color },
        HoverPaintStyle: { stroke: "#ec9f2e" },
        EndpointHoverStyle: { fill: "#ec9f2e" },
        Container: "drag",
        ConnectionOverlays: [
          ['Arrow', {
            location: 0.7,
            arrowCommon: {
              foldback: 0.7, fill: color, width: 14
            },
          }],
        ],
      });
      instance.bind("connection", function (info) {
        console.log(info);
      });
      // suspend drawing and initialise.
      instance.batch(function () {
        // declare some common values:
        var arrowCommon = { foldback: 0.7, fill: color, width: 14 },
          // use three-arg spec to create two different arrows with the common values:
          overlays = [
            ["Arrow", { location: 0.7 }, arrowCommon]
          ];

        // add endpoints, giving them a UUID.
        // you DO NOT NEED to use this method. You can use your library's selector method.
        // the jsPlumb demos use it so that the code can be shared between all three libraries.
        var _windows = jsPlumb.getSelector("#drag .li");
        for (var i = 0; i < _windows.length; i++) {
          instance.addEndpoint(_windows[i], {
            uuid: _windows[i].getAttribute("id") + "-bottom",
            isSource: true,
            anchor: "Bottom",
            maxConnections: 10
          });
          instance.addEndpoint(_windows[i], {
            uuid: _windows[i].getAttribute("id") + "-top",
            anchor: "Top",
            isTarget: true,
            maxConnections: 10
          });
        }
        /* var conn = instance.connect({ uuids: ["li3-bottom", "li6-top"], detachable: true, reattach: true });
        instance.connect({ uuids: ["li1-bottom", "li2-top"], });
        instance.connect({ uuids: ["li1-bottom", "li3-top"] });
        instance.connect({ uuids: ["li2-bottom", "li4-top"], });
        instance.connect({ uuids: ["li2-bottom", "li5-top"] }); */
        instance.connect({ uuids: ["li2-bottom", "li5-top"] });
        instance.draggable(_windows);

      });
      jsPlumb.fire('jsPlumbDemoLoaded', instance);
    });

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#drag {
  width: 100%;
  height: 700px;
  background-color: rgba(200, 100, 0, 0.5);
  position: relative;
  li {
    width: 100px;
    height: 100px;
    background: gray;
    position: absolute;
    &#li1 {
      left: 50px;
      top: 50px;
    }
    &#li2 {
      left: 250px;
      top: 50px;
    }
    &#li3 {
      left: 450px;
      top: 50px;
    }
    &#li4 {
      left: 650px;
      top: 50px;
    }
    &#li5 {
      left: 850px;
      top: 50px;
    }
  }
}
</style>
