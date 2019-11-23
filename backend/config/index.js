let config = {}

const baseConfig = {
  PORT: 3001
}

const developConfig = {
  SECRET_KEY: 'SECRET_KEY',
  EXPIRES_IN: '24h', 
}

const productionConfig = {
  SECRET_KEY: 'AOSDOAJSDOJSD',
  EXPIRES_IN: '12h',
}

// Capturar valores del env
// console.log(process.env.ENV) 

switch (process.env.ENV) {
  case 'dev':
  case 'development':
    console.log('estamos en dev')
    config = {
      ...baseConfig,
      ...developConfig
    }
    break;
  case 'prod':
  case 'production':
    console.log('estamos en prod')
    config = {
      ...baseConfig,
      ...productionConfig,
    }
    break;
  default:
    console.log('estamos en dev')
    config = {
      ...baseConfig,
      ...developConfig,
    }
    break;
}

module.exports = config;