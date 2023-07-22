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
storeRouter.get('/getStore', async (ctx) => {
  console.log("SHI backend router ctx.request.query :: ", ctx.request.query);
  console.log("SHI backend router ctx.request.query.name :: ", ctx.request.query.name);
  const params = ctx.request.query;
  const stores = await storeDomain.getStore(params);
  ctx.body = {
    stores
  };
});

export default storeRouter;
