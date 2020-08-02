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
        new Client("html", "William", "Smith", "48799233098", "oleg@mail.pl"),
        new Client("html", "James", "Johnson", "48729243058", "alex@mail.ru"),
        new Client("html", "Mason", "Williams", "38719231058", "dobrunia@mail.ua"),

        new Client("js", "Harper", "Jones", "76739230008", "elena@mail.ua"),
        new Client("js", "Evelyn", "Brown", "98297733298", "nastia@mail.us"),
        new Client("js", "Ella", "Davis", "10796234091", "yehor@mail.ru"),

        new Client("vue", "Avery", "Miller", "48793583099", "aleksandr@mail.bl"),
        new Client("vue", "Jackson", "Wilson", "48799233091", "sergei@mail.kz"),
        new Client("vue", "Scarlett", "Moore", "48799232092", "snake@mail.fr"),

        new Client("php", "Madison", "Taylor", "48779233097", "klava@mail.fr"),
        new Client("php", "Carter", "Anderson", "48793233093", "kiril@mail.pl"),
        new Client("php", "Wyatt", "Jackson", "78799233091", "lampa@mail.ru"),

        new Client("wordpress", "Jack", "White", "38792233098", "genia@mail.ua"),
        new Client("wordpress", "Lily", "Garcia", "38722233098", "laracroft@mail.pl"),
        new Client("wordpress", "Eleanor", "Lewis", "71199233091", "dolmatov@mail.ua"),
    ];

    function generateRandomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }

    function showInUI() {
        const randomIndex = generateRandomIndex(clientsArray);
        const randomClient = clientsArray[randomIndex];

        document.querySelector("[data-fullname]").value = randomClient.name + " " + randomClient.surname;
        document.querySelector("[data-phone]").value = randomClient.phoneNumber;
        document.querySelector("[data-email]").value = randomClient.email;
        document.querySelector("[data-courses]").value = randomClient.course;
    }

    return {
        init: showInUI,
    };
})();

generateTestDatas.init();
