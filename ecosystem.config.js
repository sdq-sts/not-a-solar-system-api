module.exports = {
  apps: [{
    name: 'nass',
    script: 'server.js',
    exec_mode: 'cluster',
    instances: 'max',
    autorestart: true,
    max_memory_restart: '200M',
    watch: false,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
