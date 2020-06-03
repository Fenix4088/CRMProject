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
    };

    function displayRequests(requests) {
        requests.forEach((item) => displayRequestInfo(item));
    }
    // Ф-я отображения заявок
    function displayRequestInfo(obj) {
        const mainTableBody = document.querySelector(tableDomStrings.mainTable).querySelector("tbody");
        const tableRow = `<tr data-course="${obj.courseType}" id=${obj.id}>
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

    //   Ф-я отображения отфильтрованых элементов
    function filterItems(value) {
        const trArr = document.querySelector(`${tableDomStrings.mainTable} > tbody`).querySelectorAll("tr");
        trArr.forEach((item) => {
            item.dataset.course == value || value == "all" ? (item.style.display = "table-row") : (item.style.display = "none");
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
    //Ф-я подсчета новых заявок
    function displayNewRequestsAmount(number) {
        document.querySelector(tableDomStrings.newRequestsAmountBadge).innerText = number;
    }

    return {
        getTableDOMElements: function () {
            return tableDomStrings;
        },
        addActiveClass,
        clearTableElements,
        displayNewRequestsAmount,
        displayRequestInfo,
        displayRequests,
        filterItems,
    };
})();
