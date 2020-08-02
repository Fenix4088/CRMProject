const editController = ((ctrlModel, ctrlEditView) => {
    const editDOMElements = ctrlEditView.getEditDOMElents();
    // Click on the save button
    document.querySelector(editDOMElements.saveBtn).addEventListener("click", changingRequest);
    document.querySelector(editDOMElements.deleteBtn).addEventListener("click", deleteRequest);
    document.querySelector(editDOMElements.asideFilter).addEventListener("click", goBackToFilter);
    // We write the current request to a variable
    const currentRequest = findRequest();

    // Find the request object by id from the query string
    function findRequest() {
        const currentRequestId = parseInt(window.location.search.split("=")[1]);
        return ctrlModel.data.requestsDataBase.find((item) => item.id == currentRequestId);
    }

    // Function of receiving the edited object
    function editCurrentRequest() {
        // const currentRequest = findRequest();
        // Changing the data of the edited object
        ctrlEditView.displayRequestData(currentRequest);
    }

    // Function change the current request
    function changingRequest(e) {
        // e.preventDefault();
        const formInputs = ctrlEditView.findInputs();
        // We commit all changes in the request
        const changedRequest = collectNewValues(formInputs);
        // Update data add an object with new values ​​(instead of the old one)
        updateRequestsData(changedRequest);
    }
    // Function for deleting the application to the archive
    function deleteRequest(e) {
        // e.preventDefault();
        // const currentRequest = findRequest();
        const currentRequestClone = Object.assign(currentRequest, {
            statusLabel: `${statuses.archived.label}`,
            status: `${statuses.archived.name}`,
        });

        ctrlModel.data.requestsDataBase.forEach((item) => {
            if (item.status === statuses.archived.name) {
                let archivedElementIndex = ctrlModel.data.requestsDataBase.indexOf(item);
                archivingElement(archivedElementIndex);
            }

            // Update data add an object with new values ​​(instead of the old one)
            updateRequestsData(currentRequestClone);
        });
    }

    // Function to go to the filter
    function goBackToFilter(e) {
        // e.preventDefault();
        ctrlEditView.addActiveClass(e.target);
        updateFilter("status", e.target.dataset.filter);
        ctrlModel.filter.save();
    }

    // Function to update the filter
    function updateFilter(key, value) {
        if (value === "all") {
            // Assigning an empty string to the object
            ctrlModel.filter.fields[key] = "";
        } else {
            // We write the values ​​of the element on which we clicked into an object with a filter in the model
            ctrlModel.filter.fields[key] = value;
        }
    }

    // Function update an array with data
    function updateRequestsData(newRequest) {
        // Determine the element in general in the array, compare the new element with the old one by id
        const changedArray = ctrlModel.data.requestsDataBase.map((item) => {
            if (item.id === newRequest.id) {
                return newRequest;
            }
            return item;
        });

        // Pass the modified array to LS
        localStorage.setItem("All Requests", JSON.stringify(changedArray));
    }

    // Function to create a repository for archived items
    function archivingElement(index) {
        const archivedElement = ctrlModel.data.requestsDataBase.splice(index, 1);
        if (!ctrlModel.data.archived.includes(archivedElement[0])) {
            ctrlModel.data.archived.push(archivedElement[0]);
        }
        localStorage.setItem("Archived", JSON.stringify(ctrlModel.data.archived));
    }

    //   Function to create a modified object when saving
    function collectNewValues(inputs) {
        // 1  We take the current request
        // const currentRequest = findRequest();
        // 2 Determine the values ​​of the selects that have been changed
        // 2.1 Find out the values ​​of the product selection select
        const options = inputs.courseSelect.options;
        const courseSelectType = options[options.selectedIndex].value;
        const courseSelectName = options[options.selectedIndex].innerText;
        // 2.2 Find out the meaning of the status select
        const newStatus = inputs.status.options[inputs.status.options.selectedIndex].innerText;

        const newStatusValue = inputs.status.options[inputs.status.options.selectedIndex].value;

        const currentRequestClone = Object.assign(currentRequest, {
            name: `${inputs.name.value}`,
            email: `${inputs.email.value}`,
            phoneNumber: `${inputs.phone.value}`,
            courseType: `${courseSelectType}`,
            courseName: `${products[courseSelectType]}`,
            statusLabel: `${newStatus}`,
            status: `${newStatusValue}`,
        });
        return currentRequestClone;
    }

    //   Function to determine the new status
    function determineChangedStyatus() {
        const courseSelect = document.querySelector(editDOMElements.currentRequestCourse);
    }

    // Function for counting new applications
    function countNewRequests() {
        const newRequestsAmount = ctrlModel.data.requestsDataBase.filter((item) => item.status === statuses.new.name);
        ctrlEditView.displayNewRequestsAmount(newRequestsAmount.length);
    }

    // Function for counting archived applications
    function countArchivedRequests() {
        const archivedRequestsAmount = ctrlModel.data.archived.length;
        ctrlEditView.displayArchivedRequestsAmount(archivedRequestsAmount);
    }

    return {
        init: function () {
            editCurrentRequest();
            countNewRequests();
            countArchivedRequests();
        },
    };
})(model, editView);

editController.init();
