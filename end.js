const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;
console.log(highScores);

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup',()=>{
    saveScoreBtn.disabled = !username.value;

});


saveHighScore = e =>{
    e.preventDefault();
    //local storage
    const score ={
        score:mostRecentScore,
        name:username.value
    };
    //順位の並び替え
    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5);
    //updadate
    localStorage.setItem('highScores',JSON.stringify(highScores));
    window.location.assign('index.html');
}