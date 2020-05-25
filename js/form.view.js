const formView = (() => {
  const formDomStrings = {
    fullName: "[data-fullname]",
    phone: "[data-phone]",
    email: "[data-email]",
    courseType: "[data-courses]",
    formMain: "#main-form",
  };
  // Ф-я очистки полей формы
  function clearFields() {
    document.querySelector(formDomStrings.fullName).value = "";
    document.querySelector(formDomStrings.phone).value = "";
    document.querySelector(formDomStrings.email).value = "";
  }

  return {
    clearFields,
    getDOMElements: function () {
      return formDomStrings;
    },
  };
})();
