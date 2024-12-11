module.exports = {
    apps: [{
        name: 'khaitun-donation',
        script: 'npm',
        args: 'run serve',
        env: {
            NODE_ENV: 'production',
            HTTPS_PORT: 3000,
            PORT: 3001
        }
    }]
}
