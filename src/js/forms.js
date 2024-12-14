// Validation Forms
import { validateForms } from "./components/validate-forms.js";
// Правила для Validate Forms
const rules = [
  {
    // Поле ввода имени
    ruleSelector: ".input-name",
    rules: [
      {
        rule: "minLength",
        value: 3,
        errorMessage: "Поле должно содержать не менее 3 символов",
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя!",
      },
    ],
  },
  {
    // Поле ввода телефона
    ruleSelector: ".input-tel",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон!",
      },
    ],
  },
  {
    // Поле ввода email
    ruleSelector: ".input-email",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните Email!",
      },
      {
        rule: "email",
        value: true,
        errorMessage: "Введите корректный Email",
      },
    ],
  },
];
// Функция после отправки формы
const afterForm = () => {
  console.log("Произошла отправка, тут можно писать любые действия");
};
// Валидация формы
validateForms(".order__form", rules, afterForm);
