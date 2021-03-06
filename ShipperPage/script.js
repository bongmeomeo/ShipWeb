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

// get confirm status 
let valueConfirm = document.getElementById('status-select');





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
                                                        <td>${price} VN??</td>
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
                                                 <tr >
                                                    <th scope="row">${i}</th>
                                                    <td>${address}</td>
                                                    <td>${date}</td>
                                                    <td>${time}</td>
                                                    <td>${price} VN?? </td>
                                                    <td>${note}</td>
                                                    <td >
                                                    <div id=${idstatus} class="status-ship">
                                                    Ch??a nh???n 
                                                    </div>
                                                    </td>
                                                    <td>
                                                    <div onclick="changeBgColor(${i}, ${stt})" class="view-order-btn text-center">Xem ????n <i class="fa fa-arrow-right" aria-hidden="true"></i> </div>
                                                    </td>
                                              
                                                </tr>
                                        `
                bodyTableToday.appendChild(r);
                i++;
                console.log(idstatus + "      idstatus    ")
            })

        })
};
// show list food order for each ship bill

function changeBgColor(num, stt) {
    document.getElementById('btn-select').innerHTML = '';
    foodOrder.innerHTML = '';
    var totalPrice = 0;
    fetch('./listtoday.json')
        .then(function(resp) {
            return resp.json();
        })
        .then(function(data) {
            // console.log(data);
            let order = data[num - 1].food;
            console.log(order);
            order.forEach(function(data) {
                console.log(data)
                let name = data.name;
                let number = data.number;
                let price = data.price * number;
                totalPrice += price;
                let div = document.createElement("tr");
                div.innerHTML = `
                 <tr>
                <td>${name}</td>
                <td>${data.number}</td>
                <td>${data.price} VN??</td>
                <td>${price} VN??</td>
              </tr>
                    `

                foodOrder.appendChild(div);

            })
            let div2 = document.createElement("div");
            div2.innerHTML = `
              
                <button class="btn btn-view ml-2" id="confirm-status" onclick="onClickConfirm(${stt})">X??c nh???n</button>
                `
            document.getElementById('btn-select').appendChild(div2);
            document.getElementById('food-total').innerText = "T???ng gi??: " + totalPrice + " VN??";
            // document.getElementById('confirm-status').onclick = onClickConfirm(_idStatus);
        })

};
console.log(valueConfirm.value)

function onClickConfirm(stt) {
    let status = document.getElementById("status" + stt);
    console.log(status.innerHTML + "               sdasd")
    switch (valueConfirm.value) {
        case '1':
            status.innerText = "??ang giao";
            status.style.backgroundColor = '#df8927';
            break;
        case '2':
            status.innerText = "???? ho??n th??nh";
            status.style.backgroundColor = 'rgb(17, 228, 17)';
            break;
        case '3':
            status.innerText = "???? hu???";
            status.style.backgroundColor = 'rgb(253, 62, 62)';
            break;

    }
}