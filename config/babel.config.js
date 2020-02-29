module.exports = {
    presets: [
        '@babel/preset-env'
    ],
    plugins: [
        'add-module-exports'
    ].concat(process.env.NODE_ENV === 'test' ? [
        'rewire'
    ] : [])
};