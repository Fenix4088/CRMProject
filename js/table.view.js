const tableView = (() => {
    const tableDomStrings = {
        mainTable: "[data-main-table]",
    }
    // Ф-я отображения заявок
    function displayClientInfo (obj) {
        
        const mainTableBody = document.querySelector(tableDomStrings.mainTable).querySelector("tbody");
        console.log(mainTableBody);
        const tableRow = `<tr>
                        <th scope="row">${obj.id}</th>
                        <td>${obj.date}</td>
                        <td>${obj.coursName}</td>
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
                    </tr>`
                    mainTableBody.insertAdjacentHTML('beforeend', tableRow);
        
    }


    return {
        displayClientInfo,
    }
    
})();