//document.getElementById shorthand function
function get(id) {
    return document.getElementById(id);
}

//get user id from url
const uid = location.search.split('=')[1];
console.log(uid);

firebase.auth().onAuthStateChanged(function (user) {
    if (user.uid == uid) {
        document.body.classList.add('is-user');
    } else {
        document.body.classList.remove('is-user');
    }
});


//reference database


//get user id from users child
const userRef = firebase.database().ref('parent').child(uid);

//firebase event, any change to database
userRef.on('value', updateUser);

const profileDisplayName = get('profile-display-name');
const ageDisplay = get('age-display');
const userTypeDisplay = get('user-type-display');
const zipcodeDisplay = get('zipcode-display');
const availabilityDisplay = get('availability-display');
const taglineDisplay = get('tagline');
const bioDisplay = get('bio');


function updateUser(snapshot) {
    const user = snapshot.val();

    if (user.photo) {
        displayPhoto(user.photo);
    }
    if (user.userType) {
        userTypeDisplay.textContent = user.userType;
    }
    if (user.age) {
        ageDisplay.textContent = user.age;
    }
    if (user.zipcode) {
        zipcodeDisplay.textContent = user.zipcode;
    }
    if (user.availability) {
        availabilityDisplay.textContent = user.availability;
    }
    if (user.tagline) {
        taglineDisplay.textContent = user.tagline;
    }
    if (user.bio) {
        bioDisplay.textContent = user.bio;
    }

    profileDisplayName.textContent = user.displayName;
    //    profileNameInput.placeholder = user.displayName;

}

/* update data */
const editButton = document.getElementById('edit');
const editProfile = document.getElementById('edit-profile');
const profileNameInput = document.getElementById('edit-display-name');
const profileEditButton = document.getElementById('submit-display-name');
const ageInput = document.getElementById('edit-age');
const userTypeInput = document.getElementById('edit-user-type');
const zipcodeInput = document.getElementById('edit-zipcode');
const availabilityInput = document.getElementById('edit-availability');
const taglineInput = document.getElementById('edit-tagline');
const bioInput = document.getElementById('edit-bio');

editButton.onclick = function () {
    editProfile.style.display = 'block';
    const addPhoto = get('add-photo');
    addPhoto.style.display = 'block';
};

profileEditButton.onclick = updateProfile;

function updateProfile() {

    const username = profileNameInput.value;
    if (username.length > 2) {
        userRef.update({
            displayName: username,
            age: ageInput.value,
            userType: userTypeInput.value,
            zipcode: zipcodeInput.value,
            availability: availabilityInput.value,
            tagline: taglineInput.value,
            bio: bioInput.value
        });
        firebase.auth().currentUser.updateProfile({
            displayName: username
        });
        editProfile.style.display = 'none';
        profileNameInput.classList.remove('error');
    } else {
        profileNameInput.placeholder = "Name must have 3 characters or more.";
        profileNameInput.classList.add('error');
    }
}

//upload profile photo
const photoInput = get('photo-input');
const photoSubmit = get('submit-photo');

photoSubmit.addEventListener('click', uploadPhoto);

function uploadPhoto() {
    const file = photoInput.files[0];
    if (file) {

        const storage = firebase.storage();
        const photoRef = storage.ref('users').child(uid).child('profile-photo');
        const promise = photoRef.put(file);

        promise.then(function (snapshot) {
            return snapshot.ref.getDownloadUrl();
        }).then(updatePhoto);

    } else {
        alert('Click Choose File');
    }

    function updatePhoto(url) {
        ref.update({
            photo: url
        });
    }

    function displayPhoto(url) {
        const profileImg = get('profile-img');
        profileImg.src = url;
        const addPhoto = get('add-photo');
        addPhoto.style.display = 'none';
    }
}
