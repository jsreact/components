(function ($) {
  /***
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
    var url = "http://192.168.60.167:3002/api.php";
    var timeout = null;
    var req = null;
    var refreshHints = {};

    // events
    var onDataLoading = new Slick.Event();
    var onDataLoaded = new Slick.Event();
    var onPagingInfoChanged = new Slick.Event();

    function init() {}

    function isDataLoaded(from, to) {
      for (var i = from; i <= to; i++) {
        if (data[i] === undefined || data[i] === null) {
          return false;
        }
      }

      return true;
    }

    function setPagingOptions(args) {
      if (args.pageSize !== undefined) {
        pageSize = args.pageSize;
        page = pageSize ? Math.min(page, Math.max(0, Math.ceil(totalCount / pageSize) - 1)) : 0;
      }

      if (args.pageNum !== undefined) {
        page = Math.min(args.pageNum, Math.max(0, Math.ceil(totalCount / pageSize) - 1));
      }

      onPagingInfoChanged.notify(getPagingInfo(), null, self);

      refresh();
    }

    function getPagingInfo() {
      var totalPages = pageSize ? Math.max(1, Math.ceil(totalCount / pageSize)) : 1;
      return {
        pageSize: pageSize,
        pageNum: page,
        totalRows: totalCount,
        totalPages: totalPages,
        dataProvider: this
      };
    }

    function setRefreshHints(hints) {
      refreshHints = hints;
    }

    function clear() {
      for (var key in data) {
        delete data[key];
      }
    }

    function getData() {
      prepareData();
      return data;
    }

    function prepareData() {
      if (req) {
        req.abort();
        for (var i = req.fromPage; i <= req.toPage; i++) {
          delete data[i * pageSize];
        }
      }

      var from = page;
      var to = page * pageSize;

      if (data.length > 0) {
        to = Math.min(to, data.length - 1);
      }

      var fromPage = Math.floor(from / pageSize);
      var toPage = Math.floor(to / pageSize);

      while (data[fromPage * pageSize] !== undefined && fromPage < toPage)
        fromPage++;

      while (data[toPage * pageSize] !== undefined && fromPage < toPage)
        toPage--;

      if (fromPage > toPage || ((fromPage == toPage) && data[fromPage * pageSize] !== undefined)) {
        // TODO:  look-ahead
        onDataLoaded.notify({from: from, to: to});
        return;
      }

      var recStart = (fromPage * pageSize);
      var recCount = (((toPage - fromPage) * pageSize) + pageSize);

      url += "?page=" + recStart + "&count=" + recCount;

      if (timeout !== null) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(function () {
        for (var i = fromPage; i <= toPage; i++) {
          data[i * pageSize] = null; // null indicates a 'timered but not available yet'
        }

        onDataLoading.notify({from: from, to: to});

        req = $.ajax({
          url: url,
          type: 'get',
          dataType: 'json',
          cache: true,
          success: function (resp, textStatus, xOptions) {
            onSuccess(resp, recStart);
          },
          error: function () {
            onError(fromPage, toPage);
          }
        });

        req.fromPage = fromPage;
        req.toPage = toPage;
      }, 50);
    }

    function refresh(from, to) {
      for (var i = from; i <= to; i++) {
        delete data[i];
      }

      getData(from, to);
    }

    function onError(fromPage, toPage) {
      console.log("Error loading pages " + fromPage + " to " + toPage);
    }

    function onSuccess(resp, start) {
      var end = start;
      if (resp.data.length > 0) {
        end = start + resp.data.length;
        data.length += Math.min(parseInt(resp.data.length, 10),1000); // limitation of the API

        for (var i = 0; i < resp.data.length; i++) {
          var item = resp.data[i];
          data[start + i] = item;
        }
      }

      req = null;

      onDataLoaded.notify({from: start, to: end});
    }

    init();

    return {
      // properties
      "getData": getData,

      // methods
      "clear": clear,
      "isDataLoaded": isDataLoaded,
      "prepareData": prepareData,
      "refresh": refresh,
      "getPagingInfo": getPagingInfo,
      "setRefreshHints": setRefreshHints,

      // events
      "onDataLoading": onDataLoading,
      "onDataLoaded": onDataLoaded,
      "onPagingInfoChanged": onPagingInfoChanged
    };
  }

  $.extend(true, window, { Slick: { AjaxDataProvider: AjaxDataProvider }});
})(jQuery);
