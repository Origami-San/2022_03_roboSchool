class PaddingManager {
  constructor({ bodyClassesToWatch = [], paddingElementSelectors = [], marginElementSelectors = [] } = {}) {
    if (!bodyClassesToWatch.length) {
      console.warn("PaddingManager: No classes to watch on <body>. Script disabled.");
      return;
    }
    if (!paddingElementSelectors.length && !marginElementSelectors.length) {
      console.warn("PaddingManager: No elements to adjust styles. Script disabled.");
      return;
    }

    this.bodyClassesToWatch = bodyClassesToWatch;
    this.paddingElementSelectors = paddingElementSelectors;
    this.marginElementSelectors = marginElementSelectors;
    this.savedStyles = new Map();

    this.observeBody();
  }

  // Получаем padding-right с <body>
  getBodyPaddingRight() {
    return window.getComputedStyle(document.body).paddingRight;
  }

  // Получаем margin-right с .gscrollbar-fixer
  getScrollbarFixerMarginRight() {
    const fixer = document.querySelector(".gscrollbar-fixer");
    // Проверяет наличие элемента с классом .gscrollbar-fixer.
    if (fixer) {
      return window.getComputedStyle(fixer).marginRight;
    }
    //return "0px";
  }

  // Устанавливаем padding-right для элементов
  applyPaddingRight(value) {
    this.applyStyleToElements(this.paddingElementSelectors, "paddingRight", value);
  }

  // Устанавливаем margin-right для элементов
  applyMarginRight(value) {
    this.applyStyleToElements(this.marginElementSelectors, "marginRight", value);
  }

  // Универсальная функция для применения стилей
  applyStyleToElements(selectors, styleName, value) {
    document.querySelectorAll(selectors.join(",")).forEach((el) => {
      // Сохраняем оригинальные стили, если они ещё не сохранены
      if (!this.savedStyles.has(el)) {
        this.savedStyles.set(el, {
          [styleName]: el.style[styleName] || "",
        });
      }

      // Устанавливаем стиль
      el.style[styleName] = value;
    });
  }

  // Сбрасываем padding-right для элементов
  resetPaddingRight() {
    this.resetStyle(this.paddingElementSelectors, "paddingRight");
  }

  // Сбрасываем margin-right для элементов
  resetMarginRight() {
    this.resetStyle(this.marginElementSelectors, "marginRight");
  }

  // Универсальная функция для сброса стилей
  resetStyle(selectors, styleName) {
    document.querySelectorAll(selectors.join(",")).forEach((el) => {
      const originalStyles = this.savedStyles.get(el);
      if (originalStyles && originalStyles[styleName] !== undefined) {
        el.style[styleName] = originalStyles[styleName];
        this.savedStyles.delete(el);
      } else {
        el.style[styleName] = "";
      }

      // Удаляем атрибут style, если он пуст
      if (!el.getAttribute("style")) {
        el.removeAttribute("style");
      }
    });
  }

  // Проверяем, заданы ли активные классы в bodyClassesToWatch
  hasWatchedClasses() {
    return this.bodyClassesToWatch.filter((cls) => document.body.classList.contains(cls));
  }

  // Отслеживание изменений классов <body>
  observeBody() {
    const observer = new MutationObserver(() => {
      const activeClasses = this.hasWatchedClasses();

      // Если ни одного отслеживаемого класса нет
      if (activeClasses.length === 0) {
        this.resetPaddingRight();
        this.resetMarginRight();
        return;
      }

      // Обработка активных классов
      activeClasses.forEach((cls) => {
        if (cls === "disable-scroll") {
          const bodyPadding = this.getBodyPaddingRight();
          this.applyPaddingRight(bodyPadding);
          this.applyMarginRight(bodyPadding);
        } else if (cls === "glightbox-open") {
          const fixerMargin = this.getScrollbarFixerMarginRight();
          this.applyPaddingRight(fixerMargin);
          this.applyMarginRight(fixerMargin);
        }
      });
    });

    // Наблюдение за изменением классов на <body>
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }
}

export default PaddingManager;
