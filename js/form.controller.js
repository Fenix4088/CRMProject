const formController = ((ctrlModel, ctrlView) => {
// Берем из шаблога обьект с формой и ее элементами
const formDOM = ctrlView.getDOMElements();

document.querySelector(formDOM.formMain).addEventListener("submit", creatRequest);

// Ф-я создания заявки
function creatRequest (e) {
    e.preventDefault();
    ctrlModel.saveRequestData();
}



    return {
        init: function () {
            console.log("App started")
        }
    }
})(model, formView);

formController.init();