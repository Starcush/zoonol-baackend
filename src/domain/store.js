import StoreQuery from '@/query/store';

export default class StoreDomain {
  constructor({ db }) {
    this.storeQuery = new StoreQuery({ db });
  }

  async findStoreList() {
    return await this.storeQuery.findStoreList();
  }

  async findStoreListByBound() {}

  async getStore(params){
    console.log("SHI 111 :: ", params);
    return await this.storeQuery.getStore(params);
  }
}
