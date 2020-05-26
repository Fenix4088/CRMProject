const formView = (() => {
  const formDomStrings = {
    fullName: "[data-fullname]",
    phone: "[data-phone]",
    email: "[data-email]",
    courseType: "[data-courses]",
    formMain: "#main-form",
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
      // showOrhideWarning(formDomStrings.warningName, formVal)
      showWarning(formDomStrings.warningName);
    } else {
      hideWarning(formDomStrings.warningName);
      // showOrhideWarning(formDomStrings.warningName, formVal)
    }

    if (
      phoneInput.value.trim() == "" ||
      isNaN(phoneInput.value) ||
      phoneInput.value.length < 11
    ) {
      formVal = false;
      // showOrhideWarning(formDomStrings.warningPhone, formVal)
      showWarning(formDomStrings.warningPhone);
    } else {
      // showOrhideWarning(formDomStrings.warningPhone, formVal)

      hideWarning(formDomStrings.warningPhone);
    }

    if (!validateEmailReg(emailInput.value) || emailInput.value == "") {
      formVal = false;
      // showOrhideWarning(formDomStrings.warningEmail, formVal)

      showWarning(formDomStrings.warningEmail);
    } else {
      // showOrhideWarning(formDomStrings.warningEmail, formVal)

      hideWarning(formDomStrings.warningEmail);
    }

    return formVal;
  }

  // Регулярное выражение email
  function validateEmailReg(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Ф-я для отображения Warning message
  function showWarning(warningBlock) {
    document.querySelector(warningBlock).style.display = "flex";
  }
  // Ф-я для скрытия Warning message
  function hideWarning(warningBlock) {
    document.querySelector(warningBlock).style.display = "none";
  }

  // FIXME: Специально оставил, хотел совместить showWarning и  hideWarning в одну ф-ю, пока не получилось
  // function showOrhideWarning(warningBlock, validateVariable) {

  //   if (validateVariable == false) {
  //     document.querySelector(warningBlock).style.display = "flex";

  //   } else {
  //     document.querySelector(warningBlock).style.display = "none";

  //   }
  // }

  return {
    formValidation,
    clearFields,
    getDOMElements: function () {
      return formDomStrings;
    },
  };
})();
