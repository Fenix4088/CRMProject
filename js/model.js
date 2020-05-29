const model = (() => {
  class Request {
    constructor(
      id,
      date,
      time,
      name,
      phoneNumber,
      email,
      courseType,
      courseName,
      status = "Новый"
    ) {
      this.id = id;
      this.date = date;
      this.time = time;
      this.name = name;
      this.phoneNumber = phoneNumber;
      this.email = email;
      this.courseType = courseType;
      this.courseName = courseName;
      this.status = status;
    }
  }
  // Ф-я для сохранения данных из главной формы в модель
  function saveRequestData(name, phoneNumber, email, courseType, courseName) {
    let ID = 0;
    // Создаем уникальный индекс клиента
    if (data.requestsDataBase.length > 0) {
      const lastIndex = data.requestsDataBase.length - 1;
      ID = data.requestsDataBase[lastIndex].id + 1;
    }
    // Создаем клиента
    const newRequest = new Request(
      ID,
      determineRequestDate(),
      determineRequestTime(),
      name,
      phoneNumber,
      email,
      courseType,
      courseName
    );
    // Записываем данные по клиенту в основной массив
    data.requestsDataBase.push(newRequest);
    // Записываем данные по клиенту в LS
    localStorage.setItem("All Requests", JSON.stringify(data.requestsDataBase));
  }

  // Ф-я для форматирования даты заполнения заявки
  function determineRequestDate() {
    const date = new Date();
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let month = date.getMonth();
    if (month < 10) {
      month = "0" + (month + 1);
    }

    const year = date.getFullYear();

    const fullDate = `${day}.${month}.${year}`;
    return fullDate;
  }

  // Ф-я для определения времени создания заявки
  function determineRequestTime () {
    const date = new Date();
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      hours = "0" + minutes;
    }

    if(seconds < 10) {
      seconds = "0" + seconds;
    }

    return hours + ":" + minutes + ":" + seconds
  }

  const data = {
    requestsDataBase: JSON.parse(localStorage.getItem("All Requests")) || [],
    newStatus: [],
    inProgressStatus: [],
    finishedStatus: [],
    deletedStatus: [],
  };

  return {
    data,
    saveRequestData,
    testInit: function () {
      console.log(data);
    },
  };
})();
