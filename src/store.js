import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        nodes: [], //存储canvas画布区域的连线状态
        menus: [] //储存菜单栏数据
    },
    mutations: {
        addNodes(state, node) {
            state.nodes.push(node);
        }
    },
    actions: {}
});
