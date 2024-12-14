function initTabsDropdown() {
  if (window.innerWidth > 576) return; // Запуск только на экранах 576px и меньше

  // Ищем все tabDropdown на странице и для каждого запускаем функцию
  document.querySelectorAll(".tabs__dropdown").forEach((tabDropdownWrapper) => {
    // Ищем .tabs__dropdown-btn и все .tabs__nav-btn
    const tabsDropdownBtn = tabDropdownWrapper.querySelector(".tabs__dropdown-btn");
    const tabsNav = tabDropdownWrapper.querySelector(".tabs__nav");
    const tabsButtons = tabDropdownWrapper.querySelectorAll(".tabs__nav-btn");
    // Объявляем переменную для иконки
    const dropdownArrow = '<span class="tabs__dropdown-arrow"></span>';

    // Открываем/закрываем dropdown по клику и устанавливаем максимальную высоту для анимации
    function dropdownBtnClick(e) {
      const self = e.currentTarget;
      self.classList.toggle("tabs__dropdown--open");

      // Управляем высотой для плавного открытия/закрытия + для нижней границы
      tabsNav.style.maxHeight = self.classList.contains("tabs__dropdown--open") ? `${tabsNav.scrollHeight + 1}px` : null;
      // Удаляем пустые теги stule
      cleanEmptyStyle();
    }

    // Обработчик клика вне элемента для закрытия выпадающего списка
    function outsideClick(e) {
      if (!tabDropdownWrapper.contains(e.target)) {
        // Если клик произошел вне dropdown, убираем класс
        tabDropdownWrapper.classList.remove("tabs__dropdown--open");
        // Убираем максимальную
        tabsNav.style.maxHeight = null;
        // Удаляем пустые теши stule
        cleanEmptyStyle();
      }
    }

    // Находим элемент по котрому был клик и подставляем текстовое значение в tabsDropdownBtn
    tabsButtons.forEach((button) => {
      button.addEventListener("click", function() {
        // Обновляем текст в кнопке выпадающего меню на текст выбранного таба
        tabsDropdownBtn.innerHTML = `${button.textContent}${dropdownArrow}`;
      });
    });

    // Удаляем пустой атрибут `style` если он больше не нужен
    function cleanEmptyStyle() {
      if (tabsNav.getAttribute("style") === "") {
        tabsNav.removeAttribute("style");
      }
    }

    // Клик по dropdown
    tabDropdownWrapper.addEventListener("click", dropdownBtnClick);
    // Клик вне dropdown
    document.addEventListener("click", outsideClick);
  });
}

// Выполнение функций при загрузке и изменении размера окна
window.addEventListener("load", () => {
  initTabsDropdown();
});
window.addEventListener("resize", () => {
  initTabsDropdown();
});
