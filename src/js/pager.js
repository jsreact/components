/* eslint-disable */
import Emitter from './emitter';

class Pager extends Emitter {
  contructor(options) {
    var $container = options.el;
    var dataProvider = options.dataProvider;
    var $el = $('<div class="grid-pager"/>');
    var $status;

    this.render();
    registerEvents();
    updatePager(dataProvider.getPagination());
  }

  registerEvents() {
    dataProvider.onPaginationUpdated.subscribe(function(e, pager) {
      updatePager(pager);
    });
  }

  getState() {
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

  setPageSize(n) {
    dataProvider.setRefreshHints({
      isFilterUnchanged: true
    });
    var page = parseInt(n, 10);
    dataProvider.setPageSize(n);
  }

  gotoFirst() {
    if (getState().canGotoFirst) {
      dataProvider.setPageSize(0);
    }
  }

  gotoLast() {
    var state = getState();
    if (state.canGotoLast) {
      dataProvider.setPageSize(state.pager.totalPages - 1);
    }
  }

  gotoPrev() {
    var state = getState();
    if (state.canGotoPrev) {
      dataProvider.setPageSize(state.pager.page - 1);
    }
  }

  gotoNext() {
    var state = getState();
    if (state.canGotoNext) {
      dataProvider.setPageSize(state.pager.page + 1);
    }
  }

  render() {
    var $nav = $('<ul class="pagination"/>').appendTo($el);
    var $settings = $('<div class="grid-pagesize pagesize"/>').appendTo($el);
    $status = $('<div class="grid-summary"/>').appendTo($el);

    $settings
      .append('<p class="pagesize-links expanded" style="display:none"><span>Show:</span><a href="#" data-pagesize="0">All</a><a href="#" data-pagesize="25">25</a><a href="#" data-pagesize="50">50</a><a href="#" data-pagesize="100">100</a></p>');

    $settings.find("a[data-pagesize]").click((e) => {
      var pageSize = $(e.target).attr("data-pagesize");
      if (pageSize !== undefined) {
          setPageSize(pageSize);
      }
    });

    var iconPrefix = '<li class="page-item"><a href="#" class="page-link">';
    var iconSuffix = '</a></li>';

    $('<a href="#">Per page</a>')
      .click(() => {
        $(".pagesize-links.expanded").toggle();
      })
      .appendTo($settings);

    $(iconPrefix + '<i class="page-icon page-icon-first"><<</i>' + iconSuffix)
      .click(gotoFirst)
      .appendTo($nav);

    $(iconPrefix + '<i class="page-icon page-icon-prev"><</i>' + iconSuffix)
      .click(gotoPrev)
      .appendTo($nav);

    $(iconPrefix + '<i class="page-icon page-icon-next">></i>' + iconSuffix)
      .click(gotoNext)
      .appendTo($nav);

    $(iconPrefix + '<i class="page-icon page-icon-last">>></i>' + iconSuffix)
      .click(gotoLast)
      .appendTo($nav);

    $container.append($el);
  }


  updatePager(pager) {
    var state = getState();

    $el.find(".pager-pagination .page-link").removeClass("disabled");
    if (!state.canGotoFirst) {
      $el.find(".page-icon-first").addClass("disabled");
    }
    if (!state.canGotoLast) {
      $el.find(".page-icon-last").addClass("disabled");
    }
    if (!state.canGotoNext) {
      $el.find(".page-icon-next").addClass("disabled");
    }
    if (!state.canGotoPrev) {
      $el.find(".page-icon-prev").addClass("disabled");
    }

    if (pager.pageSize === 0) {
      $status.text("Showing all " + pager.totalCount + " rows");
    } else {
      $status.text("Showing page " + (pager.page + 1) + " of " + pager.totalPages);
    }
  }
}

export default Pager;

