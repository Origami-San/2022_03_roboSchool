// Ищем все dropdown на странице и для каждого запускаем функцию
document.querySelectorAll(".dropdown").forEach((dropdownWrapper) => {
  // Находим button и list
  const dropdownBtn = dropdownWrapper.querySelector(".dropdown__button"); // Кнопка для открытия списка
  const dropdownList = dropdownWrapper.querySelector(".dropdown__list"); // Список
  const dropdownInput = dropdownWrapper.querySelector(".dropdown__input-hidden"); // Скрытый input для хранения значения
  const dropdownListItem = dropdownList.querySelectorAll(".dropdown__list-item"); // Элементы списка

  function dropdownBtnClick(e) {
    dropdownList.classList.toggle("dropdown__list--open");
    this.classList.add("dropdown__button--active");
  }

  function outsideClick(e) {
    if (e.target !== dropdownBtn) {
      dropdownList.classList.remove("dropdown__list--open");
      dropdownBtn.classList.remove("dropdown__button--active");
    }
  }

  function escClick(e) {
    if (e.key === "Tab" || e.key === "Escape") {
      dropdownList.classList.remove("dropdown__list--open");
      dropdownBtn.classList.remove("dropdown__button--active");
    }
  }

  // Находим элемент по котрому был клик и подставляем текстовое значение в dropdownBtn
  dropdownListItem.forEach((el) => {
    el.addEventListener("click", (e) => {
      const self = e.currentTarget;
      e.stopPropagation(); //Останавливаем передачу события наверх
      dropdownBtn.innerText = self.innerText;
      dropdownBtn.focus();

      // Подставляем значение из data-value в скрытый input
      dropdownInput.value = self.dataset.value;

      dropdownList.classList.remove("dropdown__list--open");
      dropdownBtn.classList.remove("dropdown__button--active");
    });
  });

  // Клик по dropdown
  dropdownBtn.addEventListener("click", dropdownBtnClick);
  // Клик снаружи
  document.addEventListener("click", outsideClick);
  // Клик на esc
  document.addEventListener("keydown", escClick);
});
