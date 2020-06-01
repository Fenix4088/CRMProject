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
        addActiveClass(e.target);
        const mainArr = ctrlModel.data.requestsDataBase;
        const filteredArr = ctrlModel.data.statusesFilter;
        // Очистка всех дочерних Нод в tbody
        clearTableElements();
        // Фильтруем общий массив по статусу элемента
        mainArr.filter((item) => {
            // Если статус элемента совпадает с содержимым элемента то...
            if (item.status == e.target.dataset.filter) {
                // Отображаем отфильтрованые элементы
                ctrlTableView.displayRequestInfo(item);
                // Если в массиве не содержиться таких элементов то отправляем их в массив
                if (!filteredArr[item.status].includes(item)) {
                    filteredArr[item.status].push(item);
                    localStorage.setItem(`${item.status}`, JSON.stringify(filteredArr[item.status]));
                }
            } else if (e.target.dataset.filter === "all") {
                ctrlTableView.displayRequestInfo(item);
            }
        });
    }

    // Ф-я добавления активного класса
    function addActiveClass(element) {
        if (element.parentElement.parentElement.hasAttribute("data-aside-filter")) {
            for (let i = 0; i < element.parentElement.parentElement.children.length; i++) {
                element.parentElement.parentElement.children[i].firstChild.classList.remove("active");
            }
            element.classList.add("active");
        }
    }

    // Ф-я очиски HTML контента в tbody
    function clearTableElements() {
        return (document.querySelector(`${tableDomStrings.mainTable} > tbody`).innerHTML = "");
    }

    // Ф-я для подсчета новых заявок
    function countNewRequests () {
        const newRequestsAmount = ctrlModel.data.requestsDataBase.filter(item => item.status === statuses.new.name);
        ctrlTableView.displayNewRequestsAmount(newRequestsAmount.length)
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
