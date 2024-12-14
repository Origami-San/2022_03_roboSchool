import Typed from "typed.js";

// Получаем контейнер с элементами
const typedElement = document.getElementById("typed-element");
// Создаем условие для выполнения скрипта
if (typedElement) {
  // Извлекаем строки из атрибута data-typed-items
  const strings = typedElement
    .getAttribute("data-typed-items")
    .split(",") // Разделяем строки по запятой
    .map((item) => item.trim()); // Убираем лишние пробелы
  // Инициализируем Typed.js
  new Typed("#typed-element", {
    strings: strings, // Передаём строки
    typeSpeed: 100, // Скорость печати
    backSpeed: 50, // Скорость удаления текста
    backDelay: 2000, // Задержка перед удалением
    //startDelay: 500,  // Задержка перед началом (def:0)
    loop: true, // Повторять анимацию
    //showCursor: true, // Показывать курсор
    //cursorChar: "|",  // Символ курсора
  });
}
