const tableController = ((ctrlModel, ctrlTableView) => {
    const tableDomStrings = ctrlTableView.getTableDOMElements();

    // Changes in the filter by product
    document.querySelector(tableDomStrings.courseFilter).addEventListener("change", filterByCourseName);
    // Click on the top filter
    document.querySelector(tableDomStrings.topFilter).addEventListener("click", filterElementsByStatus);
    // Click on the side filter
    document.querySelector(tableDomStrings.asideFilter).addEventListener("click", filterElementsByStatus);

    // Filter update function
    function updateData(key, value) {
        if (value === "all") {
            // Assigning an empty string to the object
            ctrlModel.filter.fields[key] = "";
            // Filtering elements
            const filteredRequests = filterData(ctrlModel.data.requestsDataBase);
            // Displaying data on the screen
            ctrlTableView.displayRequests(filteredRequests);
        } else if (value === statuses.archived.name) {
            // Rendering archived items
            ctrlTableView.displayRequests(ctrlModel.data.archived);
            // Hide the Edit link on archived items
            ctrlTableView.hideEditLink();
        } else {
            // We write the values ​​of the element on which we clicked into an object with a filter in the model
            ctrlModel.filter.fields[key] = value;
            // We filter data depending on the status
            const filteredRequests = filterData(ctrlModel.data.requestsDataBase);
            // Displaying filtered data on the screen
            ctrlTableView.displayRequests(filteredRequests);
        }
    }

    // Filter by product name
    function filterByCourseName(e) {
        // Updating the filter by courseType key
        updateData("courseType", e.target.value);
        // Saving filter value in LS
        ctrlModel.filter.save();
    }

    // Filtering by status
    function filterElementsByStatus(e) {
        // Adding the active class to the side filter
        ctrlTableView.addActiveClass(e.target);
        // Updating the filter by the status key
        updateData("status", e.target.dataset.filter);

        // Saving filter value in LS
        ctrlModel.filter.save();
    }

    //Function for data filtering
    function filterData(data) {
        let requests = data;
        Object.keys(ctrlModel.filter.fields).forEach((item) => {
            if (ctrlModel.filter.fields[item]) {
                requests = requests.filter((request) => request[item] === ctrlModel.filter.fields[item]);
            }
        });
        return requests;
    }

    // Function for counting new applications
    function countNewRequests() {
        const newRequestsAmount = ctrlModel.data.requestsDataBase.filter((item) => item.status === statuses.new.name);
        ctrlTableView.displayNewRequestsAmount(newRequestsAmount.length);
    }

    // Function for counting archived applications
    function countArchivedRequests() {
        const archivedRequestsAmount = ctrlModel.data.archived.length;
        ctrlTableView.displayArchivedRequestsAmount(archivedRequestsAmount);
    }

    return {
        init: function () {
            console.log("CRM requests list started!");
            countNewRequests();
            countArchivedRequests();
            ctrlTableView.displayRequests(ctrlModel.data.requestsDataBase);
            // Display of the saved filter settings during initialization
            Object.keys(ctrlModel.filter.fields).forEach((item) => {
                let filterType = ctrlModel.filter.set()[item];
                updateData(item, filterType);
                if (item == "status") {
                    ctrlTableView.addActiveClassAfterLinking(filterType);
                } else {
                    ctrlTableView.selectFilterValue(filterType);
                }
            });
        },
    };
})(model, tableView);

tableController.init();
