function Grid(opts) {
  this.el = opts.el;
  if (this.el !== null && typeof this.el !== 'object') {
    throw new Error("Grid Error: invalid element provided, element does not exist in the DOM.");
  }

  this.opts = opts;
  this.columns = opts.columns;
  this.dataProvider = opts.dataProvider;

  this.init();
}

Grid.prototype.init = function() {
};

Grid.prototype.render = function() {
  var gridPane = document.createElement('div');
  gridPane.className = 'grid-pane';
  gridPane.setAttribute('style', 'height: 500px');

  var gridViewport = document.createElement('div');
  gridViewport.className = 'grid-viewport';
  gridViewport.setAttribute('style', 'height: 500px; overflow-y: scroll; overflow-x: hidden;');

  var gridContent = document.createElement('div');
  gridContent.className = 'grid-content';
  gridContent.setAttribute('style',  'position: relative; height: 1000px;');

  var gridHeader = document.createElement('div');
  gridHeader.className = 'grid-header';

  var data = this.dataProvider.getData();
  var columns = this.columns;

  for (var i = 0, dataCount = data.length; i < dataCount; i++) {
    var row = document.createElement('div');
    row.className = 'grid-row';
    row.setAttribute('style', 'position: absolute; top: ' + i * this.opts.rowHeight + 'px;');
    var rowData = data[i];

    if (rowData === null || typeof rowData !== 'object') {
      continue;
    }

    for (var j = 0, columnCount = columns.length; j < columnCount; j++) {
      var cell = document.createElement('div');
      cell.innerHTML = rowData[columns[j].id];
      cell.className = 'grid-cell ' + 'grid-cell-' + columns[j].id;
      row.appendChild(cell);
    }

    gridContent.appendChild(row);
  }

  gridViewport.appendChild(gridContent);
  gridPane.appendChild(gridViewport);

  this.el.addClass('grid')
    .append(gridHeader)
    .append(gridPane);
};
