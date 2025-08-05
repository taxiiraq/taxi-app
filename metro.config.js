const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// إعدادات إضافية لتحسين الاستقرار
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// إعدادات إضافية لتحسين الأداء
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx'];
config.resolver.assetExts = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

module.exports = config; 