
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
]
function init() {
    var mainTitle = document.createElement('h1');
    mainTitle.innerHTML = 'Super Coding Quiz';
    mainTitle.setAttribute('id', 'titleMain')
    contentBox.appendChild(mainTitle);
    ;

    var welcomeMsg = document.createElement('p');
    welcomeMsg.setAttribute('id', 'welcomeMsg');
    welcomeMsg.innerHTML = "This is a timed quiz where incorrect answers result in a 13-second penalty deducted from your remaining time. Do your best and see how high you can score!";
    contentBox.appendChild(welcomeMsg);

    var startBtn = document.createElement('button');
    startBtn.setAttribute('id', 'start-button');
    startBtn.innerHTML = "Start  Quiz";
    contentBox.appendChild(startBtn);
}

function firstQuestion() {
    document.getElementById('titleMain').remove();
    document.getElementById('welcomeMsg').remove();
    document.getElementById('start-button').remove();

    hscoreLink.style.visibility = 'hidden';

    var timer = document.createElement('h3');
    timer.innerHTML = "Time Remaining";
    timer.setAttribute('id', 'timer');
    pageMain.appendChild(timer);
}

init();

var startBtn = document.getElementById('start-button');

startBtn.addEventListener('click', firstQuestion);

