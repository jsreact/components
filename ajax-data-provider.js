(function ($) {
  /***
   * A sample AJAX data store implementation.
   * Right now, it's hooked up to load Hackernews stories, but can
   * easily be extended to support any JSONP-compatible backend that accepts paging parameters.
   */
  function AjaxDataProvider() {
    // private
    var perPage = 10;
    var data = [];
    var url = "http://192.168.60.167:3002/api.php";
    var timer = null;
    var req = null; // ajax timer

    // events
    var onDataLoading = new Slick.Event();
    var onDataLoaded = new Slick.Event();

    function init() {}

    function isDataLoaded(from, to) {
      for (var i = from; i <= to; i++) {
        if (data[i] === undefined || data[i] === null) {
          return false;
        }
      }

      return true;
    }

    function clear() {
      for (var key in data) {
        delete data[key];
      }
    }

    function getData() {
      return data;
    }

    function prepareData(from, to) {
      if (req) {
        req.abort();
        for (var i = req.fromPage; i <= req.toPage; i++) {
          delete data[i * perPage];
        }
      }

      if (from < 0) {
        from = 0;
      }

      if (data.length > 0) {
        to = Math.min(to, data.length - 1);
      }

      var fromPage = Math.floor(from / perPage);
      var toPage = Math.floor(to / perPage);

      while (data[fromPage * perPage] !== undefined && fromPage < toPage)
        fromPage++;

      while (data[toPage * perPage] !== undefined && fromPage < toPage)
        toPage--;

      if (fromPage > toPage || ((fromPage == toPage) && data[fromPage * perPage] !== undefined)) {
        // TODO:  look-ahead
        onDataLoaded.notify({from: from, to: to});
        return;
      }

      var recStart = (fromPage * perPage);
      var recCount = (((toPage - fromPage) * perPage) + perPage);

      url += "?page=" + recStart + "&count=" + recCount;

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(function () {
        for (var i = fromPage; i <= toPage; i++) {
          data[i * perPage] = null; // null indicates a 'timered but not available yet'
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

      // events
      "onDataLoading": onDataLoading,
      "onDataLoaded": onDataLoaded
    };
  }

  // Slick.RemoteDataProvider
  $.extend(true, window, { Flow: { AjaxDataProvider: AjaxDataProvider }});
})(jQuery);
