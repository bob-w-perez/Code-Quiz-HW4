
var pageMain = document.querySelector('main');
var contentBox = document.getElementById('content-box');
var hscoreLink = document.getElementById('hsLink');

var qBank = [
    {
        question: "A very useful tool during development and debugging for printing content to the debugger is:",
        answer1: "JavaScript",
        answer2: "terminal / bash",
        answer3: "for loops",
        answer4: "console.log",
        correctAnswer: "console.log"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answer1: "commas",
        answer2: "curly brackets",
        answer3: "quotes",
        answer4: "parentheses",
        correctAnswer: "quotes"
    },
    {
        question: "<code>.menu-item::before</code> uses which of the following CSS selectors:",
        answer1: "id and pseudo-class",
        answer2: "class and pseudo-element",
        answer3: "id and pseudo-element",
        answer4: "class and pseudo-class",
        correctAnswer: "class and pseudo-element"
    },
    {
        question: "<code>myVar = [[a, b, c], [1, 2, 3], [x, y, z], [7, 8, 9]]</code> is an array with 4 elements, each of which is another array. What is the correct syntax to access <code>y</code>?",
        answer1: "myVar[2][1]",
        answer2: "myVar[3].2",
        answer3: "myVar[3][2]",
        answer4: "myVar[2[1]]",
        correctAnswer: "myVar[2][1]"
    }
];

var qMixed = [];
var questionCount = 1;
var timerCount = 60;



function init() {
    var mainTitle = document.createElement('h1');
    mainTitle.innerHTML = 'Super Coding Quiz';
    mainTitle.setAttribute('id', 'titleMain');
    contentBox.appendChild(mainTitle);
    

    var welcomeMsg = document.createElement('p');
    welcomeMsg.setAttribute('id', 'welcomeMsg');
    welcomeMsg.innerHTML = "This is a timed quiz where incorrect answers result in a 13-second penalty deducted from your remaining time. Do your best and see how high you can score!";
    contentBox.appendChild(welcomeMsg);

    var startBtn = document.createElement('button');
    startBtn.setAttribute('id', 'start-button');
    startBtn.innerHTML = "Start  Quiz";
    contentBox.appendChild(startBtn);

    startBtn.addEventListener('click', firstQuestion);
}


function makeTimer() {
    var timerText = document.createElement('ul');
    timerText.innerHTML = "Time Remaining:";
    timerText.setAttribute('id', 'timer-text');
    contentBox.appendChild(timerText);

    var timerNum = document.createElement('li');
    timerNum.innerHTML = timerCount + "s";
    timerNum.setAttribute('id', 'timer-num');
    timerText.appendChild(timerNum);

    timerCount = 60;

    // not using 'var' to make global scope
    timerInterval = setInterval(function() {
        if (timerCount > 1) {
            timerCount--;
            timerNum.innerHTML = timerCount + "s";
        }
        else {
            timerCount--;
            timerNum.innerHTML = timerCount + "s";
            clearInterval(timerInterval);
            gameLose();
        }
    }, 1000);
}


function mixQuestions() {
    qMixed = [];
        while (qBank.length) {
            qMixed.push(qBank.splice(Math.floor(Math.random()*(qBank.length)),1));
        };
    return qMixed;
}


