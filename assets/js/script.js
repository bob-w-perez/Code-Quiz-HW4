
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

    }
];


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
}

function makeTimer() {
    var timerText = document.createElement('ul');
    timerText.innerHTML = "Time Remaining:";
    timerText.setAttribute('id', 'timer-text');
    contentBox.appendChild(timerText);

    var timerNum = document.createElement('li');
    timerNum.innerHTML = 60 + "s";
    timerNum.setAttribute('id', 'timer-num');
    timerText.appendChild(timerNum);
}

function mixQuestions() {
    var qMixed = [];
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
    var qMixed = mixQuestions();

    var questionCount = 1;

    contentBox.setAttribute('style', 'text-align: left; align-items: flex-start; padding-left: 4em')
    

    var question = document.createElement('h3');
    question.innerHTML = qMixed[0][0].question; 
    question.setAttribute('id', 'question-text');
    contentBox.appendChild(question);

    var answer1 = document.createElement('h4');
    answer1.innerHTML = qMixed[0][0].answer1; 
    answer1.setAttribute('class', 'answer-choice');
    answer1.setAttribute('id', 'answer-1');
    contentBox.appendChild(answer1);
    
    var answer2 = document.createElement('h4');
    answer2.innerHTML = qMixed[0][0].answer2; 
    answer2.setAttribute('class', 'answer-choice');
    answer2.setAttribute('id', 'answer-2');
    contentBox.appendChild(answer2);

    var answer3 = document.createElement('h4');
    answer3.innerHTML = qMixed[0][0].answer3; 
    answer3.setAttribute('class', 'answer-choice');
    answer3.setAttribute('id', 'answer-3');
    contentBox.appendChild(answer3);

    var answer4 = document.createElement('h4');
    answer4.innerHTML = qMixed[0][0].answer4; 
    answer4.setAttribute('class', 'answer-choice');
    answer4.setAttribute('id', 'answer-4');
    contentBox.appendChild(answer4);

    var answerObjs = document.getElementsByClassName('answer-choice');
    for (var i = 0; i < answerObjs.length; i++){
        if (answerObjs[i].innerHTML == qMixed[0][0].correctAnswer) {
            answerObjs[i].addEventListener('click', function(){rightWrong('right')});
        } else {
            answerObjs[i].addEventListener('click', function(){rightWrong('wrong')});
        }
    }

    // return [questionCount, qMixed];
}

function rightWrong(answer) {
    var questionBox = document.getElementById('question-text');

    if (answer == 'right'){
        questionBox.innerHTML = "CORRECT"
        questionBox.setAttribute('style', 'width: 70%; align-self: center; font-size: 3em; padding: 0.1em; text-align: center; color: #00CD03');
    } else {
        questionBox.innerHTML = "WRONG"
        questionBox.setAttribute('style', 'width: 70%; align-self: center; font-size: 3em; padding: 0.1em; text-align: center; color: #DD0C0C');
    }
}

function nextQuestion() {
    console.log('TEST 1')
//     var question = document.getElementById('question');
//     question.innerHTML = qMixed[0][0].question; 
//     contentBox.appendChild(question);

//     var answer1 = document.getElementById('answer-1');
//     answer1.innerHTML = qMixed[0][0].answer1; 
//     contentBox.appendChild(answer1);
    
//     var answer2 = document.getElementById('answer-2');
//     answer2.innerHTML = qMixed[0][0].answer2; 
//     contentBox.appendChild(answer2);

//     var answer3 = document.getElementById('answer-3');
//     answer3.innerHTML = qMixed[0][0].answer3; 
//     contentBox.appendChild(answer3);

//     var answer4 = document.getElementById('answer-4');
//     answer4.innerHTML = qMixed[0][0].answer4; 
//     contentBox.appendChild(answer4);
}


init();

var startBtn = document.getElementById('start-button');
startBtn.addEventListener('click', firstQuestion);


