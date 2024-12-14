export function initToggleScrolled(options = { disableOnMobile: true, mobileBreakpoint: 992 }) {
  const selectBody = document.querySelector("body");
  const selectHeader = document.querySelector("header");

  function toggleScrolled() {
    // Проверка ширины экрана
    if (options.disableOnMobile && window.innerWidth <= options.mobileBreakpoint) {
      if (selectHeader.classList.contains("header--fixed")) {
        selectHeader.classList.remove("header--fixed"); // Удаляем фиксированный класс
      }
      selectBody.classList.remove("scrolled"); // Убираем класс scrolled
      return; // Прекращаем выполнение функции
    }

    // На экранах > mobileBreakpoint
    if (selectHeader.classList.contains("header--fixed")) {
      selectBody.classList.toggle("scrolled", window.scrollY > 100);
    }
  }

  // Привязка событий
  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);
  window.addEventListener("resize", toggleScrolled); // Отслеживание изменения ширины экрана
}
