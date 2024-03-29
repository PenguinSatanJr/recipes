import { DataSourceOptions } from 'typeorm';
import Recipe from './entity/recipe';
import migrations from './migrations';

type Config = {
  db: DataSourceOptions;
};

const config: Config = {
  db: {
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    entities: [Recipe],
    port: process.env.TYPEORM_PORT
      ? parseInt(process.env.TYPEORM_PORT, 10)
      : 5432,
    username: process.env.TYPEORM_USERNAME || 'penguin',
    password: process.env.TYPEORM_PASSWORD || 'penguin',
    database: process.env.TYPEORM_DATABASE || 'recipes',
    logging: false,
    migrations,
  },
};

export default config;
