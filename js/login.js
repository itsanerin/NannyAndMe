//log in
const loginButton = document.getElementById('submit-login');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');

loginButton.onclick = function () {
    const email = loginEmail.value;
    const password = loginPassword.value;
    const promise = firebase.auth().signInWithEmailAndPassword(email, password);
    promise.then(function (credential) {
        location.href = 'user.html?uid=' + credential.user.uid
    });
};
