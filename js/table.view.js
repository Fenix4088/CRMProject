const tableView = (() => {
  const tableDomStrings = {
    mainTable: "[data-main-table]",
    courseFilter: "#groupSelect",
  };
  // Ф-я отображения заявок
  function displayRequestInfo(obj) {
    const mainTableBody = document
      .querySelector(tableDomStrings.mainTable)
      .querySelector("tbody");
    const tableRow = `<tr data-course="${obj.courseType}">
                        <th scope="row">${obj.id}</th>
                        <td>${obj.date}</td>
                        <td>${obj.courseName}</td>
                        <td>${obj.name}</td>
                        <td>${obj.email}</td>
                        <td>${obj.phoneNumber}</td>
                        <td>
                        <div class="badge badge-pill badge-danger">
                            ${obj.status}
                        </div>
                        </td>
                        <td>
                        <a href="03-crm-edit-bid.html">Редактировать</a>
                        </td>
                    </tr>`;
    mainTableBody.insertAdjacentHTML("beforeend", tableRow);
  }

  //   Ф-я отображения отфильтрованых элементов
  function filterItems(value) {
    console.log(value);
    const trArr = document.querySelector(`${tableDomStrings.mainTable} > tbody`).querySelectorAll("tr");
    trArr.forEach((item) => {
      if (item.dataset.course == value || value == "all") {
        item.style.display = "table-row";
      } else {
        item.style.display = "none";
      }
    });
  }

  return {
    getTableDOMElements: function () {
      return tableDomStrings;
    },
    displayRequestInfo,
    filterItems,
  };
})();
