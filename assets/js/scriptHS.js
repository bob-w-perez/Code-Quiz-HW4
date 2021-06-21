var contentBox = document.getElementById('content-box');
var scoreList = document.getElementById('score-list');

var storedScores = JSON.parse(localStorage.getItem('highscores'));


function renderScores() {
    for (i = 0; i < storedScores.length; i++ ){
        var scoreObj = document.createElement('li');
        scoreObj.setAttribute('class', 'score');
        scoreObj.innerHTML = storedScores[i].name + ' - ' + storedScores[i].score;
        scoreList.appendChild(scoreObj);
    }
}


function clearScores() {
    localStorage.removeItem('highscores');
    while (scoreList.firstChild) {
        scoreList.removeChild(scoreList.firstChild);
    }
    document.getElementById('clear').style.display = 'none';
    var noScore = document.createElement('p');
    noScore.setAttribute('id', 'no-score');
    noScore.innerHTML = "...no scores yet. Take the quiz to get on the leaderboard!";
    contentBox.appendChild(noScore);
    
}


if (storedScores !== null){
    renderScores();
} else {
    document.getElementById('clear').style.display = 'none';
    var noScore = document.createElement('p');
    noScore.setAttribute('id', 'no-score');
    noScore.innerHTML = "...no scores yet. Take the quiz to get on the leaderboard!";
    contentBox.appendChild(noScore);
}

document.getElementById('clear').addEventListener('click', clearScores);