import Router from '@koa/router';
import StoreDomain from '@/domain/store';
import db from '@/database';

const storeRouter = new Router();
const storeDomain = new StoreDomain({ db });

storeRouter.get('/list', async (ctx) => {
  const stores = await storeDomain.findStoreList();
  ctx.body = {
    stores,
  };
});

export default storeRouter;
