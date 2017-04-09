/* eslint-disable */
/* global $ */
import Emitter from './emitter';
import Pagination from './pagination';

class AjaxDataProvider extends Emitter {
  constructor() {
    super();

    this.pageSize = 10;
    this.page = 0;
    this.totalCount = 0;
    this.data = [];

    this.pagination = new Pagination({
    });

    this.url = 'http://192.168.60.167:3002/api.php';
    this.refreshHints = {};
    if (this.data.length <= 0) {
      this.prepareData();
    }
  }

  setRefreshHints(hints) {
    this.refreshHints = hints;
  }

  getRefreshHints() {
    return this.refreshHints;
  }

  isDataLoaded(from, to) {
    return this.data.slice(from, to)
      .filter(i => i).length > 0;
  }

  clearData() {
    this.data.splice(this.page, (this.page * this.pageSize));
  }

  onError() {
    throw new Error('Could not load page: ' + [
      this.page, this.page * this.pageSize
    ].join('-'));
  }

  onSuccess(resp) {
    var from = this.page * this.pageSize;
    var to = from;
    if (resp.data.length > 0) {
      to = from + resp.data.length;
      this.data = this.data.concat(resp.data);
    }

    this.emit('dataLoaded', {
      from: from, to: to
    });
  }

  prepareData() {
    this.emit('dataLoading', {
      from: this.page, to: this.page * this.pageSize
    });

    $.ajax({
      url: this.url,
      type: 'get',
      data: { page: this.page, per_page: this.pageSize },
      dataType: 'json',
      cache: true,
      success: this.onSuccess.bind(this),
      error: this.onError.bind(this)
    });
  }

  getData() {
    return this.data;
  }

  refresh(from, to) {
    this.clearData();
    this.getData(from, to);
  }

  getPagination() {
    var totalPages = this.page * this.pageSize;
    return {
      page: this.page,
      pageSize: this.pageSize,
      totalCount: this.totalCount,
      totalPages: this.totalPages
    };
  }

  setPaginationOptions(args) {
    var defaultPageSize = Math.max(0, Math.ceil(totalCount / pageSize) - 1);

    if (args.pageSize !== undefined) {
      pageSize = args.pageSize;
      page = pageSize ? Math.min(page, defaultPageSize) : 0;
    }

    if (args.page !== undefined) {
      this.page = Math.min(args.page, defaultPageSize);
    }

    onPaginationUpdated.notify(getPagination(), null, self);

    this.refresh();
  }

  setPageSize(value) {
    pageSize = value;
  }

  getPageSize() {
    return pageSize;
  }
}

export default AjaxDataProvider;

