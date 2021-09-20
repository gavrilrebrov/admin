module.exports = {
    apps: [
        {
            name: 'admin',
            script: 'npm',
            mode: 'cluster',
            args: 'start',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            }
        }
    ]
}
