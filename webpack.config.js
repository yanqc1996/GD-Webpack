const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 将css,js自动加入html中
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css打包文件添加hash，样式隔离 
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量
// 费时分析
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const config = {
    mode: 'development', // 模式
    entry: './src/index.js', // 打包入口地址
    output: {
        filename: 'bundle.js', // 输出文件名
        path: path.join(__dirname, 'dist'), // 输出文件目录
        publicPath: './'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'), // 静态文件目录
        compress: true, //是否启动压缩 gzip
        port: 8082, // 端口号
        open: true // 是否自动打开浏览器
    },
    // 资源加载模块
    module: {
        rules: [{
                test: /\.(le|c)ss$/i, //匹配所有的 sass/scss/css 文件
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader', 'postcss-loader', 'less-loader'
                ] // use：对应使用的loader名称
            },
            // {
            //     test: /\.(jpe?g|png|gif)$/i, // 匹配图片文件
            //     use: [
            //             {
            //             loader: 'file-loader', // 使用 file-loader
            //             options: {
            //                 name: '[name][hash:8].[ext]'
            //             }
            //            }
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 name: '[name][hash:8].[ext]',
            //                 文件小于 50k 会转换为 base64，大于则拷贝文件
            //                 limit: 50 * 1024
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 匹配字体文件
            //     use: [{
            //         loader: 'url-loader',
            //         options: {
            //             name: 'fonts/[name][hash:8].[ext]', // 体积大于 10KB 打包到 fonts 目录下 
            //             limit: 10 * 1024,
            //         }
            //     }]
            // },
            {
                test: /\.js$/i,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                    }
                }]
            },
            // webpack5资源模块
            {
                test: /\.(jpe?g|png|gif)$/i,
                type: 'asset',
                generator: {
                    // 输出文件位置以及文件名
                    // [ext] 自带 "." 这个与 url-loader 配置不同
                    filename: "[name][hash:8][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 50 * 1024 //超过50kb不转 base64
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                type: 'asset',
                generator: {
                    // 输出文件位置以及文件名
                    filename: "[name][hash:8][ext]"
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 超过100kb不转 base64
                    }
                }
            }
        ]
    },
    // 插件 plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({ // 添加插件
            filename: '[name].[hash:8].css'
        }),
        new CleanWebpackPlugin() // 引入插件
    ]
}
module.exports = (env, argv) => {
    console.log('argv.mode=', argv.mode) // 打印 mode(模式) 值
    // 这里可以通过不同的模式修改 config 配置
    return smp.wrap(config)
}