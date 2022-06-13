import { MidwayConfig } from '@midwayjs/core';


export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1655092246311_6702',
  koa: {
    port: 7001,
  },
  orm: {
    type: 'sqlite',
    database: ':memory',
    dropSchema: true,
    entities: [
      'src/entity/*.ts',
    ],
    synchronize: true,
    logging: false,
  },
  passport: {
    session: false,
  },
  jwt: {
    secret: 'this is a secret',
    expiresIn: '1h',
  },
} as MidwayConfig;
