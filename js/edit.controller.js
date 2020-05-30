const editController = ((ctrlModel, ctrlEditView) => {

    // Ф-я получения редактировангого обьекта
    function editCurrentRequest () {
        const currentRequest = ctrlModel.data.editedRequest;
        console.log("editCurrentRequest -> currentRequest", currentRequest)
        ctrlEditView.displayRequestData(currentRequest);
    }


    return {
        init: function () {
            editCurrentRequest();
        }
    }
})(model, editView);

editController.init();