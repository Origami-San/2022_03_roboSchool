// PopperJS
import { createPopper } from "@popperjs/core";

export default class Tooltip {
  constructor(buttonId, tooltipId, options = {}) {
    // Ищем элементы по ID
    this.button = document.getElementById(buttonId);
    this.tooltip = document.getElementById(tooltipId);

    // Проверить, существуют ли элементы
    if (this.button && this.tooltip) {
      // Настройки по умолчанию
      const defaultOptions = {
        placement: "top", // Позиция по умолчанию
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 5], // Смещение по умолчанию
            },
          },
        ],
      };

      // Объединить пользовательские и стандартные настройки
      this.options = { ...defaultOptions, ...options };

      // Создать экземпляр Popper.js
      this.popperInstance = createPopper(this.button, this.tooltip, this.options);
    }
  }
  // Уничтожить экземпляр Popper.js
  destroy() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }
}
