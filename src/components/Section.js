export default class Section {
  constructor(renderer, conteinerSelector) {
    this.renderer = renderer;
    this._container = document.querySelector(conteinerSelector);
    }
  renderItems(items) {
   items.forEach(element => {
     this.renderer(element)
  })
  }
  addItem(htmlElement) {
    this._container.prepend(htmlElement)
  }
}