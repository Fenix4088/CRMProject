const formController = ((ctrlModel, ctrlView) => {
  // Берем из шаблога обьект с формой и ее элементами
  const formDOM = ctrlView.getDOMElements();

  document
    .querySelector(formDOM.formMain)
    .addEventListener("submit", createRequest);

  // Ф-я создания заявки
  function createRequest(e) {
    e.preventDefault();
    if (ctrlView.formValidation()) {
      // Собираем значения из формы и записываем их в переменную
      const requestInformation = collectRequestInformation();
      // Определяем текстовую ноду выбранного option
      const optionText = findOptionText().innerText;
      // Передаем данные по клиенту в модель
      ctrlModel.saveRequestData(
        requestInformation.requestName,
        requestInformation.requestPhone,
        requestInformation.requestEmail,
        requestInformation.requestCourseType,
        optionText
      );

      generateTestDatas.init(); //Генерируем тестовые данные клиентов
      ctrlModel.testInit(); //Выводим в консоль данные из массива данных о клиенте
      // ctrlView.clearFields(); //Очишаем поля формы
    }
  }

  // Ф-я для сбора информации из формы Заявок
  function collectRequestInformation() {
    const requestName = document.querySelector(formDOM.fullName).value;
    const requestPhone = document.querySelector(formDOM.phone).value;
    const requestEmail = document.querySelector(formDOM.email).value;
    const requestCourseType = document.querySelector(formDOM.courseType).value;

    return {
      requestName,
      requestPhone,
      requestEmail,
      requestCourseType,
    };
  }

  // Ф-я для определения текстовой ноды option который выбран
  function findOptionText() {
    const formSelect = document.querySelector(formDOM.mainFormSelect);
    return formSelect.options[formSelect.options.selectedIndex];
  }

  return {
    init: function () {
      console.log("App started");
    },
  };
})(model, formView);

formController.init();
