module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      // إضافة دعم للـ async/await
      '@babel/plugin-transform-async-to-generator',
    ],
    env: {
      production: {
        plugins: [
          'transform-remove-console',
        ],
      },
    },
  };
}; 