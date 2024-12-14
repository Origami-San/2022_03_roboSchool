// Импортируем библиотеку js-cookie
import Cookies from "js-cookie";

// Задаем имя для cookie
const cookiesName = "visit";

// Копируем HTML разметку для добавляения в DOM
function toHTML() {
  return `
<div id="cookie-warning" class="cookie-warning" role="alert" aria-live="assertive">
  <p>
    Этот сайт использует cookies для улучшения качества обслуживания.
    <button id="accept-cookies" class="accept-cookies" aria-label="Принять">Принять</button>
  </p>
</div>
  `;
}

// Проверяем, есть ли cookie с заданным именем
if (!Cookies.get(cookiesName)) {
  // Методом .insertAdjacentHTML вставляем toHTML перед закрывающит тегом body
  document.querySelector("body").insertAdjacentHTML("beforeend", toHTML());
  // Ищем переменные по id
  const cookieWarning = document.getElementById("cookie-warning");
  const acceptButton = document.getElementById("accept-cookies");

  // Проверяем наличие элементов cookieWarning и acceptButton
  if (cookieWarning && acceptButton) {
    // Показываем предупреждение через заданное время в мс.
    setTimeout(() => cookieWarning.classList.add("show"), 1000);

    // Обрабатываем нажатие на "Принять" и выполняем функцию setCookie
    acceptButton.addEventListener("click", setCookie);
    // Функция setCookie
    function setCookie() {
      // Убираем предупреждение
      cookieWarning.classList.remove("show");
      // Сохраняем информацию о принятии cookies (на 1 год = 365 дней)
      Cookies.set(cookiesName, "true", { expires: 365 });
      // Полностью удаляем элемент cookieWarning из DOM через 1с
      setTimeout(() => cookieWarning.remove(), 1000);
    }
  } else {
    console.error("Элементы cookieWarning или acceptButton не найдены!");
  }
}
