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
                        <a data-link="edit" href="03-crm-edit-bid.html">Редактировать</a>
                        </td>
                    </tr>`;
        // 03-crm-edit-bid.html
        mainTableBody.insertAdjacentHTML("beforeend", tableRow);
    }

    //   Ф-я отображения отфильтрованых элементов
    function filterItems(value) {
        const trArr = document.querySelector(`${tableDomStrings.mainTable} > tbody`).querySelectorAll("tr");
        trArr.forEach((item) => {
            item.dataset.course == value || value == "all" ? (item.style.display = "table-row") : (item.style.display = "none");
        });
    }

    function displayNewRequestsAmount(number) {
        document.querySelector(tableDomStrings.newRequestsAmountBadge).innerText = number;
    }

    return {
        getTableDOMElements: function () {
            return tableDomStrings;
        },
        displayNewRequestsAmount,
        displayRequestInfo,
        filterItems,
    };
})();
