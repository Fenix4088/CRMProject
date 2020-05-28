const formView = (() => {
  const formDomStrings = {
    fullName: "[data-fullname]",
    phone: "[data-phone]",
    email: "[data-email]",
    courseType: "[data-courses]",
    formMain: "#main-form",
    mainFormSelect: "#formSelect",
    // Блоки предупреждающих сообщений
    warningName: "[data-warning-name]",
    warningPhone: "[data-warning-phone]",
    warningEmail: "[data-warning-email]",
  };
  // Ф-я очистки полей формы
  function clearFields() {
    document.querySelector(formDomStrings.fullName).value = "";
    document.querySelector(formDomStrings.phone).value = "";
    document.querySelector(formDomStrings.email).value = "";
  }

  // Ф-я валидации формы
  function formValidation() {
    const nameInput = document.querySelector(formDomStrings.fullName);
    const phoneInput = document.querySelector(formDomStrings.phone);
    const emailInput = document.querySelector(formDomStrings.email);
    let formVal = true;

    if (nameInput.value.trim() === "" || nameInput.value.length < 7) {
      formVal = false;
      toggleWarning(formDomStrings.warningName, true);
    } else {
      toggleWarning(formDomStrings.warningName, false);
    }

    if (
      phoneInput.value.trim() == "" ||
      isNaN(phoneInput.value) ||
      phoneInput.value.length < 11
    ) {
      formVal = false;
      toggleWarning(formDomStrings.warningPhone, true);
    } else {
      toggleWarning(formDomStrings.warningPhone, false);
    }

    if (!validateEmailReg(emailInput.value) || emailInput.value == "") {
      formVal = false;
      toggleWarning(formDomStrings.warningEmail, true);
    } else {
      toggleWarning(formDomStrings.warningEmail, false);
    }

    return formVal;
  }

  // Регулярное выражение email
  function validateEmailReg(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function toggleWarning(selector, show) {
    document.querySelector(selector).style.display = show ? "flex" : "none";
  }

  return {
    formValidation,
    clearFields,
    getDOMElements: function () {
      return formDomStrings;
    },
  };
})();
