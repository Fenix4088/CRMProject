const formController = ((ctrlModel, ctrlView) => {
  // Берем из шаблога обьект с формой и ее элементами
  const formDOM = ctrlView.getDOMElements();

  document
    .querySelector(formDOM.formMain)
    .addEventListener("submit", creatRequest);

  // Ф-я создания заявки
  function creatRequest(e) {
    e.preventDefault();
    // Собираем значения из формы и записываем их в переменную
    const clientInformation = collectClienInformation();
    // Передаем данные по клиенту в модель
    ctrlModel.saveRequestData(
      clientInformation.clientName,
      clientInformation.clientPhone,
      clientInformation.clientEmail,
      clientInformation.clientCoursType
    );

    // generateTestDatas.init(); //Генерируем тестовые данные клиентов
    ctrlModel.testInit(); //Выводим в консоль данные из массива данных о клиенте
    ctrlView.clearFields(); //Очишаем поля формы
  }

  // Ф-я для сбора информации из формы Заявок
  function collectClienInformation() {
    const clientName = document.querySelector(formDOM.fullName).value;
    const clientPhone = document.querySelector(formDOM.phone).value;
    const clientEmail = document.querySelector(formDOM.email).value;
    const clientCoursType = document.querySelector(formDOM.courseType).value;

    return {
      clientName,
      clientPhone,
      clientEmail,
      clientCoursType,
    };
  }

  return {
    init: function () {
      console.log("App started");
    },
  };
})(model, formView);

formController.init();
