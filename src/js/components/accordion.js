// Создаем класс по умолчанию export default
export default class Accordion {
  constructor(accordionName, options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {},
      speed: 300,
      singleOpen: false, // один открытый аккордеон за раз
      classes: {
        control: "accordion__control", // класс для кнопки управления
        content: "accordion__content", // класс для контента аккордеона
      },
    };

    // Объединение стандартных и пользовательских настроек
    this.options = Object.assign(defaultOptions, options);

    // Находим все аккордеоны по заданному селектору
    // this.accordions = document.querySelectorAll(selector);

    // Находим все аккордеоны с указанным data-атрибутом
    this.accordions = document.querySelectorAll(`[data-accordion-name="${accordionName}"]`);

    // Инициализируем каждый аккордеон циклом
    this.accordions.forEach((accordion) => this.initAccordion(accordion));
  }

  initAccordion(accordion) {
    // Ищем в селекторе нужные классы
    const control = accordion.querySelector(`.${this.options.classes.control}`);
    const content = accordion.querySelector(`.${this.options.classes.content}`);

    // Проверяем, существует ли аккордеон
    if (control && content) {
      // Слушаем клик по кнопке
      control.addEventListener("click", () => {
        // Проверяем, задана ли опция singleOpen
        if (this.options.singleOpen) {
          // Закрываем все остальные аккордеоны перед открытием текущего
          this.accordions.forEach((otherAccordion) => {
            if (otherAccordion !== accordion && otherAccordion.classList.contains("is-open")) {
              this.close(
                otherAccordion,
                otherAccordion.querySelector(`.${this.options.classes.control}`),
                otherAccordion.querySelector(`.${this.options.classes.content}`)
              );
            }
          });
        }

        // Переключаем состояние текущего аккордеона
        if (accordion.classList.contains("is-open")) {
          // Если открыт, закрываем
          this.close(accordion, control, content);
        } else {
          // Если закрыт, открываем
          this.open(accordion, control, content);
        }
      });
    }
  }

  open(accordion, control, content) {
    // Подставляем скорость анимации
    accordion.style.setProperty("--accordion-speed", `${this.options.speed / 1000}s`);
    // Добавляем класс .is-open на текущий обьект по которому совершен клик
    accordion.classList.add("is-open");
    // Меняем значение aria-expanded на "true"
    control.setAttribute("aria-expanded", true);
    // Меняем значение aria-hidden на "false"
    content.setAttribute("aria-hidden", false);
    // Добаляем высоту атрибуьту max-height
    content.style.maxHeight = content.scrollHeight + "px";
    // В момент открытия, срабатывает isOpen()
    this.options.isOpen(accordion);
  }

  close(accordion, control, content) {
    // Удаляем класс .is-open
    accordion.classList.remove("is-open");
    // Меняем значение aria-expanded на "false"
    control.setAttribute("aria-expanded", false);
    // Меняем значение aria-hidden на "true"
    content.setAttribute("aria-hidden", true);
    // Удаляем данные у атрибута max-height
    content.style.maxHeight = null;

    // Удаляем инлайновый стиль `--accordion-time`
    accordion.style.removeProperty("--accordion-speed");

    // Удаляем пустой атрибут `style` если он больше не нужен
    if (accordion.getAttribute("style") === "") {
      accordion.removeAttribute("style");
    }

    // В момент открытия, срабатывает isClose()
    this.options.isClose(accordion);
  }
}
