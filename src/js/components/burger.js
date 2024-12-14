// Удаление scroll
import { disableScroll } from "./disable-scroll.js";
// Добавление scroll
import { enableScroll } from "./enable-scroll.js";

(function() {
  // Кнопка открытия burger
  const burger = document?.querySelector("[data-burger]");
  // Меню бургера
  const menu = document?.querySelector("[data-menu]");
  // Элементы меню бургера
  const menuItems = document?.querySelectorAll("[data-menu-item]");
  // Задний фон
  const overlay = document?.querySelector("[data-menu-overlay]");
  // Кнопка закрытия closeBtn
  const closeBtn = document?.querySelector("[data-menu-close]");

  // Действие при клике по кнопке открытия
  burger?.addEventListener("click", (e) => {
    burger?.classList.toggle("burger--active");
    menu?.classList.toggle("menu--active");

    if (menu?.classList.contains("menu--active")) {
      burger?.setAttribute("aria-expanded", "true");
      burger?.setAttribute("aria-label", "Закрыть меню");
      disableScroll();
    } else {
      burger?.setAttribute("aria-expanded", "false");
      burger?.setAttribute("aria-label", "Открыть меню");
      enableScroll();
    }
  });
  // Действие при клике по заднему фону
  overlay?.addEventListener("click", () => {
    burger?.setAttribute("aria-expanded", "false");
    burger?.setAttribute("aria-label", "Открыть меню");
    burger.classList.remove("burger--active");
    menu.classList.remove("menu--active");
    enableScroll();
  });
  // Действия по кнопке закрытия
  closeBtn?.addEventListener("click", () => {
    burger?.setAttribute("aria-expanded", "false");
    burger?.setAttribute("aria-label", "Открыть меню");
    burger.classList.remove("burger--active");
    menu.classList.remove("menu--active");
    enableScroll();
  });
  // Действия по кнопке элемента бургера
  menuItems?.forEach((el) => {
    el.addEventListener("click", () => {
      burger?.setAttribute("aria-expanded", "false");
      burger?.setAttribute("aria-label", "Открыть меню");
      burger.classList.remove("burger--active");
      menu.classList.remove("menu--active");
      enableScroll();
    });
  });
})();
