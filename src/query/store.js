import { toRowsOnBuilder } from '@/common/util';
import { DatabaseError } from '@/common/error';

export default class StoreQuery {
  constructor({ db }) {
    this.db = db;
  }

  async findStoreList() {
    /**
     * note: category 1,2 은 카페와 식당
     */

    const query = this.db
      .select(
        'seq',
        'zoonol_place',
        'naver_store_id',
        'name',
        'sub_category',
        'phone_number',
        'working_day',
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
      .whereIn('category_seq', [1, 2]);

    try {
      return toRowsOnBuilder(await query);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  async findStoreListByBound() {}
}
