const { merge } = require('webpack-merge');
const { getWebpackConfig } = require('@corva/ui/cjs');
const path = require('path');

module.exports = (env, argv) => {
  return merge(
    getWebpackConfig(env, argv),
    // NOTE: Custom webpack 4 plugins and module rules can be provided here
    {
      resolve: { alias: { react: path.resolve('./node_modules/react') } },
    }
  );
};
