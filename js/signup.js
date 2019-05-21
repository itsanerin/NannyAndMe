//sign up
const signupButton = document.getElementById('submit-signup');
const signupUsername = document.getElementById('signup-username');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');

//console.log(signupButton, signupUsername, signupEmail, signupPassword);

signupButton.onclick = createUser;

function updateUser(credential, type) {
    const userInfo = {
        displayName: signupUsername.value
    };
    credential.user.updateProfile(userInfo);


    // add user to database
    const db = firebase.database();
    const ref = db.ref(type).child(credential.user.uid);
    const promise = ref.set(userInfo);

    promise.then(function () {
        // send to personal profile page
        location.href = 'user.html?uid=' + credential.user.uid;
    });
    promise.catch(function (error) {
        console.log(error);
        alert(error.message);
    });

}


function createUser() {
    const email = signupEmail.value;
    const password = signupPassword.value;

    const types = document.getElementsByName('type-bubble');
    console.log(types, types[0].checked, types[1].checked)
    let type = undefined;
    if (types[0].checked) {
        type = 'parent';
    } else if (types[1].checked) {
        type = 'nanny';
    }

    const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log(type);
    promise.then(function (credential) {
        updateUser(credential, type)
    });
    promise.catch(function (error) {
        console.log(error);
        alert(error.message);
    });
}
