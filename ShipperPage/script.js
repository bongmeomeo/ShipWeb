let groupBtn = document.getElementById('group-btn');
let iconBar = document.getElementById('icon-bar');
let bodyTable = document.getElementById('body-table');
let tableList = document.getElementById('dashTable');



// incomplete
function onClickBar() {
    if (groupBtn.style.display == 'none') {
        groupBtn.style.display = 'block';

    }
}

function onLoadShip() {
    tableList.style.display = 'block';
    // use fetch to get data from json
    fetch('./listship.json')
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            console.log(data);
            data.forEach(function(object) {
                let stt = object.id;
                let time = object.time;
                let date = object.date;
                let address = object.address;
                let price = object.price;
                let note = object.note;
                let r = document.createElement("TR");
                r.id = stt;
                r.innerHTML = `
                                                     <tr>
                                                        <th scope="row">${stt}</th>
                                                        <td>${address}</td>
                                                        <td>${date}</td>
                                                        <td>${time}</td>
                                                        <td>${price}</td>
                                                        <td>${note}</td>
                                                        <td></td>
                                                    </tr>
                                            `
                bodyTable.appendChild(r);
            })

        })
};