module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel']
      }
    },
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@storage': './src/storage',
            '@theme': './src/theme',
            '@utils': './src/utils',
            '@services': './src/services',
            '@contexts': './src/contexts',
            '@routes': './src/routes',
            '@hooks': './src/hooks',
            '@types': './src/types',
            '@config': './src/config',
            '@store': './src/store',
            '@navigation': './src/navigation'
          }
        }
      ]
    ]
  };
};
