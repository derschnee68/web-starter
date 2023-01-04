const { resolve } = require('node:path');
const { sync: glob } = require('fast-glob');

/**
 * @param {import('webpack').Configuration} config
 */
module.exports = function (config) {
  config.entry = glob(['./src/**/*.ts'], { dot: true }).reduce(
    (entries, file) => {
      const name = file.replace(/^\.\/src\//, '').replace(/\.ts$/, '');
      entries[name] = file;
      return entries;
    },
    {},
  );

  config.output = {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'commonjs',
    },
  };

  config.devtool = process.env?.NODE_ENV?.startsWith('dev')
    ? 'inline-source-map'
    : 'source-map';
  config.module.rules.push(
    {
      test: /.txt$/,
      use: 'raw-loader',
    },
    {
      test: /.sh$/,
      use: 'raw-loader',
    },
    {
      test: /\.mjml$/,
      use: 'mjml-with-images-loader',
    },
  );

  return config;
};
