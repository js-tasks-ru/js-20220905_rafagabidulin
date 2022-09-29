class Tooltip {
  static instance;
  element;
  prevTarget;

  constructor() {
    if (!Tooltip.instance) {
      Tooltip.instance = this;
    }
    return Tooltip.instance;
  }

  initialize() {
    this.initEventListeners();
  }

  getTemplate(text) {
    return `
      <div class="tooltip">${text}</div>
    `;
  }

  render(text) {
    const div = document.createElement('div');

    div.innerHTML = this.getTemplate(text);

    this.element = div.firstElementChild;

    document.body.append(this.element);
  }

  initEventListeners() {
    document.body.addEventListener('pointerover', this.onPointerOver);
    document.body.addEventListener('pointerout', this.onPointerOut);
  }

  onPointerOver = (event) => {
    document.body.addEventListener('pointermove', this.onMouseMove);
    this.render();

    const target = event.target;
    if (!target.dataset.tooltip) {
      return;
    }

    this.prevTarget = target;
    this.element.innerHTML = target.dataset.tooltip;
  };

  onPointerOut = (event) => {
    const target = event.target;
    if (this.prevTarget === target) {
      this.remove();
      document.body.removeEventListener('pointermove', this.onMouseMove);
    }
  };

  onMouseMove = (event) => {
    const offset = 10;

    this.element.style.top = `${event.clientY + offset}px`;
    this.element.style.left = `${event.clientX + offset}px`;
  };

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    document.body.removeEventListener('pointerover', this.onPointerOver);
    document.body.removeEventListener('pointerout', this.onPointerOut);
    document.body.removeEventListener('pointermove', this.onMouseMove);
    this.remove();
    Tooltip.tooltip = null;
    this.element = null;
    this.prevTarget = null;
  }
}

export default Tooltip;
