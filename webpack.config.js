const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'client/src');
const DIST_DIR = path.resolve(__dirname, 'client/dist');

module.exports = {
  mode: 'production',
  // entry: `${SRC_DIR}/index.jsx`,
  entry: path.resolve(__dirname, '/client/src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
    // path: path.join(__dirname, '/client/dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        // include: path.resolve(__dirname, '/client/src'),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|otf)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
      },
    ],
  }
};