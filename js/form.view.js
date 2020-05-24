const formView = (() => {
  const formDomStrings = {
    fullName: "[data-fullname]",
    phone: "[data-phone]",
    email: "[data-email]",
    courseType: "[data-courses]",
    formMain: "#main-form",
  };

  return {
    getDOMElements: function () {
      return formDomStrings;
    },
  };
})();
