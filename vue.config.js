// vue.config.js
module.exports = {
    // 修改的配置
    // target: "http://localhost:8080",
    // 将baseUrl: '/api',改为baseUrl: '/',
    publicPath: "/",
    devServer: {
        proxy: {
            "/myworknote/*": {
                target: "http://171.221.203.127:30038",
                auth: "admin:szl!41203"
            }
        }
    }
};
