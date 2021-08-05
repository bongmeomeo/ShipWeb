let groupBtn = document.getElementById('group-btn');
let iconBar = document.getElementById('icon-bar');
let notifyBell = document.getElementById('icon-notify');
let listOrder = document.getElementById('list-order');
let foodOrder = document.getElementById('food-order');
// get table history
let bodyTable = document.getElementById('body-table');
let tableList = document.getElementById('dashTable');
let overView = document.getElementById('overview');
let infor = document.getElementById('infor');
let rate = document.getElementById('rate');

// get table today ship
let tableToday = document.getElementById('tableToday');
let bodyTableToday = document.getElementById('body-table-today');





//  change view follow button on click
function onClickBtnView(view) {
    switch (view) {
        case 'overview':
            tableList.style.display = 'none';
            overView.style.display = 'block';
            infor.style.display = 'none';
            rate.style.display = 'none';
            onLoadShipToday();
            break;
        case 'history':
            tableList.style.display = 'block';
            overView.style.display = 'none';
            infor.style.display = 'none';
            rate.style.display = 'none';
            onLoadShipHis();
            break;
        case 'infor':
            tableList.style.display = 'none';
            overView.style.display = 'none';
            infor.style.display = 'block';
            rate.style.display = 'none';
            break;
        case 'rate':
            tableList.style.display = 'none';
            overView.style.display = 'none';
            infor.style.display = 'none';
            rate.style.display = 'block';
            break;

    }
}


function onLoadShipHis() {
    bodyTable.innerHTML = '';
    let i = 1;
    // use fetch to get data from json
    fetch('./listship.json')
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            // console.log(data);
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
                                                        <th scope="row">${i}</th>
                                                        <td>${address}</td>
                                                        <td>${date}</td>
                                                        <td>${time}</td>
                                                        <td>${price} VNĐ</td>
                                                        <td>${note}</td>
                                                    </tr>
                                            `
                bodyTable.appendChild(r);
                i++;
            })

        })
};

function onLoadShipToday() {
    var order;
    bodyTableToday.innerHTML = '';
    let i = 1;
    // use fetch to get data from json
    fetch('./listtoday.json')
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            // console.log(data);
            data.forEach(function(object) {
                let stt = object.id;
                let time = object.time;
                let date = object.date;
                let address = object.address;
                let price = object.price;
                let note = object.note;
                // show food order
                order = object.food;
                console.log(order)
                let r = document.createElement("TR");
                console.log(r);
                r.id = "order" + stt;
                let idstatus = "status" + stt;

                r.innerHTML = `
                                                 <tr onclick="ChangeBgColor()">
                                                    <th scope="row">${i}</th>
                                                    <td>${address}</td>
                                                    <td>${date}</td>
                                                    <td>${time}</td>
                                                    <td>${price} VNĐ </td>
                                                    <td>${note}</td>
                                                    <td >
                                                    <div id=${idstatus} class="status-ship">
                                                    Chưa nhận 
                                                    </div>
                                                    </td>
                                                    <td>
                                                    <div onclick="changeBgColor(${i})" class="view-order-btn text-center">Xem đơn <i class="fa fa-arrow-right" aria-hidden="true"></i> </div>
                                                    </td>
                                              
                                                </tr>
                                        `
                bodyTableToday.appendChild(r);
                i++;
            })

        })
};
// show list food order for each ship bill
function changeBgColor(num) {
    fetch('./listtoday.json')
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            // console.log(data);
            let order = data[num].food;
            console.log(order);
        })
}