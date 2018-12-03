var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({
      // browsers: ['last 2 versions']
      browsers: ['> 1%', 'last 5 versions', 'not ie < 9']
    })
  ],
  transformToRequire: {
    img: ['src', 'srcset']
  }
}
