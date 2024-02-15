import './dotenv';
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import cron from 'node-cron';
import router from '@/router/index';
import weeklyAssetAllocation from './asset_allocations';

cron.schedule('0 9 * * 0', () => {
  console.log('스케줄링 작업이 실행됩니다.');
  weeklyAssetAllocation().catch((error) => console.log(error));
});

const { SERVER_PORT } = process.env;

const app = new Koa();

app.use(cors({ credentials: true }));
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(SERVER_PORT, () => {
  console.log(`Server is running in port ${SERVER_PORT}`);
});
