const formController = ((ctrlModel, ctrlView) => {
    // We take an object from the template with a form and its elements
    const formDOM = ctrlView.getDOMElements();

    document.querySelector(formDOM.formMain).addEventListener("submit", createRequest);

    // Form of application creation
    function createRequest(e) {
        e.preventDefault();
        if (ctrlView.formValidation()) {
            // Collecting values ​​from the form and writing them to a variable
            const requestInformation = collectRequestInformation();
            // Determine the text node of the selected option
            const optionText = findOptionText().innerText;
            // We transfer customer data to the model
            ctrlModel.saveRequestData(
                requestInformation.requestName,
                requestInformation.requestPhone,
                requestInformation.requestEmail,
                requestInformation.requestCourseType,
                optionText
            );

            generateTestDatas.init(); //Generating customer test data
            ctrlModel.testInit(); //Displaying data from the client data array to the console
            // ctrlView.clearFields(); //Clear form fields
        }
    }

    // F-I for collecting information from the Application form
    function collectRequestInformation() {
        const requestName = document.querySelector(formDOM.fullName).value;
        const requestPhone = document.querySelector(formDOM.phone).value;
        const requestEmail = document.querySelector(formDOM.email).value;
        const requestCourseType = document.querySelector(formDOM.courseType).value;

        return {
            requestName,
            requestPhone,
            requestEmail,
            requestCourseType,
        };
    }

    // F-i to define the text node option which is selected
    function findOptionText() {
        const formSelect = document.querySelector(formDOM.mainFormSelect);
        return formSelect.options[formSelect.options.selectedIndex];
    }

    return {
        init: function () {
            console.log("App started");
        },
    };
})(model, formView);

formController.init();
