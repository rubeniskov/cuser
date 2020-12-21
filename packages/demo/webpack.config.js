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
      resolve([proc, cuserId]);
    }
  });

  proc.on('error', reject);
});

module.exports = () => ({
  // context: __dirname + "/src",
  mode: 'development',
  entry: "./index",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "path": require.resolve("path-browserify")
    }
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
  devServer: {
    // https: true,
    // key: fs.readFileSync('cuser.key'),
    // cert: fs.readFileSync('cuser.crt'),
    before: function(app) {
      app.post('/cuser', function(_, res) {
        if (this._cuser) {
          this._cuser.on('close', () => {
            res.json({ status: 'exited' });
            this._cuser = null;
          });
          this._cuser.kill('SIGINT');
        } else {
          startServer().then(([proc, cuserId]) => {
            this._cuser = proc
            res.json({
              status: 'running',
              cuserId
            });
          });
        }
      });
    },
    proxy: {
      '/p2p': {
        target: 'ws://127.0.0.1:4004',
        ws: true
      },
      '/api': {
        target: 'http://127.0.0.1:3000',
      },
    },
  },
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
      // 'process.env.CUSER_ID': JSON.stringify(cuserId),
    })
  ]
})
