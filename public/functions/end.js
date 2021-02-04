const username = document.getElementById('username');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup',()=>{
    saveScoreBtn.disabled = !username.value;
});


document.querySelector("#saveScoreBtn").addEventListener("click", (e)=>{
    e.preventDefault();

    db.collection("highScores").add({
        name: username.value,
        score: Number(mostRecentScore)
      })
      .then((doc) => {
        console.log(`success (${doc.id})`);
      })
      .catch((error) => {
        console.log(`failed (${error})`);
      });
     
    setTimeout(() => {
        window.location.assign('../index.html');
    },700);
  
});

