const reviewsDiv = document.getElementById('reviews');
const reviewRef = firebase.database().ref('reviews').orderByChild('reviewee').equalTo(uid);

let ratingTotal = 0;
let ratingNumber = 0;

ref.on('child_added', function (snapshot) {
    createReview(snapshot.val());
});

function el(tag, clas) {
    const element = document.createElement(tag);
    element.classList.add(clas);
    return element;
}

function createReview(review) {

    // calculate review value
    ratingTotal += review.rating || 0;
    ratingNumber++;
    document.getElementById('user-rating-average').textContent = ratingTotal / ratingNumber

    const reviewDiv = el('div', 'review');
    const reviewText = el('div', 'review-text');
    reviewText.textContent = review.text;
    reviewDiv.appendChild(reviewText);

    const reviewInfo = el('div', 'review-info');

    const author = el('span', 'author');
    const link = el('a');
    author.appendChild(link);
    link.textContent = review.displayName;
    link.href = 'user.html?uid=' + review.reviewer;
    reviewDiv.appendChild(author);

    const date = el('span', 'date');
    date.textContent = review.date.split(' ').slice(0, 4).join(' ');

    const photo = el('div', 'photo');
    const img = new Image();
    img.onlcik = function () {
        location.href = 'user.html?uid=' + review.reviewer;
    }
    photo.appendChild(img);
    reviewDiv.appendChild(photo);

    console.log(review)
    const userRef = firebase.database().ref('parent').child(review.reviewer);
    userRef.once('value', function (snapshot) {
        if (snapshot.val().photo) {
            img.src = snapshot.val().photo;
        }

    });


    reviewInfo.innerHTML += "on ";
    reviewInfo.appendChild(date);

    reviewDiv.appendChild(reviewInfo);
    reviewsDiv.insertBefore(reviewDiv, reviewsDiv.firstElementChild);
}
