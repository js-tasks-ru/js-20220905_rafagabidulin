export default class SortableTable {
  subElements = {};
  headers = {};
  isSortLocally = true;

  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    this.headerConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;

    this.render();
    this.initEventListeners();
  }

  getTemplate(data) {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
          ${this.getTableHeader()}
          </div>
          <div data-element="body" class="sortable-table__body">
          ${this.getTableBody(data)}
          </div>
        </div>
      </div>  
      `;
  }

  getSubElements(key) {
    const result = {};
    const elements = this.element.querySelectorAll(`[data-${key}]`);

    for (const subElement of elements) {
      const name = subElement.dataset[key];
      result[name] = subElement;
    }

    return result;
  }

  getTableHeader() {
    return this.headerConfig
    .map((header) => {
      const order = (this.sorted.id === header.id) ? this.sorted.order : 'asc';
      return `
        <div
          class="sortable-table__cell"
          data-id="${header.id}"
          data-sortable="${header.sortable}"
          data-order="${order}"
        >
          <span>${header.title}</span>
          ${(this.sorted.id === header.id) ? this.getHeaderSortingArrow() : ''}
        </div>`;
    })
    .join('');    
  }

  getTableBody(data) {
    return data
    .map((item) => {
      return `
        <a href="/products/${item.id}" class="sortable-table__row">
          ${this.getTableRow(item).join('')}
      </a>
      `;
    })
    .join('');
  }

  getTableRow(item) {
    return this.headerConfig
      .map((header) => {
        return (header.template) ?
          header.template(item[header.id]) :
          `<div class="sortable-table__cell">${item[header.id]}</div>`; 
      }); 
  }

  getHeaderSortingArrow() {
    return `<span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>`;
  }

  editHeaderArrow(field, order) {
    this.headers[field].dataset.order = order;
    if (field !== this.sorted.id) {
      this.headers[field].append(this.headers[this.sorted.id].lastElementChild);  
    }    
    this.sorted.id = field; 
  }

  render() {
    const element = document.createElement("div");
    const sortedData = this.sortData(this.sorted.id, this.sorted.order);
    
    element.innerHTML = this.getTemplate(sortedData);
    this.element = element.firstElementChild;

    this.subElements = this.getSubElements("element");
    this.headers = this.getSubElements("id");

    this.editHeaderArrow(this.sorted.id, this.sorted.order);
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    this.subElements.body.innerHTML = this.getTableBody(sortedData);
  }

  sortData(field, order) {
    const arr = [...this.data];
    const column = this.headerConfig.find((item) => item.id === field);  
    const { sortType } = column;
    const directions = {
      asc: 1,
      desc: -1
    };

    const direction = directions[order];

    return arr.sort((a, b) => {
      switch (sortType) {
      case "number":
        return direction * (a[field] - b[field]);
      case "string":
        return direction * a[field].localeCompare(b[field], ["ru", "en"]);
      default:
        return direction * (a[field] - b[field]);
      }
    });
  }

  onHeaderClick = (event) => {
    const sortColumn = event.target.closest('[data-id]');
    if (!sortColumn || (sortColumn.dataset.sortable === 'false')) {
      return;
    }

    const field = sortColumn.dataset.id;
    const order = (sortColumn.dataset.order === 'asc') ? 'desc' : 'asc';
  
    this.sort(field, order);
    this.editHeaderArrow(field, order);
  }

  initEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.onHeaderClick);
  }
    
  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
    
  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}
