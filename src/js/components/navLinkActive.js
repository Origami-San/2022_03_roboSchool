export function initNavLinkActive(
  options = {
    activateFirstOnLoad: false,
    keepFirstActiveAboveThreshold: false,
    dataAttribute: "data-menu-item",
    offset: 200,
  }
) {
  const navLinks = document.querySelectorAll(`[${options.dataAttribute}]`);
  const firstLink = navLinks[0];

  function updateActiveLink() {
    const scrollPosition = window.scrollY + options.offset; // Смещение из настроек

    let isAnyActive = false;

    navLinks.forEach((link) => {
      const sectionId = link.getAttribute("href").slice(1); // Убираем #
      const section = document.getElementById(sectionId);

      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Проверяем, находится ли текущая позиция внутри секции
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Удаляем класс active у всех ссылок
          navLinks.forEach((link) => link.classList.remove("active"));
          // Добавляем класс active к текущей ссылке
          link.classList.add("active");
          isAnyActive = true;
        }
      }
    });

    // Если ничего не активно
    if (!isAnyActive) {
      if (window.scrollY < options.offset && !options.keepFirstActiveAboveThreshold) {
        // Убираем класс active у первого элемента
        firstLink.classList.remove("active");
      } else if (options.keepFirstActiveAboveThreshold) {
        // Сохраняем класс active у первого элемента
        firstLink.classList.add("active");
      }
    }
  }

  // Установка активного класса на первый элемент при загрузке
  if (options.activateFirstOnLoad) {
    navLinks.forEach((link) => link.classList.remove("active"));
    firstLink.classList.add("active");
  }

  // Привязка событий
  document.addEventListener("scroll", updateActiveLink);
  window.addEventListener("load", updateActiveLink);
}
