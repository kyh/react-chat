 var webpack = require('webpack');
 var path = require('path');
 var node_modules_dir = path.join(__dirname, 'node_modules');

 var config = {
   addVendor: function (name, path) {
     this.resolve.alias[name] = path;
     this.module.noParse.push(path);
   },
   context: __dirname,
   entry: {
     app: ['webpack/hot/dev-server', './client/app/app.js']
   },
   output: {
     publicPath: '/',
     path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? './dist/' : './build'),
     filename: 'bundle.js'
   },
   resolve: {
     alias: {}
   },
   module: {
    noParse: [],
    loaders: [
      { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: [node_modules_dir] },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(woff|png)$/, loader: 'url-loader?limit=100000'}
    ]
   },
   plugins: [
     new webpack.HotModuleReplacementPlugin(),
     new webpack.NoErrorsPlugin(),
     new webpack.optimize.CommonsChunkPlugin('app', null, false)
   ]
 };

 module.exports = config;
