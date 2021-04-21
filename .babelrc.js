const isProd = process.env.NODE_ENV === 'production'
const plugins = isProd
  ? [['@babel/plugin-transform-runtime']]
  : [
    ['@babel/plugin-transform-runtime'],
    ['transform-remove-console']
  ]

module.exports = {
  presets: ['@babel/preset-env'],
  plugins
}
