import './dotenv';
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import router from './router/index';

const app = new Koa();

app.use(cors({ credentials: true }));
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080, () => {
  console.log('Server is running in port 8080');
});
