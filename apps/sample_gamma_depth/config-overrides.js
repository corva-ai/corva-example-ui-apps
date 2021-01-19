const { merge } = require('webpack-merge');
const { getWebpackConfig } = require('@corva/ui/cjs');

module.exports = merge(
  getWebpackConfig(),
  // NOTE: Custom webpack 4 plugins and module rules can be provided here
  {}
);
