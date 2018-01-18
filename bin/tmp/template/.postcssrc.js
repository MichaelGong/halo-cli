// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": { browsers: ['> 1%', 'last 10 versions', 'not ie <= 8'] },
    "postcss-px2rem": { remUnit: 75 }
  }
}
