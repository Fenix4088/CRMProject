const tableController = ((ctrlModel, ctrlTableView) => {
    const tableDomStrings = ctrlTableView.getTableDOMElements();

    // Изменения в фильтре по продукту
    document.querySelector(tableDomStrings.courseFilter).addEventListener("change", filterByCourseName);
    // Клик по ссылке редактирования каждого элемента
    document.querySelector(tableDomStrings.mainTable).addEventListener("click", goToItemEdit);
    // Клик по верхнему фильтру
    document.querySelector(tableDomStrings.topFilter).addEventListener("click", filterElementsByStatus);
    // Клик по боковому фильтру
    document.querySelector(tableDomStrings.asideFilter).addEventListener("click", filterElementsByStatus);

    function filterByCourseName(e) {
        const selectValue = e.target.value;
        ctrlTableView.filterItems(selectValue);
    }

    function goToItemEdit(e) {
        // ловим клик по кнопке редактирования
        if (e.target.hasAttribute("data-link") && e.target.getAttribute("data-link") == "edit") {
            // Определяем id элемента по которому мы кликнули
            const currentID = parseInt(e.target.parentElement.parentElement.id);
            // Определяем элемент по которому мы кликнули

            ctrlModel.data.requestsDataBase.forEach((item) => {
                if (item.id == currentID) {
                    localStorage.setItem("Editing element", JSON.stringify(item));
                }
            });
        }
    }

    // Фильтрация по статусу
    function filterElementsByStatus(e) {
        e.preventDefault();
        // Добавляем активный класс к боковому фильтру
        ctrlTableView.addActiveClass(e.target);
        // Очищаем innerHTML в tbody
        ctrlTableView.clearTableElements();
        // Выводим отфильтрованные элементы на экран
        if (e.target.dataset.filter === "all") {
            // Вывод всех данных на экран
            ctrlModel.data.requestsDataBase.forEach((item) => ctrlTableView.displayRequestInfo(item));
        } else {
            // Записываем значения элемента по которому мы кликнули в обьект с фильтром в моделе
            ctrlModel.filter.status = e.target.dataset.filter;
            // Фильтруем данные в зависимости от статуса
            const filteredRequests = filterData(ctrlModel.data.requestsDataBase);
            // Вывод отфильтрованных данных на экран
            filteredRequests.forEach((item) => ctrlTableView.displayRequestInfo(item));
        }
    }

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
            ctrlModel.data.requestsDataBase.forEach((item) => {
                ctrlTableView.displayRequestInfo(item);
            });
        },
    };
})(model, tableView);

tableController.init();
