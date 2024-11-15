module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            src: './src',
            components: './src/components',
            onboarding: './src/onboarding',
            stores: './src/stores',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        { envName: 'APP_ENV', moduleName: '@env', path: '.env' },
      ],
    ],
  }
}
