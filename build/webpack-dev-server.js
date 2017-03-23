'use strict';

const path = require('path');
const webpack = require('webpack');
const DevServer = require('webpack-dev-server');
const webpackBaseConfig = require('./webpack.base.config.js');
const webpackDevConfig = require('./webpack.dev.config');

const devConfig = Object.assign(webpackBaseConfig, webpackDevConfig);
devConfig.entry.app = 'webpack-dev-server/client?http://localhost:8080/';

// Create a compiler based on our dev config
const compiler = webpack(devConfig);


// Create a development server instance
const devServer = new DevServer(compiler);

module.exports = devServer;
