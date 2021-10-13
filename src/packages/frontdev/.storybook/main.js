const path = require('path');

module.exports = {
  "stories": [
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    const rootPath = path.resolve(__dirname, '../');
    config.resolve.alias['@'] = rootPath;

    config.module.rules.push({
        test: /\.scss$/,
        sideEffects: true,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      });
    
    return config;
  }
}