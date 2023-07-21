import { existsSync } from 'fs';
import { resolve } from 'path';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envs = [`.env.${process.env.NODE_ENV}`, '.env'];

envs.map((file) => {
  const filePath = resolve(process.cwd(), file);
  console.log(filePath);
  if (existsSync(filePath)) {
    dotenvExpand.expand(config({ path: filePath }));
  }
});
