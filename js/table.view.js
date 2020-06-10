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

    // Добавление активного класса к элементу бокового фильтра
    function addActiveClass(element) {
        const filterList = element.parentElement.parentElement;
        if (filterList.querySelector(".active")) {
            filterList.querySelector(".active").classList.remove("active");
        }
        element.classList.add("active");
    }

    // Добавление класса active боковому фильтпу после переходо со стр Edit
    function addActiveClassAfterLinking(value) {
        let linksArr = document.querySelector(tableDomStrings.asideFilter).children;

        Array.from(linksArr).forEach((item) => {
            item.firstElementChild.classList.remove("active");
            if (item.firstElementChild.dataset.filter === value) {
                item.firstElementChild.classList.add("active");
            }
        });

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
    function hideEditLink() {
        const tbody = document.querySelector("tbody").querySelectorAll("[data-link]");
        tbody.forEach((item) => {
            item.classList.add("hide");
        });
    }

    function selectFilterValue(value) {
        let a = document.querySelector(tableDomStrings.courseFilter);
        Array.from(a).forEach( item => {
            if( item.value === value ) {
                item.selected = true;
            }
        })
    }

    return {
        getTableDOMElements: function () {
            return tableDomStrings;
        },
        addActiveClass,
        hideEditLink,
        displayNewRequestsAmount,
        displayArchivedRequestsAmount,
        displayRequests,
        addActiveClassAfterLinking,
        selectFilterValue,
    };
})();
