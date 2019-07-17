module.exports = {
    // 开发
    dev: {
        staticDir: 'static',
        publicPath: '/',
        sourceMap: true,
        minimize: false,
        host: 'localhost',
        port: '3001'
    },
    // 生产
    prod: {
        staticDir: 'static',
        publicPath: './',
        sourceMap: false,
        minimize: false
    }
};
