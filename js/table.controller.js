const tableController = ((ctrlModel, ctrlTableView) => {
    const tableDomStrings = ctrlTableView.getTableDOMElements();
    document.querySelector(tableDomStrings.courseFilter).addEventListener('change', filterByCourseName)

    function filterByCourseName (e) {
       const selectValue = e.target.value;
       ctrlTableView.filterItems(selectValue);
    }


    return {
        init: function () {
            console.log("CRM requests list started!")
            ctrlModel.data.requestsDataBase.forEach( item => {
                ctrlTableView.displayRequestInfo(item);
            });
        }
    }
    
})(model, tableView);


tableController.init();