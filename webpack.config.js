const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env) => {
  const devMode = env.NODE_ENV !== 'production';
  return {
    mode: devMode ? 'development' : 'production',
    entry: './src/index.tsx',
    output: {
      path: `${__dirname}/dist`,
      filename: 'build.[hash].js',
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: { autoprefixer: {} },
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/, /build/],
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'BROCCOLI & CO.',
        template: 'src/assets/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.[contenthash].css',
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 3000,
    },
  };
};
