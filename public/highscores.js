const highScoresList = document.getElementById('highScoresList');
// const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.collection("highScores").orderBy("score","desc").get().then((query) => {
    var highScores = [];
     query.forEach( (doc) => {
        let data = doc.data();
        highScores.push(data);
     });
     highScoresList.innerHTML = highScores.slice(0,5).map(score => {
        return `<li class='high-score'>${score.name} - ${score.score}</li>`;
    }).join(''); 
     console.log(highScores);    
  }).catch( (error) => {
     console.log(`データの取得に失敗しました (${error})`);
  });


