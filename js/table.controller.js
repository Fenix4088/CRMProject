const tableController = ((ctrlModel, ctrlTableView) => {
  const tableDomStrings = ctrlTableView.getTableDOMElements();

  document.querySelector(tableDomStrings.courseFilter).addEventListener("change", filterByCourseName);
  document.querySelector(tableDomStrings.mainTable).addEventListener("click", goToItemEdit);
  document.querySelector(tableDomStrings.topFilter).addEventListener("click", filterElementsByStatus);

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
    const mainArr = ctrlModel.data.requestsDataBase;
    const filteredArr = ctrlModel.data.statusesFilter;
    // Очистка всех лочерних Нод в tbody
    document.querySelector(`${tableDomStrings.mainTable} > tbody`).innerHTML = "";

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

  return {
    init: function () {
      console.log("CRM requests list started!");
      ctrlModel.data.requestsDataBase.forEach((item) => {
        ctrlTableView.displayRequestInfo(item);
      });
    },
  };
})(model, tableView);

tableController.init();
