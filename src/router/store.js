import Joi from 'joi';
import Router from '@koa/router';
import StoreDomain from '@/domain/store';
import db from '@/database';
import { validateCtx } from '@/common/validator';
import axios from 'axios';

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
  // todo: 안쓰는 데이터 확인해서 지우는거 필요함
  const validation = validateCtx(
    {
      name: Joi.string().required(),
      needCage: Joi.number().integer().allow(null).allow(0),
      zoonolPlace: Joi.number().integer().allow(null).allow(0),
      offLeash: Joi.number().integer().allow(null).allow(0),
      largeDogAvailable: Joi.number().integer().allow(null).allow(0),
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
      needCage: Joi.number().integer().allow(null).allow(0),
      zoonolPlace: Joi.number().integer().allow(null).allow(0),
      offLeash: Joi.number().integer().allow(null).allow(0),
      largeDogAvailable: Joi.number().integer().allow(null).allow(0),
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
storeRouter.get('/address-vertification', async (ctx) => {
  const stores = await storeDomain.findStoreList();

  const alivedStores = [];
  const removedStores = [];

  const Naver_Developer_Client_Id = '1jQd_VSHZdJNoy0mFIrf';
  const Naver_Developer_Client_Secret_Id = '1BwSO2Ou6A';
  const Naver_Search_Local_URL = 'https://openapi.naver.com/v1/search/local.json';

  // 너무 빠른 request 요청을 방지하기 위한 딜레이 타이머
  const delayTimer = ms => new Promise(res => setTimeout(res, ms))

  // for(let i=0; i<stores.length; i++){
  for(let i=0; i<100; i++){
    console.log("SHI ::::: ===================================");
    console.log("SHI :::: Index ::: ", i);
    await delayTimer(1000);
    
    let store = stores[i];
    let storeName = store.name;
    let storeAddress = store.address;
    let storeRoadAddress = store.roadAddress;
    /**
     * @breif data 형태
     *  {
            "title": "<b>닭향</b>",
            "link": "",
            "category": "한식>백숙,삼계탕",
            "description": "",
            "telephone": "",
            "address": "경기도 김포시 대곶면 대벽리 537-4",
            "roadAddress": "경기도 김포시 대곶면 수남로21번길 24-13",
            "mapx": "1265887897",
            "mapy": "376281206"
        }
     */
    let { data } = await axios.get(
      Naver_Search_Local_URL,
      {
        params: {
          query: storeName,
          display: 5
        },
        headers: {
          'X-Naver-Client-Id': Naver_Developer_Client_Id,
          'X-Naver-Client-Secret': Naver_Developer_Client_Secret_Id
        }
      }
    );
    
    let naverStores = data.items;
    if(naverStores.length > 0){
      let naverStore = naverStores[0];
      let naverStoreAddress = naverStore.address;
      let naverStoreRoadAddress = naverStore.roadAddress;
  
      // if(storeAddress == naverStoreAddress && storeRoadAddress == naverStoreRoadAddress){
      if(storeAddress == naverStoreAddress || storeRoadAddress == naverStoreRoadAddress){
        // 주소값은 다르지만 도로명 주소만 같은 경우가 있어 && 에서 || 로 수정.
        // 어떤 주소값이든 동일하면 남아있는 스토어로 테스트
        alivedStores.push(store);
      }
      else{
        // console.log("SHI :::: ============================================================================== ");
        // console.log("SHI storeName :::: ", storeName);
        // console.log("SHI storeAddress :::: ", storeAddress);
        // console.log("SHI naverStoreAddress :::: ", naverStoreAddress);
        // console.log("SHI storeRoadAddress :::: ", storeRoadAddress);
        // console.log("SHI naverStoreRoadAddress :::: ", naverStoreRoadAddress);
        // console.log("SHI :::: ============================================================================== ");
        removedStores.push(store);
      }
    }
    else{
      // console.log("SHI :::: ******************************************************************************** ");
      // console.log("SHI none data from naver open api :::: ");
      // console.log("SHI storeName :::: ", storeName);
      // console.log("SHI :::: ******************************************************************************** ");
      removedStores.push(store);
    }
  }
  
  ctx.body = {
    stores,
    alivedStores,
    removedStores
  };
});

export default storeRouter;
