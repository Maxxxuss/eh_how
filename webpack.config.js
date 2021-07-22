const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const { web } = require('webpack');

// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const CSSExtract = new ExtractTextPlugin('styles.css')

module.exports = (env) =>{ 
  const isProduction = env ==='production'
  return{

    entry: ['babel-polyfill', './src/index.js'],
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
 
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }
    , 
    {
     test: /\.s[ac]ss$/i,
     use: [
       'style-loader',
       'css-loader',
       'sass-loader'
     ]
   }]
//  },
//   // plugins: [   ggf anschauen min~ 1:50
//   //   CSSExtract
//   // ],

//   devtool: isProduction ? 'source-map' :'cheap-module-eval-source-map', 
//   devtool: 'cheap-module-eval-source-map', // zeigt fehler-code im QuellCode an 
//   devServer: {
//     contentBase: path.join(__dirname, './dist'),
//     historyApiFallback: true,
//     writeToDisk: true, 
}, 
target: "web", 

 devServer: {
  contentBase: path.join(__dirname, 'public'),
  historyApiFallback: true,
  publicPath: '/dist/', 


},


// plugins: [
//   new HtmlWebPackPlugin({
//      template: path.resolve( __dirname, 'public/index.html' ),
//      filename: 'index.html'
//   })
// ]  
}
}
