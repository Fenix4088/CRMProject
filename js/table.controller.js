const tableController = ((ctrlModel, ctrlTableView) => {
    const tableDomStrings = ctrlTableView.getTableDOMElements();

    // Изменения в фильтре по продукту
    document.querySelector(tableDomStrings.courseFilter).addEventListener("change", filterByCourseName);
    // Клик по ссылке редактирования каждого элемента
    // document.querySelector(tableDomStrings.mainTable).addEventListener("click", goToItemEdit);
    // Клик по верхнему фильтру
    document.querySelector(tableDomStrings.topFilter).addEventListener("click", filterElementsByStatus);
    // Клик по боковому фильтру
    document.querySelector(tableDomStrings.asideFilter).addEventListener("click", filterElementsByStatus);

    // Ф-я обновления фильтра
    function updateFilter(key, value) {
        if (value === "all") {
            // Присваеваем обьекту значение в виде пустой строки
            ctrlModel.filter[key] = "";
            // Фильтруем элементы
            const filteredRequests = filterData(ctrlModel.data.requestsDataBase);
            // Вывод данных на экран
            ctrlTableView.displayRequests(filteredRequests);
        } else {
            // Записываем значения элемента по которому мы кликнули в обьект с фильтром в моделе
            ctrlModel.filter[key] = value;
            // Фильтруем данные в зависимости от статуса
            const filteredRequests = filterData(ctrlModel.data.requestsDataBase);
            // Вывод отфильтрованных данных на экран
            ctrlTableView.displayRequests(filteredRequests);
        }
    }

    // Ф-я определения ключей в обьекте
    function getObjectKeys(obj) {
        let objKeys = Object.keys(obj);
        return objKeys;
    }

    // Фильтрация по названию продукта
    function filterByCourseName(e) {
        let keys = getObjectKeys(ctrlModel.filter);
        // Обновляем фильтр по ключу courseType
        updateFilter(keys[0], e.target.value);
    }

    // Фильтрация по статусу
    function filterElementsByStatus(e) {
        // Добавляем активный класс к боковому фильтру
        ctrlTableView.addActiveClass(e.target);
        let keys = getObjectKeys(ctrlModel.filter);
        // Обновляем фильтр по ключу status
        updateFilter(keys[1], e.target.dataset.filter);
    }

    // function goToItemEdit(e) {
    
    //     // ловим клик по кнопке редактирования
    //     if (e.target.hasAttribute("data-link") && e.target.getAttribute("data-link") == "edit") {
    //         // Определяем id элемента по которому мы кликнули
    //         const currentID = parseInt(e.target.parentElement.parentElement.id);
    //         // Определяем элемент по которому мы кликнули
    //         ctrlModel.data.requestsDataBase.forEach((item) => {
    //             if (item.id == currentID) {
    //                 localStorage.setItem("Editing element", JSON.stringify(item));
    //             }
    //         });
    //     }
    // }

    // Ф-я для фильтрации данных
    
    function filterData(data) {
        let requests = data;
        Object.keys(ctrlModel.filter).forEach((item) => {
            if (ctrlModel.filter[item]) {
                requests = requests.filter((request) => request[item] === ctrlModel.filter[item]);
            }
        });
        return requests;
    }

    // Ф-я для подсчета новых заявок
    function countNewRequests() {
        const newRequestsAmount = ctrlModel.data.requestsDataBase.filter((item) => item.status === statuses.new.name);
        ctrlTableView.displayNewRequestsAmount(newRequestsAmount.length);
    }

    return {
        init: function () {
            console.log("CRM requests list started!");
            countNewRequests();
            ctrlTableView.displayRequests(ctrlModel.data.requestsDataBase);
        },
    };
})(model, tableView);

tableController.init();
