import Joi from 'joi';
import Router from '@koa/router';
import StoreDomain from '@/domain/store';
import db from '@/database';
import { validateCtx } from '@/common/validator';

const storeRouter = new Router();
const storeDomain = new StoreDomain({ db });

storeRouter.get('/list', async (ctx) => {
  const stores = await storeDomain.findStoreList();
  ctx.body = {
    stores,
  };
});
storeRouter.get('/list-by-name', async (ctx) => {
  const { name } = validateCtx(
    {
      name: Joi.string().required(),
    },
    ctx
  );
  const stores = await storeDomain.getStoreByName({ name });
  ctx.body = {
    stores,
  };
});
storeRouter.post('/insert-store', async (ctx) => {
  console.log('ctx: ', ctx.request.body);
  // todo: 안쓰는 데이터 확인해서 지우는거 필요함
  const validation = validateCtx(
    {
      name: Joi.string().required(),
      needCage: Joi.boolean().allow(null).allow(0),
      zoonolPlace: Joi.boolean().allow(null).allow(0),
      offLeash: Joi.boolean().allow(null).allow(0),
      largeDogAvailable: Joi.boolean().allow(null).allow(0),
      lat: Joi.number().allow(null).allow(0),
      lng: Joi.number().allow(null).allow(0),
      categorySeq: Joi.number().integer().allow(null).allow(0),
      naverStoreId: Joi.number().allow(null).allow(0),
      homepage: Joi.string().allow(null).allow(''),
      phoneNumber: Joi.string().allow(null).allow(''),
      description: Joi.string().allow(null).allow(''),
      convenience: Joi.string().allow(null).allow(''),
      shortAddress: Joi.string().allow(null).allow(''),
      address: Joi.string().allow(null).allow(''),
      roadAddress: Joi.string().allow(null).allow(''),
      mapUrl: Joi.string().allow(null).allow(''),
      thumbnail: Joi.string().allow(null).allow(''),
      zoonolFeedUrl: Joi.string().allow(null).allow(''),
      additionalInfo: Joi.string().allow(null).allow(''),
    },
    ctx
  );

  const stores = await storeDomain.insertStore(validation);
  ctx.body = {
    stores,
  };
});
storeRouter.get('/delete-by-seq', async (ctx) => {
  const { seq } = validateCtx(
    {
      seq: Joi.number().integer(),
    },
    ctx
  );
  const stores = await storeDomain.deleteStoreBySeq({ seq });
  ctx.body = {
    stores,
  };
});
storeRouter.post('/update-store', async (ctx) => {
  const validation = validateCtx(
    {
      seq: Joi.number().integer().required(),
      name: Joi.string().required(),
      needCage: Joi.boolean().allow(null).allow(0),
      zoonolPlace: Joi.boolean().allow(null).allow(0),
      offLeash: Joi.boolean().allow(null).allow(0),
      largeDogAvailable: Joi.boolean().allow(null).allow(0),
      lat: Joi.number().allow(null).allow(0),
      lng: Joi.number().allow(null).allow(0),
      categorySeq: Joi.number().integer().allow(null).allow(0),
      naverStoreId: Joi.number().allow(null).allow(0),
      homepage: Joi.string().allow(null).allow(''),
      phoneNumber: Joi.string().allow(null).allow(''),
      description: Joi.string().allow(null).allow(''),
      convenience: Joi.string().allow(null).allow(''),
      shortAddress: Joi.string().allow(null).allow(''),
      address: Joi.string().allow(null).allow(''),
      roadAddress: Joi.string().allow(null).allow(''),
      mapUrl: Joi.string().allow(null).allow(''),
      thumbnail: Joi.string().allow(null).allow(''),
      zoonolFeedUrl: Joi.string().allow(null).allow(''),
      additionalInfo: Joi.string().allow(null).allow(''),

      // todo : infoUpdatedAt 삭제 예정
      // infoUpdatedAt: Joi.string().allow(null).allow(''),
    },
    ctx
  );
  const stores = await storeDomain.updateStore(validation);
  ctx.body = {
    stores,
  };
});

export default storeRouter;
