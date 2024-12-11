module.exports = {
    apps: [{
        name: 'khaitun-donation',
        script: 'npm',
        args: 'start',
        env: {
            NODE_ENV: 'production',
            PORT: 3000
        }
    }]
}