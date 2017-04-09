/* global Event */
import Emitter from './emitter';

class Pagination extends Emitter {
  constructor() {
    super();

    this.pageSize = 10;
    this.pageParam = 'page';
    this.perPageParam = 'per_page';
  }

  setPageParam(value) {
    this.pageParam = value;

    return this;
  }

  getPageSize() {
    return this.pageSize;
  }

  setPageSize(value) {
    this.pageSize = value;

    return this;
  }
}

export default Pagination;

