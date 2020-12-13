const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const webpack = require('webpack')

const startServer = () => new Promise((resolve, reject) => {
  const proc = spawn(path.resolve(process.cwd(), 'node_modules', '.bin', 'cuser'), ['serve', '--host', '0.0.0.0', '--verbose', '--cors'], {
    stdio: [0, 'pipe', 2]
  });
  proc.stdout.on('data', (data) => {
    console.log(data.toString());
    const [,cuserId] = /p2p\/([a-z0-9]+)/i.exec(data) || []
    if (cuserId) {
      resolve(cuserId);
    }
  });

  proc.on('error', reject);
});

module.exports = () => startServer().then((cuserId) => ({
  // context: __dirname + "/src",
  mode: 'development',
  entry: "./index",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: { "stream": require.resolve("stream-browserify") }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ]
  },
  // devServer: {
  //   https: true,
  //   before: function(app) {
  //     app.get('/ssl', function(_, res) {
  //       res.set('Content-Type', 'text/plain'),
  //       res.set('Content-Disposition', 'attachment; filename="cuser.crt"');
  //       res.send(fs.readFileSync('cuser.crt'));
  //     });
  //   },
  //   key: fs.readFileSync('cuser.key'),
  //   cert: fs.readFileSync('cuser.crt'),
  //   proxy: {
  //     '/p2p': {
  //       target: 'ws://localhost:4004',
  //       ws: true
  //     },
  //   },
  // },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
     }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: ['process'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.CUSER_ID': JSON.stringify(cuserId),
    })
  ]
}))
