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
                        //添加输出端
                        _node.outputCfg.push(action.value);
                        break;
                    }
                    case "inputCfg": {
                        //添加输入端
                        _node.inputCfg.push(action.value);
                        break;
                    }
                    case "deleteConn": {
                        //删除连线
                        let { sourceId, targetId } = action.value;
                        let sourceNode = state.nodes.find(
                                e => e.timer === sourceId
                            ),
                            sourceInd,
                            targetNode = state.nodes.find(
                                e => e.timer === targetId
                            ),
                            targetInd;
                        sourceInd = sourceNode.outputCfg.findIndex(
                            e => e === targetId
                        );
                        sourceNode.outputCfg.splice(sourceInd, 1);
                        targetInd = targetNode.inputCfg.findIndex(
                            e => e === sourceId
                        );
                        targetNode.inputCfg.splice(targetInd, 1);
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
