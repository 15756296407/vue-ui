/***
 * 左边栏的按钮点击
 */
const defaultMenu = {
    menus: [
        {
            name: "首页",
            type: "index",
            icon: ""
        },
        {
            name: "模型训练",
            type: "model-train",
            icon: ""
        },
        {
            name: "算法添加",
            type: "algorithm-add",
            icon: ""
        }
    ],
    actionType: "index"
};
export default {
    namespaced: true,
    state: { ...defaultMenu },
    mutations: {
        setModel(state, model) {
            state.actionType = model;
        }
    }
};
