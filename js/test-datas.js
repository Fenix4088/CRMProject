const generateTestDatas = (() => {
  class Client {
    constructor(course, name, surname, phoneNumber, email) {
      this.course = course;
      this.name = name;
      this.surname = surname;
      this.phoneNumber = phoneNumber;
      this.email = email;
    }
  }

  const clientsArray = [
    new Client("html", "Олег", "Газманов", "48799233098", "oleg@mail.pl"),
    new Client("html", "Александр", "Пушкин", "48729243058", "alex@mail.ru"),
    new Client(
      "html",
      "Добрыня",
      "Никитич",
      "38719231058",
      "dobrunia@mail.ua"
    ),

    new Client("js", "Елена", "Пчелка", "76739230008", "elena@mail.ua"),
    new Client(
      "js",
      "Анастасия",
      "Волочкова",
      "98297733298",
      "nastia@mail.us"
    ),
    new Client("js", "Егор", "Плясов", "10796234091", "yehor@mail.ru"),

    new Client(
      "vue",
      "Александр",
      "Достоевский",
      "48793583099",
      "aleksandr@mail.bl"
    ),
    new Client("vue", "Сергей", "Есенин", "48799233091", "sergei@mail.kz"),
    new Client("vue", "Змей", "Горыныч", "48799232092", "snake@mail.fr"),

    new Client("php", "Клава", "Розембаум", "48779233097", "klava@mail.fr"),
    new Client("php", "Кирилл", "Глушко", "48793233093", "kiril@mail.pl"),
    new Client("php", "Евлампия", "Романова", "78799233091", "lampa@mail.ru"),

    new Client(
      "wordpress",
      "Евгения",
      "Иванова",
      "38792233098",
      "genia@mail.ua"
    ),
    new Client(
      "wordpress",
      "Лариса",
      "Ларина",
      "38722233098",
      "laracroft@mail.pl"
    ),
    new Client(
      "wordpress",
      "Сергей",
      "Долматов",
      "71199233091",
      "dolmatov@mail.ua"
    ),
  ];

  function generateRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  function showInUI() {
    const randomIndex = generateRandomIndex(clientsArray);
    const randomClient = clientsArray[randomIndex];

    document.querySelector("[data-fullname]").value =
      randomClient.name + " " + randomClient.surname;
    document.querySelector("[data-phone]").value = randomClient.phoneNumber;
    document.querySelector("[data-email]").value = randomClient.email;
    document.querySelector("[data-courses]").value = randomClient.course;
  }

  return {
    init: showInUI,
  };
})();

generateTestDatas.init();
