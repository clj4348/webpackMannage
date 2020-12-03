const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 获取html-webpack-plugin参数的方法
const getHtmlConfig = (name, title) => ({
  template : `./src/view/${name}.html`,
  filename :  `${name}.html`,
  title : title,
  inject : true,
  hash: true, //防止缓存 
  inject: true,
  chunks : ['common', name]
})
const config = {
  entry: {
    'index' : './src/view/index/index.js',
    'about' : './src/view/about/index.js'
  },
  //出口
  output: {
    path: path.resolve(__dirname,'../dist'),
    filename: 'js/[name][hash:5].js',
    publicPath: '/'
  },
  mode : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader:'babel-loader',
            options: {
              cacheDirectory: true, //缓存
            }
          }
        ]
      }
    ],
  },
	devServer: {
		port: 9000,
		inline: true,
		hot: true,
		contentBase: path.join(__dirname, './', 'dist'),
		host: 'localhost',//主机地址
		proxy:  {
			'/api':{
				target: 'https:// www.baidu.com', 
			}
		}
	},
  plugins:[
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('about', '关于')),
  ]
}
module.exports = config;