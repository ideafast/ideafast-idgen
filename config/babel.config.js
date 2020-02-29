module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
    ],
    plugins: [
        '@babel/plugin-transform-typescript',
        'add-module-exports'
    ].concat(process.env.NODE_ENV === 'test' ? [
        'rewire-ts'
    ] : [])
};