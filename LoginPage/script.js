// Get element by id
var imgleft = document.getElementById('img-left');
var loginform = document.getElementById('login-modal');
var registerform = document.getElementById('register-modal');
var resetPassForm = document.getElementById('resetpass-modal');
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
// user and pass reset
var userReset = document.getElementById('user-reset');
var passReset = document.getElementById('pass-new');
var rePassReset = document.getElementById('pass-new-2');
var warningReset = document.getElementById('need-input-reset');
// Link main page
var urlPage = "MainPage/MainPage.html"
var account = [{ username: "admin", password: "admin", type: "admin" }];
// onload html
function onLoad() {
    // list storage account
    var checkAcc = JSON.parse(window.localStorage.getItem("account"));
    if (!checkAcc) {
        window.localStorage.setItem("account", JSON.stringify(account));
    }
}

// switch login - register
function switchModal() {
    if (loginform.style.display == 'none') {
        loginform.style.display = 'block';
        registerform.style.display = 'none';
    } else {
        loginform.style.display = 'none';
        registerform.style.display = 'block';
    }
}

//  switch login - reset pass
function switchModal2() {
    if (loginform.style.display == 'none') {
        loginform.style.display = 'block';
        resetPassForm.style.display = 'none';
    } else {
        loginform.style.display = 'none';
        resetPassForm.style.display = 'block';
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

function checkExistUsername(username) {
    let check = true;
    checkAcc = JSON.parse(window.localStorage.getItem("account"));
    for (let i = 0; i < checkAcc.length; i++) {
        if (checkAcc[i].username == username) {
            check = false;
        }
    }
    return check;
}

function changePassword(username, password) {
    checkAcc = JSON.parse(window.localStorage.getItem("account"));
    for (let i = 0; i < checkAcc.length; i++) {
        if (checkAcc[i].username == username) {
            checkAcc[i].password = password;
        }
    }
    window.localStorage.setItem("account", JSON.stringify(checkAcc));

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
    let check = checkExistUsername(userRes);
    if (userRes == '' || passRes == '' || rePassRes == '') {
        waringRes.innerText = "Username and Password must fill!";
        clearValueInput();
    } else if (passRes != rePassRes) {
        waringRes.innerText = "Retype Password not same!";
        clearValueInput();
    } else if (check == false) {
        waringRes.innerText = "Username exits!";
        clearValueInput();
    } else if (check == true) {
        clearValueInput();
        waringRes.innerText = "Register Success!";
        waringRes.style.color = "green";
        // account.push(userRes, passRes, type);
        account.push({ username: userRes, password: passRes, type: type });
        window.localStorage.setItem("account", JSON.stringify(account));
        setTimeout(function() {
            switchModal();
        }, 2000)

    }
}

function clearValueInput() {
    let input = document.getElementsByTagName('input');
    for (let i = 0; i < input.length; i++) {
        input[i].value = '';
    }
}

function onResetPass() {
    let usernameReset = userReset.value;
    let passwordReset = passReset.value;
    let rePasswordReset = rePassReset.value;
    let check = checkExistUsername(usernameReset);
    if (usernameReset == '' || passwordReset == '' || rePasswordReset == '') {
        warningReset.innerText = "Username and Password must fill!";
        clearValueInput();
    } else if (passwordReset != rePasswordReset) {
        warningReset.innerText = "Retype Password not same!";
        clearValueInput();
    } else if (check == true) {
        warningReset.innerText = "Username not exits!";
        clearValueInput();
    } else if (check == false) {
        clearValueInput();
        warningReset.innerText = "Reset Password Success!";
        warningReset.style.color = "green";
        changePassword(usernameReset, passwordReset);
        setTimeout(function() {
            switchModal2();
        }, 2000)

    }
}