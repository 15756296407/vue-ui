/**
 * 添加模型数据面板
 * 0  初始面板
 */
import defaultCfg from "@/common/models/algorithmCfg";

let defCfg = {};
defaultCfg["0"].forEach((e, i) => {
    defCfg[e.type] = [];
    let Obj = {};
    e.components.forEach(item => {
        Obj[item.model] = "";
    });
    i || (Obj.jarload = []);
    defCfg[e.type].push(Obj);
});
let cfg = {
    input: { ...defCfg.input[0] },
    output: { ...defCfg.output[0] },
    parmas: { ...defCfg.parmas[0] }
};

export default {
    namespaced: true,
    state: {
        algorithmCfg: defaultCfg["0"], //取默认dom配置
        defaultCfg: defCfg
    },
    mutations: {
        switchCfg(state, type) {
            state.algorithmCfg = [...defaultCfg[type]];
        },
        /**
         *
         * @param {*} state
         * @param {*} action  {type: input/output/parmas}
         */
        addCfg(state, action) {
            state.defaultCfg[action.type].push({ ...cfg[action.type] });
            state.defaultCfg[action.type] = [...state.defaultCfg[action.type]];
        },
        /**
         *
         * @param {*} state
         * @param {*} action  {type: input/output/parmas,ind:下标}
         */
        removeCfg(state, action) {
            state.defaultCfg[action.type].splice(action.ind, 1);
            state.defaultCfg[action.type] = [...state.defaultCfg[action.type]];
        },
        updateCfg() {}
    }
};
