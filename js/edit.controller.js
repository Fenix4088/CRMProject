const editController = ((ctrlModel, ctrlEditView) => {
    const editDOMElements = ctrlEditView.getEditDOMElents();
    // Клик по кнопке сохранить
    document.querySelector(editDOMElements.saveBtn).addEventListener("click", changingRequest);
    document.querySelector(editDOMElements.deleteBtn).addEventListener("click", deleteRequest);
    document.querySelector(editDOMElements.asideFilter).addEventListener("click", goBackToFilter);

    // Находим обьект запроса по id из строки запроса
    function findRequest() {
        const currentRequestId = parseInt(window.location.search.split("=")[1]);
        return ctrlModel.data.requestsDataBase.find((item) => item.id == currentRequestId);
    }

    // Ф-я получения редактировангого обьекта
    function editCurrentRequest() {
        const currentRequest = findRequest();
        // Изменяем данные редактируемго обьекта
        ctrlEditView.displayRequestData(currentRequest);
    }

    // Ф-я изменения текущего запроса
    function changingRequest(e) {
        // e.preventDefault();
        const formInputs = ctrlEditView.findInputs();
        // Фиксируем все изменения в запросе
        const changedRequest = collectNewValues(formInputs);
        // Обновляем data доюавляем туда обьект с новыми значениями(вместо старого)
        updateRequestsData(changedRequest);
    }

    // Ф-я для удаления заявки в архив
    function deleteRequest(e) {
        // e.preventDefault();
        const currentRequest = findRequest();
        const cloneCurrentRequest = Object.assign(currentRequest, {
            statusLabel: `${statuses.archived.label}`,
            status: `${statuses.archived.name}`,
        });

        ctrlModel.data.requestsDataBase.forEach((item) => {
            if (item.status === statuses.archived.name) {
                let archivedElementIndex = ctrlModel.data.requestsDataBase.indexOf(item);
                archivingElement(archivedElementIndex);
            }

            // Обновляем data доюавляем туда обьект с новыми значениями(вместо старого)
            updateRequestsData(cloneCurrentRequest);
        });
    }

    // Ф-я для перехода к фильтру
    function goBackToFilter(e) {
        // e.preventDefault();
        ctrlEditView.addActiveClass(e.target);
        const keys = Object.keys(ctrlModel.filter.fields);
        updateFilter(keys[1], e.target.dataset.filter);
        ctrlModel.filter.save();
    }

    // Ф-я для обновления фильтра
    function updateFilter(key, value) {
        if (value === "all") {
            // Присваеваем обьекту значение в виде пустой строки
            ctrlModel.filter.fields[key] = "";
        } else {
            // Записываем значения элемента по которому мы кликнули в обьект с фильтром в моделе
            ctrlModel.filter.fields[key] = value;
        }
    }

    // Ф-я обновления массива с данными
    function updateRequestsData(newRequest) {
        // Определяем элемент в общем в массиве, сравниваем новый элемент со старым по id
        const changedArray = ctrlModel.data.requestsDataBase.map((item) => {
            if (item.id === newRequest.id) {
                return newRequest;
            }
            return item;
        });

        // Передаем измененный массив в LS
        localStorage.setItem("All Requests", JSON.stringify(changedArray));
        
    }

    // Ф-я для создания хранилища для заархивированных элементов
    function archivingElement(index) {
        const archivedElement = ctrlModel.data.requestsDataBase.splice(index, 1);
        if (!ctrlModel.data.archived.includes(archivedElement[0])) {
            ctrlModel.data.archived.push(archivedElement[0]);
        }
        localStorage.setItem("Archived", JSON.stringify(ctrlModel.data.archived));
    }

    //   Ф-я для создания измененного обьекта при сохранении
    function collectNewValues(inputs) {
        // 1  Берем текущий запрос
        const currentRequest = findRequest();
        // 2 Определяем значения селектов которые были изменины
        // 2.1 Узнаем значения селекта выбора продукта
        const options = inputs.courseSelect.options;
        const courseSelectType = options[options.selectedIndex].value;
        const courseSelectName = options[options.selectedIndex].innerText;
        // 2.2 Узнаем значение селекта статуса
        const newStatus = inputs.status.options[inputs.status.options.selectedIndex].innerText;

        const newStatusValue = inputs.status.options[inputs.status.options.selectedIndex].value;

        const cloneCurrentRequest = Object.assign(currentRequest, {
            name: `${inputs.name.value}`,
            email: `${inputs.email.value}`,
            phoneNumber: `${inputs.phone.value}`,
            courseType: `${courseSelectType}`,
            courseName: `${products[courseSelectType]}`,
            statusLabel: `${newStatus}`,
            status: `${newStatusValue}`,
        });
        return cloneCurrentRequest;
    }

    //   Ф-я для определения нового статуса
    function determineChangedStyatus() {
        const courseSelect = document.querySelector(editDOMElements.currentRequestCourse);
    }

    // Ф-я для подсчета новых заявок
    function countNewRequests() {
        const newRequestsAmount = ctrlModel.data.requestsDataBase.filter((item) => item.status === statuses.new.name);
        ctrlEditView.displayNewRequestsAmount(newRequestsAmount.length);
    }

    // Ф-я для подсчета заархивированных заявок
    function countArchivedRequests() {
        const archivedRequestsAmount = ctrlModel.data.archived.length;
        ctrlEditView.displayArchivedRequestsAmount(archivedRequestsAmount);
    }

    return {
        init: function () {
            editCurrentRequest();
            countNewRequests();
            countArchivedRequests()
        },
    };
})(model, editView);

editController.init();
