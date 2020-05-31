const editController = ((ctrlModel, ctrlEditView) => {
  const editDOMElements = ctrlEditView.getEditDOMElents();
  document.querySelector(editDOMElements.saveBtn).addEventListener("click", changingRequest);

  // Ф-я получения редактировангого обьекта
  function editCurrentRequest() {
    const currentRequest = ctrlModel.data.editedRequest;
    // Изменяем данные редактируемго обьекта
    ctrlEditView.displayRequestData(currentRequest);
  }

  // Ф-я изменения текущего запроса
  function changingRequest(e) {
    // e.preventDefault();
    const formInputs = ctrlEditView.findInputs();
    // Фиксируем все изменения в запросе
    const changedRequest = collectNewValues(formInputs);
    // Определяем элемент в общем в массиве, сравниваем новый элемент со старым по id
    const changedArray = ctrlModel.data.requestsDataBase.map((item) => {
      if (item.id === changedRequest.id) {
        return changedRequest;
      }
      return item;
    });
    // Передаем измененный массив в LS
    localStorage.setItem("All Requests", JSON.stringify(changedArray));
  }

  //   Ф-я для создания измененного обьекта при сохранении
  function collectNewValues(inputs) {
    // 1  Берем текущий запрос
    const currentRequest = ctrlModel.data.editedRequest;
    // 2 Определяем значения селектов которые были изменины
    // 2.1 Узнаем значения селекта выбора продукта
    const courseSelectType = inputs.courseSelect.options[inputs.courseSelect.options.selectedIndex].value;
    const courseSelectName = inputs.courseSelect.options[inputs.courseSelect.options.selectedIndex].innerText;
    // 2.2 Узнаем значение селекта статуса
    const newStatus = inputs.status.options[inputs.status.options.selectedIndex].innerText;

    const newStatusValue = inputs.status.options[inputs.status.options.selectedIndex].value;

    const cloneCurrentRequest = Object.assign(currentRequest, {
      name: `${inputs.name.value}`,
      email: `${inputs.email.value}`,
      phoneNumber: `${inputs.phone.value}`,
      courseType: `${courseSelectType}`,
      courseName: `${products[courseSelectType]}`,
      statusLabel: `${newStatus}`,
      status: `${newStatusValue}`,
    });
    return cloneCurrentRequest;
  }

  //   Ф-я для определения нового статуса
  function determineChangedStyatus() {
    const courseSelect = document.querySelector(editDOMElements.currentRequestCourse);
  }

  return {
    init: function () {
      editCurrentRequest();
    },
  };
})(model, editView);

editController.init();
