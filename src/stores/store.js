import handleModels from "./handleModels";
import leftMenu from "./leftMenu";
import algorithmCfg from "./algorithmCfg";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        handleModels,
        leftMenu,
        algorithmCfg
    }
});
