const model = (() => {
  class Client {
    constructor(id, date, name, phoneNumber, email, courseType) {
      this.id = id; 
      this.date = date; 
      this.name = name;
      this.phoneNumber = phoneNumber;
      this.email = email;
      this.courseType = courseType;
    }
  }
  // Ф-я для сохранения данных из главной формы в модель
  function saveRequestData(name, phoneNumber, email, courseType) {
      const newClient = new Client("id", clienReaquestDate(), name, phoneNumber, email, courseType);
      console.log(newClient)
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
      month = "0" + month;
    }

    const year = date.getFullYear();

    const fullDate = `${day}.${month}.${year}`;
    return fullDate;
  }

  return {
    saveRequestData,
  };
})();
