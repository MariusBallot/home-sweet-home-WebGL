var path = require('path');

module.exports = {
    devServer: { https: true },

    css: {
        loaderOptions: {
            stylus: {
                use: [require('rupture')()],
                import: ['~rupture/rupture/index.styl'],
                import: [path.resolve(__dirname, "src/utils/mixins.styl")]
            }
        }
    },

    chainWebpack: config => {
        // GraphQL Loader
        config.module
            .rule('glslify')
            .test(/\.(glsl|vs|fs|vert|frag)$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end()
            .use('glslify-loader')
            .loader('glslify-loader')
            .end()
            .rule('model')
            .test(/\.(glb)$/)
            .use('raw-loader')
            .loader('raw-loader')
            .end()
        // Add another loader
    },
}