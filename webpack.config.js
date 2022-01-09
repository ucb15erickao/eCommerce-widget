const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'client/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: path.resolve(__dirname, 'client'),
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