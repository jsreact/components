/* eslint-disable */
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

  var pager = new Pager({ dataProvider, el: $('.grid-view') });

  dataProvider.onDataLoaded.subscribe(function () {
    console.log( dataProvider.getData() );
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

  var provider = new DataProvider({
    url: 'http://192.168.60.167:3002/api.php',
    pagination: {
      pageSize: 10,
      maxLimit: 500,
    }
  });

  new GridView({
    el: $(".gridview"),
    dataProvider: provider,
    height: 550,
    groupable: true,
    sortable: true,
    pageable: {
    },
    columns: [
    ]
  });

}

