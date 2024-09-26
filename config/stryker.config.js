module.exports = {
    mutate: [
        'src/**/*.ts', '!src/**/*.spec.ts'
    ],
    ignorePatterns: ['{coverage,dist,reports}'],
    disableTypeChecks: '{coverage,dist,reports,config}/**/*.*',
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