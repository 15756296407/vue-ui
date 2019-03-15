// vue.config.js
module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    publicPath: "/",
    devServer: {
        proxy: {
            "/xdatainsight/*": {
                target: "http://172.27.9.11:41116",
                auth: "admin:szl!41203"
            }
        }
    }
};
