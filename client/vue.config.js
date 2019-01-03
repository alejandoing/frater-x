const webpack = require('webpack')
const path = require('path')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          stylus: {
            import: [
              path.resolve(__dirname, 'src/stylus/variables.styl'),
              path.resolve(__dirname, 'src/stylus/colors.styl'),
              path.resolve(__dirname, 'src/stylus/mixins.styl'),
              path.resolve(__dirname, 'src/stylus/media-queries.styl')
            ]
          }
        }
      })
    ]
  }
}
