module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    ['@babel/plugin-transform-runtime']
  ],
  env: {
    production: {
      plugins: [
        'transform-remove-console'
      ]
    }
  }
}
