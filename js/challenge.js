var currentNumber = 0;
var likes = [];
const counter = document.querySelector('#counter');


// Decrement, increment, like, pause
document.getElementById('plus').addEventListener('click', increment);
document.getElementById('minus').addEventListener('click', decrement);
document.getElementById('heart').addEventListener('click', like);
document.getElementById('pause').addEventListener('click', toggleTimer);

// Comment
document.getElementById('comment-form').addEventListener('submit', function(event){
    event.preventDefault();

    addComment();
});

// Start timer
var timerInterval;
var timerRunning = false;
toggleTimer();


function increment(){
    currentNumber++;
    counter.innerText = currentNumber;
}

function decrement(){
    currentNumber--;
    counter.innerText = currentNumber;
}

function like(){
    // Check how many times currentNumber has been liked
    var likeElement = document.querySelector('#like_' + currentNumber);
    var numOfLikes;

    if(likeElement){
        // At least once
        numOfLikes = Number.parseInt(likeElement.getAttribute('likes')) + 1;
    }else{
        // Create a new element
        likeElement = document.createElement('li');
        numOfLikes = 1;
        likeElement.setAttribute('id', 'like_' + currentNumber);

        document.querySelector('.likes').appendChild(likeElement);
    }

    // Track the number of likes via attribute
    likeElement.setAttribute('likes', numOfLikes);

    likeElement.innerText = currentNumber + " has been liked " +
        numOfLikes + " time" +
        (numOfLikes == 1 ? "" : "s");
}

function toggleTimer(){
    if(!timerRunning){
        // Start timer
        timerRunning = true;
        timerInterval = setInterval(increment, 1000);
        document.querySelector('#pause').innerText = 'pause';
    }else{
        // Stop timer
        timerRunning = false;
        clearInterval(timerInterval);
        document.querySelector('#pause').innerText = 'resume';
    }
}

function addComment(){
    // Comment box
    var input = document.getElementById('comment-input');

    document.getElementById('list').innerHTML += `
        <div>${input.value}</div>
    `;

    input.value = '';
}
