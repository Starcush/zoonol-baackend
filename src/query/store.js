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
        'info_updated_at'
      )
      .from('n_store')
      .whereIn('category_seq', [1, 2]);

    return await query;
  }

  async findStoreListByBound() {}
}
