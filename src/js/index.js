/* global $ */
import './core';
import Grid from './grid';
import AjaxDataProvider from './ajax-data-provider';
import Pager from './pager';

export function createAjaxGrid() {
  var dataProvider = new AjaxDataProvider();

  var grid = new Grid(
    $('.grid'),
    dataProvider.getData(),
    [
      { id: 'first_name', name: 'First name', field: 'first_name', width: 200 },
      { id: 'last_name', name: 'Last name', field: 'last_name', width: 150 },
      { id: 'title', name: 'Title', field: 'title', width: 250 },
      { id: 'city', name: 'City', field: 'city', width: 150 },
      { id: 'date', name: 'Date', field: 'date', width: 150 },
      { id: 'amount', name: 'Amount', field: 'amount', width: 150 }
    ],
    {
      rowHeight: 32,
      editable: false,
      enableAddRow: false,
      enableCellNavigation: false
    }
  );

  var pager = new Pager({ dataProvider, grid, el: $('.grid-pager') });

  dataProvider.onDataLoaded.subscribe(function renderGrid() {
    grid.render();
  });

  /*
  grid.onViewportChanged.subscribe(function (e, args) {
      var vp = grid.getViewport();
      dataProvider.prepareData(vp.top, vp.bottom);
  });

  grid.onSort.subscribe(function (e, args) {
      dataProvider.setSort(args.sortCol.field, args.sortAsc ? 1 : -1);
      var vp = grid.getViewport();
      dataProvider.prepareData(vp.top, vp.bottom);
  });

  dataProvider.onDataLoaded.subscribe(function() {
      grid.updateRowCount();
      grid.render();
  });

  grid.onViewportChanged.notify();
  */
}

