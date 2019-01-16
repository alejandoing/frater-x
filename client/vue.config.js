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
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src'),
        assets: path.resolve(__dirname, 'src/assets'),
        components: path.resolve(__dirname, 'src/components'),
        mixins: path.resolve(__dirname, 'src/mixins'),
        plugins: path.resolve(__dirname, 'src/plugins'),
        router: path.resolve(__dirname, 'src/router'),
        store: path.resolve(__dirname, 'src/store'),
        stylus: path.resolve(__dirname, 'src/stylus'),
        views: path.resolve(__dirname, 'src/views')
      },
      extensions: ['.js', '.vue']
    },
  }
}
