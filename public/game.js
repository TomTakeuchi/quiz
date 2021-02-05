const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

firebase.initializeApp(firebaseConfig);
firebase.analytics();


const db = firebase.firestore();

db.collection('questions').get().then((query)=>{
    let allData = [];
    query.forEach((doc)=>{
        let data = doc.data();
        allData.push(data);
    });
    questions = allData;
    startGame();
}).catch((error)=>{
    console.log(`データの取得に失敗しました (${error})`);
});    



// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
}

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        //TOTAL SCORE //as a string
        localStorage.setItem('mostRecentScore',score);
        //go to the end page
        return window.location.assign('end.html');
    }
    questionCounter ++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    //update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice =>{
        const number =choice.dataset['number'];
        choice.innerText=currentQuestion['choice' + number];
    });
    availableQuestions.splice(questionIndex,1);
    acceptingAnswer = true;
}

choices.forEach(choice => {
    choice.addEventListener('click',event => {
        if(!acceptingAnswer)return;
        acceptingAnswer = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer? 'correct':'incorrect';

        if(classToApply=='correct'){
             incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
    });
});

incrementScore = num =>{
    score +=num;
    scoreText.innerHTML = score;
}


