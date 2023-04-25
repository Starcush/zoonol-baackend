import StoreQuery from '../query/store';

export default class StoreDomain {
  constructor({ db }) {
    this.storeQuery = new StoreQuery({ db });
  }

  async findStoreList() {
    return await this.storeQuery.findStoreList();
  }

  async findStoreListByBound() {}
}
