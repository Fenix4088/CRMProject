const model = (() => {
  class Client {
    constructor(id, date, name, phoneNumber, email, courseType, coursName, status = "new") {
      this.id = id;
      this.date = date;
      this.name = name;
      this.phoneNumber = phoneNumber;
      this.email = email;
      this.courseType = courseType;
      this.coursName = coursName;
      this.status = status;
    }
  }
  // Ф-я для сохранения данных из главной формы в модель
  function saveRequestData(name, phoneNumber, email, courseType, coursName) {
    let ID = 0;
    // Создаем уникальный индекс клиента
    if (data.clientsDataBase.length > 0) {
      const lastIndex = data.clientsDataBase.length - 1;
      ID = data.clientsDataBase[lastIndex].id + 1;
    }
    // Создаем клиента
    const newClient = new Client(
      ID,
      clienReaquestDate(),
      name,
      phoneNumber,
      email,
      courseType,
      coursName
    );
    // Записываем данные по клиенту в основной массив
    data.clientsDataBase.push(newClient);

    // Записываем данные по клиенту в LS
    localStorage.setItem("All Clients", JSON.stringify(data.clientsDataBase));
  }

  // Ф-я для форматирования даты заполнения заявки
  function clienReaquestDate() {
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

  const data = {
    clientsDataBase: JSON.parse(localStorage.getItem("All Clients")) || [],

  };

  return {
    data,
    saveRequestData,
    testInit: function () {
      console.log(data);
    },
  };
})();
