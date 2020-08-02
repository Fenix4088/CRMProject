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
    // Function for saving data from the main form to the model
    function saveRequestData(name, phoneNumber, email, courseType, courseName) {
        let ID = 0;

        // We create a unique client identifier
        if (data.requestsDataBase.length > 0) {
            const lastIndex = data.requestsDataBase.length - 1;
            ID = data.requestsDataBase[lastIndex].id + 1;
            // Updating the array with data after adding each element
            data.requestsDataBase = JSON.parse(localStorage.getItem("All Requests"));
        }
        // We create a client
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

        // Writing customer data to the main array
        data.requestsDataBase.push(newRequest);
        // We write data on the client in LS
        localStorage.setItem("All Requests", JSON.stringify(data.requestsDataBase));
    }

    // Function to format the date of filling the application
    function determineRequestDate() {
        const date = new Date();
        let day = formatNumber(date.getDate());
        let month = formatNumber(date.getMonth() + 1);
        const year = date.getFullYear();
        const fullDate = `${day}.${month}.${year}`;
        return fullDate;
    }

    // Function to determine the time of creation of the application
    function determineRequestTime() {
        const date = new Date();
        let hours = formatNumber(date.getHours());
        let minutes = formatNumber(date.getMinutes());
        let seconds = formatNumber(date.getSeconds());
        return `${hours}:${minutes}:${seconds}`;
    }

    // Function for formatting time and date
    function formatNumber(value) {
        return value > 9 ? value : `0${value}`;
    }

    // Function to format the phone number
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

        set: function () {
            return JSON.parse(localStorage.getItem("Filter")) || filter.fields;
        },
        save: function () {
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
