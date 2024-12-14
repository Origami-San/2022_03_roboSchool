function toggleScrolled() {
  const selectBody = document.querySelector("body");
  const selectHeader = document.querySelector("header");

  if (!selectHeader.classList.contains("header--fixed")) return;

  //window.scrollY > 100 ? selectBody.classList.add("scrolled") : selectBody.classList.remove("scrolled");
  selectBody.classList.toggle("scrolled", window.scrollY > 100);
}
document.addEventListener("scroll", toggleScrolled);
window.addEventListener("load", toggleScrolled);
