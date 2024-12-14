// Поиск кнопку "Back To Top"
const backToTop = document.getElementById("back-to-top");
// Порог прокрутки для отображения кнопки "Назад наверх"
const scrollThreshold = 100;

if (backToTop) {
  // Функция для управления видимостью кнопки
  const toggleBackToTop = () => {
    backToTop.classList.toggle("active", window.scrollY > scrollThreshold);
  };
  // Событие при загрузке страницы
  window.addEventListener("load", toggleBackToTop);
  // Событие при прокрутке страницы
  window.addEventListener("scroll", toggleBackToTop);
} else {
  console.error("Элементы Back To Top не найдены!");
}
