const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = withReactSvg({
  include: path.resolve(__dirname, 'src/assets/'),
  webpack(config, options) {
    config.module.rules.push(
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
                   limit: 10000,
                   name: 'static/media/[name].[hash:8].[ext]',
                 },
      },)
    return config
  }
})