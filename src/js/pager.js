/* eslint-disable */
/* global Slick */

function Pager(options) {
  var dataProvider = options.dataProvider;
  var grid = options.grid;
  var $el = options.el;
  var $status;

  function init() {
    render();
    registerEvents();
    updatePager(dataProvider.getPagination());
  }

  function registerEvents() {
    dataProvider.onPaginationUpdated.subscribe(function(e, pager) {
      updatePager(pager);
    });
  }

  function getState() {
    var locked = !Slick.GlobalEditorLock.commitCurrentEdit();
    var pager = dataProvider.getPagination();
    var lastPage = pager.totalPages - 1;

    return {
      canGotoFirst: !locked && pager.pageSize !== 0 && pager.page > 0,
      canGotoLast:  !locked && pager.pageSize !== 0 && pager.page != lastPage,
      canGotoPrev:  !locked && pager.pageSize !== 0 && pager.page > 0,
      canGotoNext:  !locked && pager.pageSize !== 0 && pager.page < lastPage,
      pager: pager
    };
  }

  function setPageSize(n) {
    dataProvider.setRefreshHints({
      isFilterUnchanged: true
    });
    var page = parseInt(n, 10);
    dataProvider.setPageSize(n);
  }

  function gotoFirst() {
    if (getState().canGotoFirst) {
      dataProvider.setPageSize(0);
    }
  }

  function gotoLast() {
    var state = getState();
    if (state.canGotoLast) {
      dataProvider.setPageSize(state.pager.totalPages - 1);
    }
  }

  function gotoPrev() {
    var state = getState();
    if (state.canGotoPrev) {
      dataProvider.setPageSize(state.pager.page - 1);
    }
  }

  function gotoNext() {
    var state = getState();
    if (state.canGotoNext) {
      dataProvider.setPageSize(state.pager.page + 1);
    }
  }

  function render() {
    $el.empty();

    var $nav = $("<span class='slick-pager-nav' />").appendTo($el);
    var $settings = $("<span class='slick-pager-settings' />").appendTo($el);
    $status = $("<span class='slick-pager-status' />").appendTo($el);

    $settings
      .append("<span class='slick-pager-settings-expanded' style='display:none'>Show: <a data=0>All</a><a data='-1'>Auto</a><a data=25>25</a><a data=50>50</a><a data=100>100</a></span>");

    $settings.find("a[data]").click(function (e) {
      var pageSize = $(e.target).attr("data");
      if (pageSize !== undefined) {
        if (pageSize === -1) {
          var vp = grid.getViewport();
          setPageSize(vp.bottom - vp.top);
        } else {
          setPageSize(pageSize);
        }
      }
    });

    var iconPrefix = "<span class='ui-state-default ui-corner-all ui-icon-container'><span class='ui-icon ";
    var iconSuffix = "' /></span>";

    $(iconPrefix + "ui-icon-lightbulb" + iconSuffix)
      .click(function () {
        $(".slick-pager-settings-expanded").toggle();
      })
      .appendTo($settings);

    $(iconPrefix + "ui-icon-seek-first" + iconSuffix)
      .click(gotoFirst)
      .appendTo($nav);

    $(iconPrefix + "ui-icon-seek-prev" + iconSuffix)
      .click(gotoPrev)
      .appendTo($nav);

    $(iconPrefix + "ui-icon-seek-next" + iconSuffix)
      .click(gotoNext)
      .appendTo($nav);

    $(iconPrefix + "ui-icon-seek-end" + iconSuffix)
      .click(gotoLast)
      .appendTo($nav);

    $el.find(".ui-icon-container")
      .hover(function () {
        $(this).toggleClass("ui-state-hover");
      });

    $el.children().wrapAll("<div class='slick-pager' />");
  }


  function updatePager(pager) {
    var state = getState();

    $el.find(".slick-pager-nav span").removeClass("ui-state-disabled");
    if (!state.canGotoFirst) {
      $el.find(".ui-icon-seek-first").addClass("ui-state-disabled");
    }
    if (!state.canGotoLast) {
      $el.find(".ui-icon-seek-end").addClass("ui-state-disabled");
    }
    if (!state.canGotoNext) {
      $el.find(".ui-icon-seek-next").addClass("ui-state-disabled");
    }
    if (!state.canGotoPrev) {
      $el.find(".ui-icon-seek-prev").addClass("ui-state-disabled");
    }

    if (pager.pageSize === 0) {
      $status.text("Showing all " + pager.totalCount + " rows");
    } else {
      $status.text("Showing page " + (pager.page + 1) + " of " + pager.totalPages);
    }
  }

  init();
}

export default Pager;

