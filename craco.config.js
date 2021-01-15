const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#08979c', '@layout-header-background': '#1f1f1f' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};