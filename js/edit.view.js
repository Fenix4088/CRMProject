const editView = (() => {
  const editDOMElements = {
    currentRequestID: "[data-request-id]",
    currentRequestDate: "[data-request-date]",
    currentRequestTime: "[data-request-time]",
    currentRequestCourse: "#requestSelectCourse",
    currentRequestName: "[data-request-name]",
    currentRequestEmail: "[data-request-email]",
    curentRequestPhone: "[data-request-phone]",
    currentRequestStatus: "#requestSelectStatus",
    saveBtn: "[data-save]",
  };

  //  Выводим в поля формы, данные редактируемого запроса
  function displayRequestData(obj) {
    let allInputs = findInputs();
    allInputs.id.innerText = obj.id;
    allInputs.date.innerText = obj.date;
    allInputs.time.innerText = obj.time;
    allInputs.name.value = obj.name;
    allInputs.email.value = obj.email;
    allInputs.phone.value = obj.phoneNumber;
    determineCourseType(obj);
    determineStatuse(obj);
  }

  //  Находим все поля формы
  function findInputs() {
    return {
      id: document.querySelector(editDOMElements.currentRequestID),
      date: document.querySelector(editDOMElements.currentRequestDate),
      time: document.querySelector(editDOMElements.currentRequestTime),
      courseSelect: document.querySelector(editDOMElements.currentRequestCourse),
      name: document.querySelector(editDOMElements.currentRequestName),
      email: document.querySelector(editDOMElements.currentRequestEmail),
      phone: document.querySelector(editDOMElements.curentRequestPhone),
      status: document.querySelector(editDOMElements.currentRequestStatus),
    };
  }

  //  Определяем курс выбранный пользователем
  function determineCourseType(obj) {
    const courseSelect = document.querySelector(editDOMElements.currentRequestCourse);
    courseSelect.options;
    Array.from(courseSelect.options).forEach((item) => {
      if (item.value == obj.courseType) {
        item.setAttribute("selected", "selected");
      }
    });
  }

  // Определяем заранее установленый статус заявки
  function determineStatuse(obj) {
    const statusSelect = document.querySelector(editDOMElements.currentRequestStatus);
    console.log("determineStatuse -> statusSelect", statusSelect);
    Array.from(statusSelect.options).forEach((item) => {
      if (item.value == obj.status) {
        item.setAttribute("selected", "selected");
      }
    });
  }

  return {
    displayRequestData,
    findInputs,
    getEditDOMElents: function () {
      return editDOMElements;
    },
  };
})();
