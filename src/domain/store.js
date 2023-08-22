import StoreQuery from "@/query/store";

export default class StoreDomain {
  constructor({ db }) {
    this.storeQuery = new StoreQuery({ db });
  }

  async findStoreList() {
    return await this.storeQuery.findStoreList();
  }

  async findStoreListByBound() {}

  async getStoreByName(params) {
    return await this.storeQuery.getStoreByName(params);
  }
  async insertStore(params) {
    return await this.storeQuery.insertStore(params);
  }
  async deleteStoreBySeq(params) {
    return await this.storeQuery.deleteStoreBySeq(params);
  }
  async updateStore(params) {
    return await this.storeQuery.updateStore(params);
  }
}
