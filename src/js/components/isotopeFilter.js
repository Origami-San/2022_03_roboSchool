import Isotope from "isotope-layout";
import imagesLoaded from "imagesloaded";

export function initIsotopeFilters() {
  document.querySelectorAll(".isotope-layout").forEach(function(isotopeItem) {
    // Получаем параметры из атрибутов
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;

    // Ждем загрузки изображений перед инициализацией Isotope
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function() {
      initIsotope = new Isotope(isotopeItem.querySelector(".isotope-container"), {
        itemSelector: ".isotope-item",
        layoutMode: layout,
        filter: filter,
        sortBy: sort,
      });
    });

    // Добавляем обработчики событий для фильтров
    isotopeItem.querySelectorAll(".isotope-filters li").forEach(function(filterElement) {
      filterElement.addEventListener("click", function() {
        // Убираем активный класс у других фильтров
        isotopeItem.querySelector(".isotope-filters .filter-active").classList.remove("filter-active");
        // Добавляем активный класс текущему фильтру
        this.classList.add("filter-active");
        // Применяем фильтр
        initIsotope.arrange({
          filter: this.getAttribute("data-filter"),
        });
        // Повторная инициализация AOS, если используется
        if (typeof aosInit === "function") {
          aosInit();
        }
      });
    });
  });
}
