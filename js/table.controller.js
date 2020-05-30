const tableController = ((ctrlModel, ctrlTableView) => {
  const tableDomStrings = ctrlTableView.getTableDOMElements();

  document
    .querySelector(tableDomStrings.courseFilter)
    .addEventListener("change", filterByCourseName);
  document
    .querySelector(tableDomStrings.mainTable)
    .addEventListener("click", goToItemEdit);

  function filterByCourseName(e) {
    const selectValue = e.target.value;
    ctrlTableView.filterItems(selectValue);
  }

  function goToItemEdit(e) {
    // ловим клик по кнопке редактирования
    if (
      e.target.hasAttribute("data-link") &&
      e.target.getAttribute("data-link") == "edit"
    ) {
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
