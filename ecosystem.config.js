module.exports = {
  apps : [{
    name: 'blog',
    script: 'server.js',
    watch: '.',
    ignore_watch: ["node_modules"],
    env: {
      NODE_ENV: 'production',
    }
  }],
};
