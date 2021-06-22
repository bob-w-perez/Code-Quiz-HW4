
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


// this function is called on page load and creates elements for welcome page
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

// creates the elements to display the timer and starts it running
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

    // not using 'var' makes this global scope so it can be stopped by other functions
    timerInterval = setInterval(function() {
        if (timerCount > 1) {
            timerCount--;
            timerNum.innerHTML = timerCount + "s";
        }

        // if the time runs out the gameLose() function is called
        else {
            timerCount--;
            timerNum.innerHTML = timerCount + "s";
            clearInterval(timerInterval);
            gameLose();
        }
    }, 1000);
}

// takes hardcoded array of question objects (qBank) and randomizes the order of the objects within the array as well as the values for each answer key within each question object
function mixQuestions() {

    // shuffles question order into new array (qMixed)
    qMixed = [];
    while (qBank.length) {
        qMixed.push(qBank.splice(Math.floor(Math.random()*(qBank.length)),1));
    };

    // shuffles answer order for each question
    var holder = [];

    for ( var i = 0; i < qMixed.length; i++) {
        holder.push(qMixed[i][0].answer1);
        holder.push(qMixed[i][0].answer2);
        holder.push(qMixed[i][0].answer3);
        holder.push(qMixed[i][0].answer4);

        shuffle(holder);

        qMixed[i][0].answer1 = holder[0];
        qMixed[i][0].answer2 = holder[1];
        qMixed[i][0].answer3 = holder[2];
        qMixed[i][0].answer4 = holder[3];

        holder = [];
    }
    return qMixed;
}

// shuffle function copied from "https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array"
function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// called when user presses 'Start Quiz' button, replaces welcome screen elements with first quiz question 
function firstQuestion() {
    hscoreLink.style.visibility = 'hidden';
    
    document.getElementById('titleMain').remove();
    document.getElementById('welcomeMsg').remove();
    document.getElementById('start-button').remove();

    makeTimer();
    qMixed = mixQuestions();

    questionCount = 1;

    contentBox.setAttribute('style', 'text-align: left; align-items: flex-start; padding-left: 2em');
    
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

// called when user selects the correct answer for a question
function rightAnswer() {
    var questionBox = document.getElementById('question-text');
    questionBox.innerHTML = "CORRECT";
    questionBox.setAttribute('style', 'width: 70%; align-self: center; font-size: 3em; padding: 0.1em; text-align: center; color: rgb(16, 211, 19)');
    
    // if the current question is not the last question the nextQuestion() function is called after a 0.6s timeout which allows the dynamic feedback to be displayed and seen
    if (questionCount < qMixed.length){
        setTimeout(nextQuestion, 600);

    // if the current question IS the last question then the gameWin() function is called
    } else {
        setTimeout(gameWin, 600);
        clearInterval(timerInterval);
    }
}

// called when user selects the wrong answer for a question
function wrongAnswer() {
    var questionBox = document.getElementById('question-text');
    questionBox.innerHTML = "WRONG";
    questionBox.setAttribute('style', 'width: 70%; align-self: center; font-size: 3em; padding: 0.1em; text-align: center; color: rgb(191, 18, 18)');

    // deducts time for making an incorrect answer
    if (timerCount > 13) {
        timerCount -= 13;
        document.getElementById('timer-num').innerHTML = timerCount + "s";
        document.documentElement.style.setProperty("--opacVal", "1");
        setTimeout(function(){document.documentElement.style.setProperty("--opacVal", "0");}, 300);
    } else {
        timerCount = 1;
        document.getElementById('timer-num').innerHTML = timerCount + "s";
        document.documentElement.style.setProperty("--opacVal", "1");
        setTimeout(function(){document.documentElement.style.setProperty("--opacVal", "0");}, 300);
        return;
    }

    // if the current question is not the last question the nextQuestion() function is called after a 0.6s timeout which allows the dynamic feedback to be displayed and seen
    if (questionCount < qMixed.length){
        setTimeout(nextQuestion, 600);

    // if the current question IS the last question then the gameWin() function is called
    } else {
        setTimeout(gameWin, 600);
        clearInterval(timerInterval);

    }
}

// replaces the question and answers content to update from the previous question
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

// removes the question and answer elements and replaces them with a page for the user to input their name for the Highscore board
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

    // depending on how high the user's score is, different messages will be displayed
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
    nameInput.setAttribute('maxlength', '4');
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

// takes care of retrieveing any stored highscores, adding the most recent score and initials, and saving the updated list to local storage
function submitScore(name, score, event) {
   var storedScores = JSON.parse(localStorage.getItem('highscores'));

   if (name != ""){
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

// called only if the user runs out of time, displays a message and a button to restart the quiz
function gameLose() {
    hscoreLink.style.visibility = 'visible';
    
    document.getElementById('question-text').remove();
    document.getElementById('answer-1').remove();
    document.getElementById('answer-2').remove();
    document.getElementById('answer-3').remove();
    document.getElementById('answer-4').remove();
    document.getElementById('timer-text').remove();

    contentBox.setAttribute('style', 'text-align: center; align-items: center; padding-left: 2em');


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
    contentBox.appendChild(newBtn);

    newBtn.addEventListener('click', function(){location.reload()});
}

// event listener which monitors clicks on any '.answer-choice' element
contentBox.addEventListener('click', function(event) {
    var element = event.target;
    
    // if the clicked answer matches the correct answer stored in the question object, the clicked choice flashes green and the rightAnswer() function is called
    if (element.matches('.answer-choice') && element.innerHTML == qMixed[element.getAttribute('qIndex')][0].correctAnswer) {
        element.setAttribute('style','background-color: rgb(16, 211, 19, 0.8) !important');
        rightAnswer();
    
    // if the clicked answer is not the correct answer, the selected choice flashes red and the wrongAnswer() function is called
    } else if (element.matches('.answer-choice')) {
        element.setAttribute('style', 'background-color: rgb(191, 18, 18, 0.8) !important');
        wrongAnswer();
    }
});

// function called on page load
init();




