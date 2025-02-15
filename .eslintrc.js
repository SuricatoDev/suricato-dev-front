// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  ignorePatterns: ['/dist/*', '@types/*'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
  },
};
