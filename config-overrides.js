const { override, addLessLoader, addPostcssPlugins } = require('customize-cra');
const rewireBabelLoader = require('react-app-rewire-babel-loader');

module.exports = function myOverride(config, env) {
  const updatedConfig = rewireBabelLoader.include(
    config,
  );
  const newConf = override(
    addLessLoader({
      strictMath: false,
      noIeCompat: true,
      localIdentName: '[local]--[hash:base64:5]',
      javascriptEnabled: true,
    }),
    addPostcssPlugins([])
  );
  return newConf(updatedConfig, env);
};