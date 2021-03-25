module.exports = {
    mutate: [
        '{src,lib}/**/*.[jt]s?(x)',
        '!{src,lib}/**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    packageManager: 'yarn',
    reporters: ['html', 'clear-text', 'progress', 'dashboard'],
    testRunner: 'jest',
    coverageAnalysis: 'off',
    concurrency: 4,
    timeoutMS: 30000,
    jest: {
        enableFindRelatedTests: false
    },
    dashboard: {
        reportType: 'full'
    }
};