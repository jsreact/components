/* global Slick, $ */

/**
 * A sample AJAX data store implementation.
 * Right now, it's hooked up to load Hackernews stories, but can
 * easily be extended to support any JSONP-compatible backend that accepts paging parameters.
 */
function AjaxDataProvider() {
  // private
  var pageSize = 10;
  var page = 0;
  var totalCount = 0;
  var data = [];
  var url = 'http://192.168.60.167:3002/api.php';

  var onDataLoaded = new Slick.Event();
  var onDataLoading = new Slick.Event();
  var onPaginationUpdated = new Slick.Event();
  var refreshHints = {};

  function init() {
    if (data.length <= 0) {
      prepareData();
    }
  }

  function setRefreshHints(hints) {
    refreshHints = hints;
  }

  function getRefreshHints() {
    return refreshHints;
  }

  function isDataLoaded(from, to) {
    return data.slice(from, to)
               .filter(i => i).length > 0;
  }

  function clearData() {
    data.splice(page, (page * pageSize));
  }

  function onError() {
    throw new Error('Could not load page: ' + [page, page * pageSize].join('-'));
  }

  function onSuccess(resp) {
    var from = page * pageSize;
    var to = from;
    if (resp.data.length > 0) {
      to = from + resp.data.length;
      data = data.concat(resp.data);
    }

    onDataLoaded.notify({ from: from, to: to });
  }

  function prepareData() {
    onDataLoading.notify({ from: page, to: page * pageSize });

    $.ajax({
      url: url,
      type: 'get',
      data: { page: page, per_page: pageSize },
      dataType: 'json',
      cache: true,
      success: onSuccess,
      error: onError
    });
  }

  function getData() {
    return data;
  }

  function refresh(from, to) {
    clearData();
    getData(from, to);
  }

  function getPagination() {
    var totalPages = page * pageSize;
    return {
      page: page,
      pageSize: pageSize,
      totalCount: totalCount,
      totalPages: totalPages
    };
  }

  function setPaginationOptions(args) {
    var defaultPageSize = Math.max(0, Math.ceil(totalCount / pageSize) - 1);

    if (args.pageSize !== undefined) {
      pageSize = args.pageSize;
      page = pageSize ? Math.min(page, defaultPageSize) : 0;
    }

    if (args.page !== undefined) {
      page = Math.min(args.page, defaultPageSize);
    }

    onPaginationUpdated.notify(getPagination(), null, self);

    refresh();
  }

  function setPageSize(value) {
    pageSize = value;
  }

  function getPageSize() {
    return pageSize;
  }

  init();

  return {
    getData: getData,
    isDataLoaded: isDataLoaded,
    prepareData: prepareData,
    refresh: refresh,
    setPageSize: setPageSize,
    getPageSize: getPageSize,
    getPagination: getPagination,
    setPaginationOptions: setPaginationOptions,
    setRefreshHints: setRefreshHints,
    getRefreshHints: getRefreshHints,

    onDataLoaded: onDataLoaded,
    onDataLoading: onDataLoading,
    onPaginationUpdated: onPaginationUpdated
  };
}

export default AjaxDataProvider;

