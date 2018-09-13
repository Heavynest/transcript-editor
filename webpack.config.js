var path = require('path');
var webpack = require('webpack'); // download from npm
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

//create applications
module.exports = {
  entry:path.resolve(__dirname,'app/index.js'),
  output:{
    filename:'bundle.js'
  },
  resolve:{
    extensions:['*','es6.js','.js','.jsx']
  },
  module:{
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.less$/, exclude: /node_modules/, use: 'style!css!postcss!less' },
      { test: /\.css$/, exclude: /node_modules/, use: 'css-loader' },
      { test:/\.(png|gif|jpg|jpeg|bmp)$/i, use:'url-loader?limit=5000' },
      { test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, use:'url-loader?limit=5000'},
      { test: /\.es6\.js$/, loader: "babel-loader",query: {presets: ['es2015']}}
    ]
  },
  plugins:[
    //bind bundle.js to html, do not have to
    new HtmlWebpackPlugin(
      {template:__dirname + '/app/index.tmpl.html'}
    ),
    // regenerate every update
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin(
      {url:'http://localhost:8080'}
    )
  ],
    devServer:{
      historyApiFallback: false,
      inline:true,
      hot:true
    }

}
