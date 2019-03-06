import Vue from "vue";
import Vuex from "vuex";
import $ from "jquery";
Vue.use(Vuex);
//nodes对象的数组
let defaultNode = {
    name: "",
    id: "",
    inputCfg: [], //输入
    outputCfg: [], //输出
    info: {}
};
export default new Vuex.Store({
    state: {
        nodes: [], //存储canvas画布区域的连线状态
        menus: [] //储存菜单栏数据
    },
    mutations: {
        addNodes(state, node) {
            let selfnode = $.extend(true, {}, defaultNode, node);
            state.nodes.push(selfnode);
            state.nodes = [...state.nodes];
        },
        updateNode(state, action) {
            let _node = state.nodes.find(e => e.timer === action.id);
            let type = action.type;
            if (_node) {
                switch (type) {
                    case "outputCfg": {
                        _node.outputCfg.push(action.value);
                        console.log(111);
                        break;
                    }
                    case "inputCfg": {
                        _node.inputCfg.push(action.value);
                        console.log(222);
                        break;
                    }
                    case "info": {
                        Object.assign(_node.info, action.value);
                        break;
                    }
                    default:
                        break;
                }
            }
            state.nodes = [...state.nodes];
        }
    },
    getters: {},
    actions: {}
});
