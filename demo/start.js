/**
 * Created by Administrator on 2017/5/18.
 */

var webpackDevServer = require('webpack-dev-server');
var webpack = require('webpack')
var path = require('path')

var config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
    hot: true,
    inline: true,
    disableHostCheck: true,
    publicPath: config.output.publicPath
});
server.listen(8080);
