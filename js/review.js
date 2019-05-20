const reviewText = document.getElementById('write-review');
const submitReview = document.getElementById('submit-review');

const db = firebase.database();
const ref = db.ref('reviews');

//add a new review to the database
function addReview() {

    const ratings = document.getElementsByName('stars');
    let rating = 0;
    for (let i = 0; i < ratings.length; i++) {
        if (ratings[i].checked) {
            rating = i;
        }
    }
    if (rating == 0) {
        alert('please add a rating');
    }
    console.log(rating)

    const info = {
        text: reviewText.value,
        date: Date(),
        reviewer: firebase.auth().currentUser.uid,
        //user being reviewed
        reviewee: uid,
        displayName: firebase.auth().currentUser.displayName,
        rating: rating
    };

    const promise = ref.push(info);
    promise.then(function () {
        //indicate that review went through
        reviewText.value = '';
    });
    promise.catch(function (error) {
        alert(error.message);
    });
}

submitReview.addEventListener('click', addReview);
reviewText.addEventListener('keydown', function (event) {
    if (event.which == 13 || event.key == 'Enter') {
        addReview();
    }
});
