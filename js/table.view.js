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

    // Function display applications
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
                        <a data-link="edit" href="03-crm-edit-bid.html?id=${obj.id}">Edit</a>
                        </td>
                    </tr>`;
        mainTableBody.insertAdjacentHTML("beforeend", tableRow);
    }

    // Iteration and display of elements
    function displayRequests(requests) {
        // Clearing tbody fields
        document.querySelector(`${tableDomStrings.mainTable} > tbody`).innerHTML = "";
        // Looping through array elements and rendering
        requests.forEach((item) => displayRequestInfo(item));
    }

    // Adding an Active Class to a Side Filter Element
    function addActiveClass(element) {
        const filterList = element.parentElement.parentElement;
        if (filterList.querySelector(".active")) {
            filterList.querySelector(".active").classList.remove("active");
        }
        element.classList.add("active");
    }

    // Adding the active class to the side filter after jumping from the Edit page
    function addActiveClassAfterLinking(value) {
        let linksArr = document.querySelector(tableDomStrings.asideFilter).children;

        Array.from(linksArr).forEach((item) => {
            item.firstElementChild.classList.remove("active");
            if (item.firstElementChild.dataset.filter === value) {
                item.firstElementChild.classList.add("active");
            }
        });
    }

    //Phase of counting new applications
    function displayNewRequestsAmount(number) {
        document.querySelector(tableDomStrings.newRequestsAmountBadge).innerText = number;
    }

    // Function for displaying the number of archived orders on the screen
    function displayArchivedRequestsAmount(number) {
        document.querySelector(tableDomStrings.archivedRequestsAmounBadge).innerText = number;
    }

    // A function to hide the Edit link for an archived item
    function hideEditLink() {
        const tbody = document.querySelector("tbody").querySelectorAll("[data-link]");
        tbody.forEach((item) => {
            item.classList.add("hide");
        });
    }

    function selectFilterValue(value) {
        let a = document.querySelector(tableDomStrings.courseFilter);
        Array.from(a).forEach((item) => {
            if (item.value === value) {
                item.selected = true;
            }
        });
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
