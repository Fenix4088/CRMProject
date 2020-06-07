const model = (() => {
    class Request {
        constructor(id, date, time, name, phoneNumber, email, courseType, courseName) {
            this.id = id;
            this.date = date;
            this.time = time;
            this.name = name;
            this.phoneNumber = phoneNumber;
            this.email = email;
            this.courseType = courseType;
            this.courseName = courseName;
            this.status = statuses.new.name;
            this.statusLabel = statuses.new.label;
        }
    }
    // Ф-я для сохранения данных из главной формы в модель
    function saveRequestData(name, phoneNumber, email, courseType, courseName) {
        let ID = 0;
        // Создаем уникальный идетификатор клиента
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
            formatPhoneNumber(phoneNumber),
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
        let day = formatNumber(date.getDate());
        let month = formatNumber(date.getMonth() + 1);
        const year = date.getFullYear();
        const fullDate = `${day}.${month}.${year}`;
        return fullDate;
    }

    // Ф-я для определения времени создания заявки
    function determineRequestTime() {
        const date = new Date();
        let hours = formatNumber(date.getHours());
        let minutes = formatNumber(date.getMinutes());
        let seconds = formatNumber(date.getSeconds());
        return `${hours}:${minutes}:${seconds}`;
    }

    // Ф-я для форматирования времени и даты
    function formatNumber(value) {
        return value > 9 ? value : `0${value}`;
    }

    // Ф-я для форматирования номера телфона
    function formatPhoneNumber(phoneNumber) {
        let newStr = String(phoneNumber);
        let newStrArr = newStr.split("");
        newStrArr.splice(1, 0, `(`);
        newStrArr.splice(5, 0, `)`);
        newStrArr.splice(8, 0, `-`);
        newStrArr.splice(11, 0, `-`);
        const formatedPhoneNumber = newStrArr.join("");
        return "+" + formatedPhoneNumber;
    }

    const data = {
        requestsDataBase: JSON.parse(localStorage.getItem("All Requests")) || [],
        archived: JSON.parse(localStorage.getItem("Archived")) || [],
    };

    const filter = {
        fields: {
            courseType: "",
            status: "",
        },

        getFilter: function () {
            return JSON.parse(localStorage.getItem("Filter")) || filter.fields;
        },
        saveFilter: function () {
            localStorage.setItem("Filter", JSON.stringify(filter.fields));
        },
    };

    return {
        data,
        filter,
        saveRequestData,
        testInit: function () {
            console.log(data);
        },
    };
})();
