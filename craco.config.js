const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: {
            experiments: {
                topLevelAwait: true,
            },
            resolve: {
                fallback: {
                    fs: require.resolve("browserify-fs"),
                    stream: require.resolve("stream-browserify"),
                    path: require.resolve("path-browserify"),
                    buffer: require.resolve("buffer/"),
                    util: require.resolve("util/"),
                    url: require.resolve("url/"),
                    module: false
                },
            },
            plugins: [
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer'],
                }),
            ]
        },
    }
};
