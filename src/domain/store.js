import Joi from 'joi';
import StoreQuery from '@/query/store';
import { validateParams } from '@/common/validator';

export default class StoreDomain {
  constructor({ db }) {
    this.storeQuery = new StoreQuery({ db });
  }

  async findStoreList() {
    return await this.storeQuery.findStoreList();
  }

  async findStoreListByBound() {}

  async getStoreByName(params) {
    const { name } = validateParams(
      {
        name: Joi.string().required(),
      },
      params
    );
    return await this.storeQuery.getStoreByName({ name });
  }
  async insertStore(params) {
    const validation = validateParams(
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
      params
    );
    return await this.storeQuery.insertStore(validation);
  }
  async deleteStoreBySeq(params) {
    const { seq } = validateParams(
      {
        seq: Joi.number().integer(),
      },
      params
    );
    return await this.storeQuery.deleteStoreBySeq({ seq });
  }
  async updateStore(params) {
    const validation = validateParams(
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
      params
    );
    return await this.storeQuery.updateStore(validation);
  }
}
