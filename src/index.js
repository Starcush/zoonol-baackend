import './dotenv';
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import router from '@/router/index';

const { SERVER_PORT } = process.env;

const app = new Koa();

app.use(cors({ credentials: true }));
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(SERVER_PORT, () => {
  console.log(`Server is running in port ${SERVER_PORT}`);
});
