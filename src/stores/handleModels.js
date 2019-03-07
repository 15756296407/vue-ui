/*****
 * 数据模型的store
 */
//nodes对象的数组
import $ from "jquery";
let defaultNode = {
    name: "",
    id: "",
    inputCfg: [], //输入
    outputCfg: [], //输出
    info: {}
};
export default {
    namespaced: true,
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
                        break;
                    }
                    case "inputCfg": {
                        _node.inputCfg.push(action.value);
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
};
