let path = require('path'),
    webpack = require('webpack'),
    ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'),

    // 是否生产环境
    isProduction = process.env.NODE_ENV === 'production',

    // 对import 引入css（如第三方css）的提取
    cssExtractor = new ExtractTextWebpackPlugin({
        // 开发环境下不需要提取，禁用
        disable: !isProduction,
        filename: '../css/[name]_vendor.css?[contenthash:8]',
        allChunks: true
    }),
    // 对import 引入sass（如自己写的sass）的提取
    sassExtractor = new ExtractTextWebpackPlugin({
        // 开发环境下不需要提取，禁用
        disable: !isProduction,
        filename: '../css/[name].css?[contenthash:8]',
        allChunks: true
    });

console.log('NODE_ENV', '[' + process.env.NODE_ENV + ']');


/**
 * 基础公共Webpack打包配置
 * @type {Object}
 */
module.exports = {
    // 上下文位置
    context: path.resolve(__dirname, 'static'),

    // 启用sourceMap
    devtool: 'cheap-module-source-map',

    // 文件入口配置
    entry: {
        home: './src/js/home',
        detail: './src/js/detail',
        // 提取jquery入公共文件
        common: ['jquery']
    },

    // 文件输出配置
    output: {
        // 输出所在目录
        path: path.resolve(__dirname, 'static/dist/js'),
        // 开发环境使用热更新，方便编译，可以直接不用hash
        filename: '[name].js' + (isProduction ? '?[chunkhash:8]' : ''),
    },

    // 处理相关文件的检索及引用方式
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: ['node_modules'],
        alias: {

        }
    },

    // 模块的处理配置，匹配规则对应文件，使用相应loader配置成可识别的模块
    module: {
        rules: [{
            test: /\.css$/,
            // 提取CSS文件
            use: cssExtractor.extract({
                // 如果配置成不提取，则此类文件使用style-loader插入到<head>标签中
                fallback: 'style-loader',
                use: [{
                        loader: 'css-loader',
                        options: {
                            // url: false,
                            minimize: true
                        }
                    },
                    // 'postcss-loader'
                ]
            })
        }, {
            test: /\.scss$/,
            // 编译Sass文件 提取CSS文件
            use: sassExtractor.extract({
                // 如果配置成不提取，则此类文件使用style-loader插入到<head>标签中
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    // 'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            outputStyle: 'compressed'
                        }
                    }
                ]
            })
        }, {
            test: /\.jsx?$/,
            // 编译js或jsx文件，使用babel-loader转换es6为es5
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {

                }
            }]
        }, {
            test: require.resolve('jquery'),
            // 将jQuery插件变量导出至全局，提供外部引用jQuery插件使用
            use: [{
                loader: 'expose-loader',
                options: '$'
            }, {
                loader: 'expose-loader',
                options: 'jQuery'
            }]
        }, {
            test: /\.html$/,
            // 处理html源文件，包括html中图片路径加载、监听html文件改变重新编译等
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true,
                    removeComments: false,
                    collapseWhitespace: false
                }
            }]
        }]
    },

    // 插件配置
    plugins: [
        // 提取公共模块文件
        new webpack.optimize.CommonsChunkPlugin({
            chunks: ['home', 'detail'],
            // 开发环境下需要使用热更新替换，而此时common用chunkhash会出错，可以直接不用hash
            filename: '[name].js' + (isProduction ? '?[chunkhash:8]' : ''),
            name: 'common'
        }),
        // 定义变量，此处定义NODE_ENV环境变量，提供给生成的模块内部使用
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        // 暴露jQuery对象至全局中，提供相应插件调用（此处不用，上方改为使用expose-loader导出）
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        // }),
        // 从模块中提取CSS文件的配置
        cssExtractor,
        sassExtractor
    ]
};
