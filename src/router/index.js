import Router from '@koa/router';
import storeRouter from '@/router/store';

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'Root';
});

router.use('/store', storeRouter.routes());

export default router;
