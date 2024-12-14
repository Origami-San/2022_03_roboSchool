// ========== Single Script ==========

// Cookie
import "./components/cookie.js";

// Back To Top
import "./components/backToTop.js";

// Burger
import "./components/burger.js";

// Scroll to Tabs
import "simplebar";

// TabDropdown to Tabs
import "./components/tabDropdown.js";

// Scrolled
import "./components/scrolled.js";

// navLinkActive
import { initNavLinkActive } from "./components/navLinkActive.js";
// Инициализация с настройками
initNavLinkActive({
  activateFirstOnLoad: false, // Добавлять первому элементу активное состояние при загрузке страницы
  keepFirstActiveAboveThreshold: false, // Оставялть первый элемент активным, если меню находится выше значения смещения 200px
  dataAttribute: "data-menu-item", // атрибут ссылок меню навигации на которые будет применятся активный класс
  offset: 200, // Смещение в пикселях при котором класс будет активирован
});

// Typed
// import "./components/typed.js";

// Dropdown
// import "./components/dropdown.js";

// ========== Class Script ==========

// PopperJS | Tooltip
import Tooltip from "./components/tooltip.js";
// Создаем экземпляр Tooltip с настройками
const tooltip = new Tooltip("tooltip__btn", "tooltip__txt", {
  placement: "top-start", // Начальная позиция
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 10], // Настраиваемое смещение
      },
    },
  ],
});

// Modal
import GraphModal from "./components/graph-modal.js";
// Создаем экземпляр Modal с настройками
const modal = new GraphModal({
  speed: 800, // Скорость появления
  // isOpen: (modalInstance) => {
  //   // Дополнительные действия при открытии
  //   console.log("Модальное окно открыто:", modalInstance);
  // },
  // isClose: (modalInstance) => {
  //   // Дополнительные действия при закрытии
  //   console.log("Модальное окно закрыто:", modalInstance);
  // },
});

/// Accordion
// import Accordion from "./components/accordion.js";
// // Call the function & setting
// const accordion1 = new Accordion("accordion1", {
//   //speed: 500, // Скорость открытия аккордиона (default:300)
//   //singleOpen: true, // Можно открыть только один (default:false)
// });

// Tabs
import GraphTabs from "graph-tabs";
const tabs = new GraphTabs("popup");

// Swiper & Swiper modules
import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
// Указываем, какие модули будет использовать Swiper
Swiper.use([Navigation, Pagination, Scrollbar]);
// Создаем экземпляр Slider с настройками для каждой переменной
const swiper = new Swiper(".trainers__swiper", {
  slidesPerView: "auto",
  //slidesPerView: 4,
  spaceBetween: 40,

  // Navigation arrows
  navigation: {
    nextEl: ".trainers__slider-btn--next",
    prevEl: ".trainers__slider-btn--prev",
  },
  // And if we need scrollbar
  scrollbar: {
    el: ".trainers__scrollbar",
  },
});

// AOS
import AOS from "aos";
AOS.init();

// Using a bundler like webpack
import GLightbox from "glightbox";

// Initiate glightbox
const glightbox = GLightbox({
  selector: ".glightbox",
});

// PaddingManager (fix glightbox and GraphModal)
import PaddingManager from "./components/paddingManager.js";
//Инициализация с кастомным классом
const paddingManager = new PaddingManager({
  bodyClassesToWatch: ["disable-scroll", "glightbox-open"], // Классы для отслеживания
  paddingElementSelectors: [".header--fixed"], // Элементы для изменения стилей padding-right
  marginElementSelectors: [".back-to-top"], // Элементы для изменения стилей margin-righ
});

// // Isotope
// import { initIsotopeFilters } from './components/isotopeFilter.js';
// // Инициализация фильтров
// initIsotopeFilters();

// ========== Other Script ==========

// Подключение событий свайпа на мобильных
// import 'swiped-events';
// document.addEventListener('swiped', function(e) {
//   console.log(e.target);
//   console.log(e.detail);
//   console.log(e.detail.dir);
// });

// Подключение параллакса блоков при скролле
// import Rellax from 'rellax';
// const rellax = new Rellax('.rellax');

// Определение ширины экрана
// import { isMobile, isTablet, isDesktop } from './functions/check-viewport';
// if (isDesktop()) {
//   console.log('...')
// }

// Определение операционной системы на мобильных
// import { mobileCheck } from "./functions/mobile-check.js";
// console.log(mobileCheck())

// Получение высоты шапки сайта (не забудьте вызвать функцию)
// import { getHeaderHeight } from './functions/header-height';

// Реализация остановки скролла (не забудьте вызвать функцию)
// import { disableScroll } from './functions/disable-scroll';

// Реализация включения скролла (не забудьте вызвать функцию)
// import { enableScroll } from './functions/enable-scroll';

// Фикс фулскрин-блоков
// import './functions/fix-fullheight';

// Троттлинг функции (для ресайза, ввода в инпут, скролла и т.д.)
// import { throttle } from './functions/throttle';
// let yourFunc = () => { console.log('throttle') };
// let func = throttle(yourFunc);
// window.addEventListener('resize', func);
