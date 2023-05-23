export default class Section {
  constructor({ items, renderer }, conteinerSelector) {
    this._items = items;
    this.renderer = renderer;
    this._container = document.querySelector(conteinerSelector);
    }
  renderItems() {
   this._items.forEach(element => {
     this.renderer(element)
  })
  }
  addItem(htmlElement) {
    this._container.prepend(htmlElement)
  }
}