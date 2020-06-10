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
        deleteBtn: "[data-delete]",
        // aside Filter
        asideFilter: "[data-aside-filter]",
        // New requests amount div
        newRequestsAmountBadge: "[data-new-amount]",
        // Archived requests amount div
        archivedRequestsAmounBadge: "[data-archived-amount]",
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

        allInputs.status.value = obj.status;
        allInputs.courseSelect.value = obj.courseType;
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

    // Добавление активного класса к элементу бокового фильтра
    function addActiveClass(element) {
        const filterList = element.parentElement.parentElement;
        if (filterList.querySelector(".active")) {
            filterList.querySelector(".active").classList.remove("active");
        }
        element.classList.add("active");
    }

    //Ф-я подсчета новых заявок
    function displayNewRequestsAmount(number) {
        document.querySelector(editDOMElements.newRequestsAmountBadge).innerText = number;
    }

    // Ф-я для вывода на экраг количества заархивированных заявок
    function displayArchivedRequestsAmount(number) {
        document.querySelector(editDOMElements.archivedRequestsAmounBadge).innerText = number;
    }

    return {
        displayNewRequestsAmount,
        displayArchivedRequestsAmount,
        displayRequestData,
        findInputs,
        addActiveClass,
        getEditDOMElents: function () {
            return editDOMElements;
        },
    };
})();
