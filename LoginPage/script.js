// Get element by id
var imgleft = document.getElementById('img-left');
var loginform = document.getElementById('login-modal');
var registerform = document.getElementById('register-modal');
// user and pass login
var userlog = document.getElementById('user');
var passlog = document.getElementById('pass');
var warninglog = document.getElementById('need-input-log');
// loader
var loader = document.getElementById('loader-wrapper');
// user and pass register
var userres = document.getElementById('user-res');
var passres = document.getElementById('pass-res');
var repassres = document.getElementById('pass-res-2');
var typeacc = document.getElementById('select-type-acc');
var waringRes = document.getElementById('need-input-regis');
// Link main page
var urlPage = "MainPage/MainPage.html"
    // list storage account
var account = [{ username: "admin", password: "admin", type: "admin" }];
var checkAcc = JSON.parse(window.localStorage.getItem("account"));

function switchModal() {
    if (loginform.style.display == 'none') {
        loginform.style.display = 'block';
        registerform.style.display = 'none';
    } else {
        loginform.style.display = 'none';
        registerform.style.display = 'block';
    }
}

function loginCheck() {
    let username = userlog.value;
    let password = passlog.value;
    let check = checkAccount(username, password);
    if (username == '' || password == '') {
        warninglog.innerText = "Username and Password must fill!";
    } else if (username != 'admin' && password != 'admin') {
        warninglog.innerText = "Username or Password was wrong!";
    } else if (check == false) {
        warninglog.innerText = "Username not found! Please Register!";
    } else if (check == true) {
        loginSucces();
    }
}

function checkAccount(username, password) {
    let check = false;
    checkAcc = JSON.parse(window.localStorage.getItem("account"));
    for (let i = 0; i < checkAcc.length; i++) {
        if (checkAcc[i].username == username && checkAcc[i].password == password) {
            check = true;
        }
    }
    return check;
}

function loginSucces() {
    loader.style.display = 'block';
    setTimeout(function() {
        window.location.pathname = urlPage;
    }, 2000);
}

function onSignUp() {
    let userRes = userres.value;
    let passRes = passres.value;
    let rePassRes = repassres.value;
    let type = typeacc.value;
    if (userRes == '' || passRes == '' || rePassRes == '') {
        waringRes.innerText = "Username and Password must fill!";
    } else if (passRes != rePassRes) {
        waringRes.innerText = "Retype Password not same!";
    } else {
        waringRes.innerText = "Register Success!";
        waringRes.style.color = "green";
        account.push(userRes, passRes, type);
        window.localStorage.setItem("account", JSON.stringify(account));
        setTimeout(function() {
            switchModal();
        }, 2000)

    }
}