function firstQuestion() {
    hscoreLink.style.visibility = 'hidden';
    
    document.getElementById('titleMain').remove();
    document.getElementById('welcomeMsg').remove();
    document.getElementById('start-button').remove();

    makeTimer();
    qMixed = mixQuestions();

    questionCount = 1;

    contentBox.setAttribute('style', 'text-align: left; align-items: flex-start; padding-left: 2em');
    
// perhaps add a feature to shuffle the answer orders
    var question = document.createElement('h3');
    question.innerHTML = qMixed[0][0].question; 
    question.setAttribute('id', 'question-text');
    question.setAttribute('qIndex', 0);
    contentBox.appendChild(question);

    var answer1 = document.createElement('h4');
    answer1.innerHTML = qMixed[0][0].answer1; 
    answer1.setAttribute('class', 'answer-choice');
    answer1.setAttribute('id', 'answer-1');
    answer1.setAttribute('qIndex', 0);
    contentBox.appendChild(answer1);
    
    var answer2 = document.createElement('h4');
    answer2.innerHTML = qMixed[0][0].answer2; 
    answer2.setAttribute('class', 'answer-choice');
    answer2.setAttribute('id', 'answer-2');
    answer2.setAttribute('qIndex', 0);
    contentBox.appendChild(answer2);

    var answer3 = document.createElement('h4');
    answer3.innerHTML = qMixed[0][0].answer3; 
    answer3.setAttribute('class', 'answer-choice');
    answer3.setAttribute('id', 'answer-3');
    answer3.setAttribute('qIndex', 0);
    contentBox.appendChild(answer3);

    var answer4 = document.createElement('h4');
    answer4.innerHTML = qMixed[0][0].answer4; 
    answer4.setAttribute('class', 'answer-choice');
    answer4.setAttribute('id', 'answer-4');
    answer4.setAttribute('qIndex', 0);
    contentBox.appendChild(answer4);
}


function rightAnswer() {
    var questionBox = document.getElementById('question-text');

    questionBox.innerHTML = "CORRECT";
    questionBox.setAttribute('style', 'width: 70%; align-self: center; font-size: 3em; padding: 0.1em; text-align: center; color: rgb(16, 211, 19)');
     
    if (questionCount < qMixed.length){
        setTimeout(nextQuestion, 600);
    } else {
        setTimeout(gameWin, 600);
        clearInterval(timerInterval);
    }
}


function wrongAnswer() {
    var questionBox = document.getElementById('question-text');

    questionBox.innerHTML = "WRONG";
    questionBox.setAttribute('style', 'width: 70%; align-self: center; font-size: 3em; padding: 0.1em; text-align: center; color: rgb(191, 18, 18)');

    if (timerCount > 13) {
        timerCount -= 13;
        document.getElementById('timer-num').innerHTML = timerCount + "s";
        // add red timer flash
    } else {
        timerCount = 1;
        document.getElementById('timer-num').innerHTML = timerCount + "s";
        
        // add red timer flash
        return;
    }

    if (questionCount < qMixed.length){
        setTimeout(nextQuestion, 600);
    } else {
        setTimeout(gameWin, 600);
        clearInterval(timerInterval);

    }
}


function nextQuestion() {
    questionCount += 1;
 
    var questionBox = document.getElementById('question-text');
    questionBox.setAttribute('style', 'width: 90%; align-self: flex-start; font-size: 1.7em; padding: 0.8em 2em; text-align: left; color: black');
    questionBox.innerHTML = qMixed[questionCount - 1][0].question; 

    var answer1 = document.getElementById('answer-1');
    answer1.setAttribute('qIndex', questionCount - 1);
    answer1.innerHTML = qMixed[questionCount - 1][0].answer1;
    answer1.setAttribute('style', 'background-color: rgb(12, 43, 157, 0.95)'); 
    
    var answer2 = document.getElementById('answer-2');
    answer2.setAttribute('qIndex', questionCount - 1);
    answer2.innerHTML = qMixed[questionCount - 1][0].answer2;
    answer2.setAttribute('style', 'background-color: rgb(12, 43, 157, 0.95)'); 

    var answer3 = document.getElementById('answer-3');
    answer3.setAttribute('qIndex', questionCount - 1);
    answer3.innerHTML = qMixed[questionCount - 1][0].answer3; 
    answer3.setAttribute('style', 'background-color: rgb(12, 43, 157, 0.95)'); 

    var answer4 = document.getElementById('answer-4');
    answer4.setAttribute('qIndex', questionCount - 1);
    answer4.innerHTML = qMixed[questionCount - 1][0].answer4; 
    answer4.setAttribute('style', 'background-color: rgb(12, 43, 157, 0.95)');  
}

