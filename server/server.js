const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const DynamoDB = require("@aws-sdk/client-dynamodb");
const ddbClient = require("./ddb.js")

const router = require('./router')

const webpackConfig = require('../webpack.config');

console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')
const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8080;


// Configuration
// ================================================================================================

// Set up DynamoDB


const run = async () => {
  try {
    const data = await ddbClient.send(new DynamoDB.ListTablesCommand({}));
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
run();


const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());

// API routes
app.use('/', router)
if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'), null, function(err) {
      if (err) {
        next(err)
      } else {
        res.end();
      }
    })
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;
