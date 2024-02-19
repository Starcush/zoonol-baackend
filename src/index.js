import './dotenv';
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import schedule from 'node-schedule';
import moment from 'moment-timezone';

import router from '@/router/index';
import weeklyAssetAllocation from '@/asset_allocations';

// 서울 시간대 기준으로 다음 일요일 오전 9시의 시간을 계산
const getNextSundayAt9AM = () => {
  return moment.tz('Asia/Seoul').startOf('week').add(1, 'weeks').hour(9).minute(0).second(0);
};

const seoulTimeForNextSundayAt9AM = getNextSundayAt9AM();
const utcTimeForNextSundayAt9AM = seoulTimeForNextSundayAt9AM.clone().tz('UTC');

// node-schedule에 UTC 시간 기준으로 스케줄 설정
schedule.scheduleJob(
  {
    hour: utcTimeForNextSundayAt9AM.hour(),
    minute: utcTimeForNextSundayAt9AM.minute(),
    dayOfWeek: utcTimeForNextSundayAt9AM.day(),
  },
  function () {
    console.log('스케줄링 작업이 서울 시간 기준으로 일요일 오전 9시에 실행됩니다.');
    weeklyAssetAllocation().catch((error) => console.log(error));
  }
);

const { SERVER_PORT } = process.env;

const app = new Koa();

app.use(cors({ credentials: true }));
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(SERVER_PORT, () => {
  console.log(`Server is running in port ${SERVER_PORT}`);
});
