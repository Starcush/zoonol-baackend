import Router from "@koa/router";
import StoreDomain from "@/domain/store";
import db from "@/database";

const storeRouter = new Router();
const storeDomain = new StoreDomain({ db });

storeRouter.get("/list", async (ctx) => {
  const stores = await storeDomain.findStoreList();
  ctx.body = {
    stores,
  };
});
storeRouter.get("/list-by-name", async (ctx) => {
  const params = ctx.request.query;
  const stores = await storeDomain.getStoreByName(params);
  ctx.body = {
    stores,
  };
});
storeRouter.post("/insert-store", async (ctx) => {
  const params = ctx.request.body.params;
  const stores = await storeDomain.insertStore(params);
  ctx.body = {
    stores,
  };
});
storeRouter.get("/delete-by-seq", async (ctx) => {
  const params = ctx.request.query;
  const stores = await storeDomain.deleteStoreBySeq(params);
  ctx.body = {
    stores,
  };
});
storeRouter.post("/update-store", async (ctx) => {
  const params = ctx.request.body.params;
  const stores = await storeDomain.updateStore(params);
  ctx.body = {
    stores,
  };
});

export default storeRouter;