function gameWin() {
    hscoreLink.style.visibility = 'visible';
    
    document.getElementById('question-text').remove();
    document.getElementById('answer-1').remove();
    document.getElementById('answer-2').remove();
    document.getElementById('answer-3').remove();
    document.getElementById('answer-4').remove();
    document.getElementById('timer-text').remove();


    contentBox.setAttribute('style', 'text-align: center; align-items: center; padding-left: 2em');

    var endWin = document.createElement('h2');
    endWin.setAttribute('id', 'end-win');

    switch (true) {
        case  (timerCount > 45):
            endWin.innerHTML = "You are AMAZING!";
            break;
        case (timerCount > 30):
            endWin.innerHTML = "Great job on the quiz!";
            break;
        case (timerCount > 15):
            endWin.innerHTML = "Quiz done, good work";
            break;
        case (timerCount > 5):
            endWin.innerHTML = "Finally finished";
            break;
        case (timerCount > 0):
            endWin.innerHTML = "Done...barely made it!";
    }
    contentBox.appendChild(endWin);

    var yourScore = document.createElement('p');
    yourScore.setAttribute('id', 'your-score');
    yourScore.innerHTML = "Your final score is " + timerCount + '!';
    contentBox.appendChild(yourScore);

    var scoreForm = document.createElement('form');
    scoreForm.setAttribute('id', 'score-form');
    scoreForm.setAttribute('action', './highscores.html');
    contentBox.appendChild(scoreForm);

    var nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'name-input');
    nameInput.setAttribute('placeholder', 'Enter initials...');
    scoreForm.appendChild(nameInput);

    var subBtn = document.createElement('input');
    subBtn.setAttribute('type', 'submit');
    subBtn.setAttribute('id', 'submit-btn');
    scoreForm.appendChild(subBtn);

    subBtn.addEventListener('click', function(event){
        submitScore(nameInput.value, timerCount, event);
    });

}

function submitScore(name, score, event) {

   var storedScores = JSON.parse(localStorage.getItem('highscores'));

   if (name != ""){
       // order of scoreList
       // time/date property
        var newScore = {
            name: name,
            score: score
        };
   } else {
       event.preventDefault();
       alert("Please enter initials to continue.");
       return;
   }
   

   if (storedScores !== null) {
       storedScores.push(newScore);
   } else {
       storedScores = [newScore];
   }

   localStorage.setItem('highscores', JSON.stringify(storedScores));

}


function gameLose() {
    hscoreLink.style.visibility = 'visible';
    
    document.getElementById('question-text').remove();
    document.getElementById('answer-1').remove();
    document.getElementById('answer-2').remove();
    document.getElementById('answer-3').remove();
    document.getElementById('answer-4').remove();
    document.getElementById('timer-text').remove();

    var endLose = document.createElement('h2');
    endLose.setAttribute('id', 'end-lose');
    endLose.innerHTML = "OUT OF TIME";
    contentBox.appendChild(endLose);

    var tryAgain = document.createElement('p');
    tryAgain.setAttribute('id', 'try-again');
    tryAgain.innerHTML = "Looks like you did not finish the quiz in the allotted time. Click below to try again, or click above to view the Highscores.";
    contentBox.appendChild(tryAgain);

    var newBtn = document.createElement('input');
    newBtn.setAttribute('type', 'button');
    newBtn.setAttribute('id', 'new-btn');
    newBtn.setAttribute('value', 'Try Again?');
    // newBtn.innerHTML = "Try Again?";
    contentBox.appendChild(newBtn);

    newBtn.addEventListener('click', function(){location.reload()});
}


contentBox.addEventListener('click', function(event) {
    var element = event.target;

    if (element.matches('.answer-choice') && element.innerHTML == qMixed[element.getAttribute('qIndex')][0].correctAnswer) {
        element.setAttribute('style','background-color: rgb(16, 211, 19, 0.8) !important');
        rightAnswer();
       
    } else if (element.matches('.answer-choice')) {
        element.setAttribute('style', 'background-color: rgb(191, 18, 18, 0.8) !important');
        wrongAnswer();
    }
});


init();




