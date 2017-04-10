/* global $ */
import Emitter from './emitter';

class Grid extends Emitter {
  constructor(options) {
    super();

    this.el = options.el;
    if (typeof this.el === 'undefined') {
      throw new Error('Grid container must be valid dom element.');
    }

    this.columns = options.columns;
    this.provider = options.dataProvider;

    this.render();
  }

  render() {
    const { el, columns, provider } = this;
    const data = provider.getData();
    const thead = $('<thead/>');
    const dataLength = data.length;

    for (let i = 0; i < columns.length; i += 1) {
      
      let column = columns[i];
      const tr = $('<tr/>');

      for (let j = 0; j < dataLength; j += 1) {
        let cell = data[j];
        let div = $('<td class="grid-cell"/>').text(cell);


        // eslint-disable-next-line no-console
        console.log(cell);
        tr.append(div);
      }

      thead.append(tr);
    }

    el.append(thead);
  }
}

export default Grid;

