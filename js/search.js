// get search term & query database

const query = document.getElementById('query');
const submitQuery = document.getElementById('submit-query');

const db = firebase.database();
const ref = db.ref('nanny').orderByChild('text');

// search when you click search button...
submitQuery.addEventListener('click', getQuery);
//... or when you press enter
query.addEventListener('keydown', function (event) {
    if (event.key == 'Enter' || event.which == 13) {
        getQuery();
    }
});

function getQuery() {
    const value = query.value;
    ref.on('child_added', function (snapshot) {
        const post = snapshot.val();
        console.log(post.text);
        if (post.text.includes(value) {
                //create post
                console.log(post.text);
            })
    });
}
