var path = require('path');
var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [
      {
        loader: "babel-loader",
        // Skip any files outside of your project's `lib/` directory
        include: [
          path.resolve(__dirname, "lib/"),
        ],
        // Only run `.js` and `.jsx` files through Babel
        test: /\.jsx?$/,
        // Options to configure babel with
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react'],
        }
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  },
  entry: [
    './lib/src/index.jsx'
  ],
  watch: true,
  colors: true,
  progress: true,
  resolve: {
       extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ],
  externals: {
    'cheerio': 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
  }
}