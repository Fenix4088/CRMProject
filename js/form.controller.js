const formController = ((ctrlModel, ctrlView) => {
  // Берем из шаблога обьект с формой и ее элементами
  const formDOM = ctrlView.getDOMElements();

  document
    .querySelector(formDOM.formMain)
    .addEventListener("submit", creatRequest);

  // Ф-я создания заявки
  function creatRequest(e) {
    e.preventDefault();
    const clientName = document.querySelector(formDOM.fullName).value;
    const clientPhone = document.querySelector(formDOM.phone).value;
    const clientEmail = document.querySelector(formDOM.email).value;
    const clientCoursType = document.querySelector(formDOM.courseType).value;
    ctrlModel.saveRequestData(
      clientName,
      clientPhone,
      clientEmail,
      clientCoursType
    );
  }

  return {
    init: function () {
      console.log("App started");
    },
  };
})(model, formView);

formController.init();
