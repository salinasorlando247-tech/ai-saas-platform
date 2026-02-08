module.exports = {
  apps: [
    {
      name: 'forgeai-api',
      script: 'server.js',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production'
      },
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    },
    {
      name: 'forgeai-ai-worker',
      script: 'queues/ai.worker.js',
      instances: 1,
      autorestart: true,
      watch: false
    },
    {
      name: 'forgeai-post-worker',
      script: 'queues/autoPost.worker.js',
      instances: 1,
      autorestart: true,
      watch: false
    },
    {
      name: 'forgeai-scheduler',
      script: 'jobs/scheduler.js',
      instances: 1,
      autorestart: true,
      watch: false
    }
  ]
}
