import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  parseInt8: true,
  type: 'postgres',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: process.env.POSTGRES_SYNC === 'true',
  logging: process.env.POSTGRES_LOGGING === 'true',
  entities: [],
};
