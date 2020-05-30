const editView = (() => {
  const editDOMElements = {
    currentRequestID: "[data-request-id]",
    currentRequestDate: "[data-request-date]",
    currentRequestTime: "[data-request-time]",
    currentRequestCourse: "#requestSelectCourse",
    currentRequestName: "[data-request-name]",
    currentRequestEmail: "[data-request-email]",
    curentRequestPhone: "[data-request-phone]",
    currentRequestStatus: "[requestSelectStatus]",
  };

  //  Выводим в поля формы, данные редактируемого запроса
  function displayRequestData(obj) {
    console.log(obj);

    let allInputs = findInputs();
    allInputs.id.innerText = obj.id;
    allInputs.date.innerText = obj.date;
    allInputs.time.innerText = obj.time;
    allInputs.name.value = obj.name;
    allInputs.email.value = obj.email;
    allInputs.phone.value = obj.phoneNumber;
    determineCourseType(obj);
  }

  //  Находим все поля формы
  function findInputs() {
    return {
      id: document.querySelector(editDOMElements.currentRequestID),
      date: document.querySelector(editDOMElements.currentRequestDate),
      time: document.querySelector(editDOMElements.currentRequestTime),
      name: document.querySelector(editDOMElements.currentRequestName),
      email: document.querySelector(editDOMElements.currentRequestEmail),
      phone: document.querySelector(editDOMElements.curentRequestPhone),
      status: document.querySelector(editDOMElements.currentRequestStatus),
    };

    function determineCurrenCourse() {
      const courseSelect = document.querySelector(
        editDOMElements.currentRequestCourse
      );
      console.log("determineCurrenCourse -> courseSelect", courseSelect);
    }
  }

  //  Определяем курс выбранный пользователем
  function determineCourseType(obj) {
    const courseSelect = document.querySelector(
      editDOMElements.currentRequestCourse
    );
    courseSelect.options;
    Array.from(courseSelect.options).forEach((item) => {
      if (item.value == obj.courseType) {
        item.setAttribute("selected", "selected");
      }
    });
  }

  return {
    displayRequestData,
  };
})();
