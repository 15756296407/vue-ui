import Vue from "vue";
import App from "./App.vue";
import store from "./stores/store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "jsplumb";
import "./assets/styles/reset.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
    store,
    render: h => h(App)
}).$mount("#app");
