const tableView = (() => {
    const tableDomStrings = {
        mainTable: "[data-main-table]",
        courseFilter: "#groupSelect",
        // Top Filter
        topFilter: "[data-top-filter]",
        // aside Filter
        asideFilter: "[data-aside-filter]",
        // New requests amount div
        newRequestsAmountBadge: "[data-new-amount]",
        // Archived requests amount div
        archivedRequestsAmounBadge: "[data-archived-amount]",
    };

    // Ф-я отображения заявок
    function displayRequestInfo(obj) {
        const mainTableBody = document.querySelector(tableDomStrings.mainTable).querySelector("tbody");

        const tableRow = `<tr data-course="${obj.courseType}" data-status="${obj.status}" id=${obj.id}>
                        <th scope="row">${obj.id}</th>
                        <td>${obj.date}</td>
                        <td>${obj.courseName}</td>
                        <td>${obj.name}</td>
                        <td>${obj.email}</td>
                        <td>${obj.phoneNumber}</td>
                        <td>
                        <div class="badge badge-pill ${statuses[obj.status].color}">
                            ${obj.statusLabel}
                        </div>
                        </td>
                        <td>
                        <a data-link="edit" href="03-crm-edit-bid.html?id=${obj.id}">Редактировать</a>
                        </td>
                    </tr>`;
        mainTableBody.insertAdjacentHTML("beforeend", tableRow);
    }

    // Перебор и отображение элементов
    function displayRequests(requests) {
        // Очистка полей tbody
        document.querySelector(`${tableDomStrings.mainTable} > tbody`).innerHTML = "";
        // Перебор элементов массива и рендеринг
        requests.forEach((item) => displayRequestInfo(item));
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

    //Ф-я подсчета новых заявок
    function displayNewRequestsAmount(number) {
        document.querySelector(tableDomStrings.newRequestsAmountBadge).innerText = number;
    }

    // Ф-я для вывода на экраг количества заархивированных заявок
    function displayArchivedRequestsAmount(number) {
        document.querySelector(tableDomStrings.archivedRequestsAmounBadge).innerText = number;
    }

    // Ф-я для сокрытия ссылки Редактирования у заархивированного элемента
    function hideArchivedElementLink() {
        const tbody = document.querySelector("tbody").querySelectorAll('[data-link]');
        tbody.forEach( item => {
            item.classList.add("hide");
        }) 
    }

    return {
        getTableDOMElements: function () {
            return tableDomStrings;
        },
        addActiveClass,
        hideArchivedElementLink,
        displayNewRequestsAmount,
        displayArchivedRequestsAmount,
        displayRequests,
    };
})();
