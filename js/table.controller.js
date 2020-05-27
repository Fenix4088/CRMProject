const tableController = ((ctrlModel, ctrlView) => {



    return {
        init: function () {
            console.log("CRM requests list started!")
            ctrlModel.data.clientsDataBase.forEach( item => {
                ctrlView.displayClientInfo(item);
            });

        }
    }
    
})(model, tableView);


tableController.init();