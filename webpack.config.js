module.exports = {
  mode: 'production',
  entry: `${__dirname}/client/index.jsx`,
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
        include: `${__dirname}/client`,
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
        test: /\.(woff|woff2|otf)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
      },
      {
        test: /\.svg/,
        exclude: /node_modules/,
        type: 'asset/inline',
      }
    ],
  }
};