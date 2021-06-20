var contentBox = document.getElementById('content-box')


function init() {
    var mainTitle = document.createElement('h1');
    mainTitle.innerHTML = 'Super Coding Quiz';
    contentBox.appendChild(mainTitle);

    var welcomeMsg = document.createElement('p');
    welcomeMsg.setAttribute('id', 'welcomeMsg');
    welcomeMsg.innerHTML = "This is a timed quiz where incorrect answers result in a 13-second penalty deducted from your remaining time. Do your best and see how high you can score!"
    contentBox.appendChild(welcomeMsg);

    var startBtn = document.createElement('button');
    startBtn.setAttribute('id', 'start-button');
    startBtn.innerHTML = "Start  Quiz"
    contentBox.appendChild(startBtn);
}








init(); 