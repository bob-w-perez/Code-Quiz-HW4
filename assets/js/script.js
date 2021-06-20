
var pageMain = document.querySelector('main');
var contentBox = document.getElementById('content-box');
var hscoreLink = document.getElementById('hsLink');

var qBank = [
    {
        question: "A very useful tool during development and debugging for printing content to the debugger is:",
        answer1: "JavaScript",
        answer2: "terminal / bash",
        answer3: "for loops",
        answer4: "console.log"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        answer1: "commas",
        answer2: "curly brackets",
        answer3: "quotes",
        answer4: "parentheses"
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
    contentBox.appendChild(answer1);
    
    var answer2 = document.createElement('h4');
    answer2.innerHTML = qMixed[0][0].answer2; 
    answer2.setAttribute('class', 'answer-choice');
    contentBox.appendChild(answer2);

    var answer3 = document.createElement('h4');
    answer3.innerHTML = qMixed[0][0].answer3; 
    answer3.setAttribute('class', 'answer-choice');
    contentBox.appendChild(answer3);

    var answer4 = document.createElement('h4');
    answer4.innerHTML = qMixed[0][0].answer4; 
    answer4.setAttribute('class', 'answer-choice');
    contentBox.appendChild(answer4);
}

function makeTimer() {
    var timer = document.createElement('h2');
    timer.innerHTML = "Time Remaining";
    timer.setAttribute('id', 'timer');
    pageMain.appendChild(timer);
}

init();

var startBtn = document.getElementById('start-button');

startBtn.addEventListener('click', firstQuestion);


