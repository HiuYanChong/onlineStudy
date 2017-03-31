const webpack = require('webpack');
const buildEnv = process.env.BUILD_ENV || 'development';
const webpackBaseConfig = require('./webpack.base.config');
const webpackDevConfig = require('./webpack.dev.config');
const webpackProdConfig = require('./webpack.prod.config');

let webpackConfig;
if (buildEnv === 'development') {
  webpackConfig = Object.assign(webpackBaseConfig, webpackDevConfig);
} else if (buildEnv === 'production') {
  webpackConfig = Object.assign(webpackBaseConfig, webpackProdConfig);
} else {
  webpackConfig = webpackBaseConfig;
}

const compiler = webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('>>>>>Failed to run webpack');
    console.error(err || stats.toString());
    throw err || stats.toString();
  }
  process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
    }) + '\n');
});

