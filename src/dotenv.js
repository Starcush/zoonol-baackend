import dotenv from 'dotenv';
import path from 'path';

const { NODE_ENV } = process.env;
const environment = !NODE_ENV ? 'local' : NODE_ENV;
dotenv.config({ path: path.resolve(process.cwd(), `.env.${environment}`) });
