const tableController = ((ctrlModel, ctrlTableView) => {
    const tableDomStrings = ctrlTableView.getTableDOMElements();

    // Изменения в фильтре по продукту
    document.querySelector(tableDomStrings.courseFilter).addEventListener("change", filterByCourseName);
    // Клик по верхнему фильтру
    document.querySelector(tableDomStrings.topFilter).addEventListener("click", filterElementsByStatus);
    // Клик по боковому фильтру
    document.querySelector(tableDomStrings.asideFilter).addEventListener("click", filterElementsByStatus);

    // Ф-я обновления фильтра
    function updateData(key, value) {
        if (value === "all") {
            // Присваеваем обьекту значение в виде пустой строки
            ctrlModel.filter.fields[key] = "";
            // Фильтруем элементы
            const filteredRequests = filterData(ctrlModel.data.requestsDataBase);
            // Вывод данных на экран
            ctrlTableView.displayRequests(filteredRequests);
        } else if (value === statuses.archived.name) {
            // Рендерим заархивированные элементы
            ctrlTableView.displayRequests(ctrlModel.data.archived);
            // Скрываем ссылку Редактировать у заархивированных элементов
            ctrlTableView.hideEditLink();
        } else {
            // Записываем значения элемента по которому мы кликнули в обьект с фильтром в моделе
            ctrlModel.filter.fields[key] = value;
            // Фильтруем данные в зависимости от статуса
            const filteredRequests = filterData(ctrlModel.data.requestsDataBase);
            // Вывод отфильтрованных данных на экран
            ctrlTableView.displayRequests(filteredRequests);
        }
    }

    // Фильтрация по названию продукта
    function filterByCourseName(e) {
        // Обновляем фильтр по ключу courseType
        updateData("courseType", e.target.value);
        // Сохранения значения фильтра в LS
        ctrlModel.filter.save();
    }

    // Фильтрация по статусу
    function filterElementsByStatus(e) {
        // Добавляем активный класс к боковому фильтру
        ctrlTableView.addActiveClass(e.target);
        // Обновляем фильтр по ключу status
        updateData("status", e.target.dataset.filter);

        // Сохранения значения фильтра в LS
        ctrlModel.filter.save();
    }

    // Ф-я для фильтрации данных
    function filterData(data) {
        let requests = data;
        Object.keys(ctrlModel.filter.fields).forEach((item) => {
            if (ctrlModel.filter.fields[item]) {
                requests = requests.filter((request) => request[item] === ctrlModel.filter.fields[item]);
            }
        });
        return requests;
    }

    // Ф-я для подсчета новых заявок
    function countNewRequests() {
        const newRequestsAmount = ctrlModel.data.requestsDataBase.filter((item) => item.status === statuses.new.name);
        ctrlTableView.displayNewRequestsAmount(newRequestsAmount.length);
    }

    // Ф-я для подсчета заархивированных заявок
    function countArchivedRequests() {
        const archivedRequestsAmount = ctrlModel.data.archived.length;
        ctrlTableView.displayArchivedRequestsAmount(archivedRequestsAmount);
    }

    return {
        init: function () {
            console.log("CRM requests list started!");
            countNewRequests();
            countArchivedRequests();
            ctrlTableView.displayRequests(ctrlModel.data.requestsDataBase);
            // Отображение сохраненных настроек фильтра при инициализации
            Object.keys(ctrlModel.filter.fields).forEach((item) => {
                let filterType = ctrlModel.filter.set()[item];
                updateData(item, filterType);
                if (item == "status") {
                    ctrlTableView.addActiveClassAfterLinking(filterType);
                } else {
                    ctrlTableView.selectFilterValue(filterType);
                }
            });
        },
    };
})(model, tableView);

tableController.init();
