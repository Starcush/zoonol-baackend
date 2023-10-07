import Joi from 'joi';
import { toRowsOnBuilder, toInsertKeyOnBuilder, toSnakeCase } from '@/common/util';
import { DatabaseError } from '@/common/error';
import { validateParams } from '@/common/validator';

export default class StoreQuery {
  constructor({ db }) {
    this.db = db;
  }

  async findStoreList() {
    /**
     * note: category 1,2,7  은 카페와 식당, 호프
     * 서점도 추가할 것
     */

    const query = this.db
      .select(
        'seq',
        'zoonol_place',
        'naver_store_id',
        'name',
        'need_cage',
        'phone_number',
        'homepage',
        'description',
        'convenience',
        'short_address',
        'address',
        'road_address',
        'lat',
        'lng',
        'map_url',
        'category_seq',
        // 'info_updated_at',
        'off_leash',
        'large_dog_available',
        'thumbnail',
        'additional_info',
        'zoonol_feed_url'
      )
      .from('n_store')
      .whereIn('category_seq', [1, 2, 7]);

    try {
      return toRowsOnBuilder(await query);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async findStoreListByBound() {}

  async getStoreByName(params) {
    const { name } = validateParams(
      {
        name: Joi.string().required(),
      },
      params
    );
    const query = this.db
      .select(
        'seq',
        'zoonol_place',
        'naver_store_id',
        'name',
        'need_cage',
        'phone_number',
        'homepage',
        'description',
        'convenience',
        'short_address',
        'address',
        'road_address',
        'lat',
        'lng',
        'map_url',
        'category_seq',
        // 'info_updated_at',
        'off_leash',
        'large_dog_available',
        'thumbnail',
        'additional_info',
        'zoonol_feed_url'
      )
      .from('n_store')
      .where('name', 'like', `%${name}%`);

    try {
      return toRowsOnBuilder(await query);
    } catch (error) {
      throw new DatabaseError(error);
    }
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

    const query = this.db.insert(toSnakeCase(validation)).into('n_store');
    try {
      return toInsertKeyOnBuilder(await query);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async deleteStoreBySeq(params) {
    const { seq } = validateParams(
      {
        seq: Joi.number().integer(),
      },
      params
    );
    const query = this.db.del().from('n_store').where('seq', seq);
    try {
      return toInsertKeyOnBuilder(await query);
    } catch (error) {
      throw new DatabaseError(error);
    }
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
      },
      params
    );
    const query = this.db
      .update(toSnakeCase(validation))
      .from('n_store')
      .where('seq', validation.seq);
    try {
      return toInsertKeyOnBuilder(await query);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
