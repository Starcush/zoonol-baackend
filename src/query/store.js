import { toRowsOnBuilder, toInsertKeyOnBuilder } from '@/common/util';
import { DatabaseError } from '@/common/error';

export default class StoreQuery {
  constructor({ db }) {
    this.db = db;
  }

  async findStoreList() {
    /**
     * note: category 1,2,7  은 카페와 식당, 호프
     */

    const query = this.db
      .select(
        'seq',
        'zoonol_place',
        'naver_store_id',
        'name',
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
        'info_updated_at',
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
    const whereName = params.name;
    const query = this.db
      .select(
        'seq',
        'zoonol_place',
        'naver_store_id',
        'name',
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
        'info_updated_at',
        'off_leash',
        'large_dog_available',
        'thumbnail',
        'additional_info',
        'zoonol_feed_url'
      )
      .from('n_store')
      .whereLike('name', `%${whereName}%`);

    try {
      return toRowsOnBuilder(await query);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async insertStore(params) {
    const storeInfo = params.storeInfo;
    const query = this.db
    .insert(
      [
        {
          zoonol_place: storeInfo.place,
          naver_store_id: storeInfo.storeId,
          name: storeInfo.name,
          phone_number: storeInfo.phoneNumber,
          homepage: storeInfo.homepage,
          description: storeInfo.description,
          convenience: storeInfo.convenience,
          short_address: storeInfo.shortAddress,
          address: storeInfo.address,
          road_address: storeInfo.roadAddress,
          lat: storeInfo.lat,
          lng: storeInfo.lng,
          map_url: storeInfo.mapUrl,
          category_seq: storeInfo.categorySeq,
          // info_updated_at: storeInfo.infoUpdatedAt,
          info_updated_at: null,
          off_leash: storeInfo.offLeash,
          large_dog_available: storeInfo.largeDog,
          thumbnail: storeInfo.thumbnail,
          additional_info: storeInfo.additionalInfo,
          zoonol_feed_url: null
        }
      ]
    )
    .into('n_store')
    try {
      return toInsertKeyOnBuilder(await query);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async deleteStoreBySeq(params) {
    const whereSeq = params.seq;
    const query = this.db
      .del()
      .from('n_store')
      .where('seq', `${whereSeq}`)
    try {
      return toInsertKeyOnBuilder(await query);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
  async updateStore(params) {
    const storeInfo = params.storeInfo;
    const query = this.db
    .update(
      {
        zoonol_place: storeInfo.place,
        naver_store_id: storeInfo.storeId,
        name: storeInfo.name,
        phone_number: storeInfo.phoneNumber,
        homepage: storeInfo.homepage,
        description: storeInfo.description,
        convenience: storeInfo.convenience,
        short_address: storeInfo.shortAddress,
        address: storeInfo.address,
        road_address: storeInfo.roadAddress,
        lat: storeInfo.lat,
        lng: storeInfo.lng,
        map_url: storeInfo.mapUrl,
        category_seq: storeInfo.categorySeq,
        // info_updated_at: storeInfo.infoUpdatedAt,
        info_updated_at: null,
        off_leash: storeInfo.offLeash,
        large_dog_available: storeInfo.largeDog,
        thumbnail: storeInfo.thumbnail,
        additional_info: storeInfo.additionalInfo,
        zoonol_feed_url: null
      }
    )
    .from('n_store')
    .where('seq', `${storeInfo.storeSeq}`)
    try {
      return toInsertKeyOnBuilder(await query);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
