module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@data': './src/data',
          '@domain': './src/domain',
          '@infra': './src/infra',
          '@main': './src/main',
          '@presentation': './src/presentation',
          '@validation': './src/validation',
          '@utils': './src/utils',
          '@test': './test',
        },
      },
    ],
    '@babel/plugin-proposal-class-properties',
  ],
}
