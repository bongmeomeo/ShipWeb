var loginform = document.getElementById('login-modal');
var registerform = document.getElementById('register-modal');

function switchModal() {
    if (loginform.style.display == 'none') {
        loginform.style.display = 'block';
        registerform.style.display = 'none';
    } else {
        loginform.style.display = 'none';
        registerform.style.display = 'block';
    }

}