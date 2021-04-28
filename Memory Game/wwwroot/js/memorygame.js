let moves = 0;
let counter = document.querySelector(".moves");// declaring move variable
const stars = document.querySelectorAll(".fa-star");// declare variables for star icons
let matchedCard = document.getElementsByClassName("match");// declaring variable of matchedCards
let starsList = document.querySelectorAll(".stars li");// stars list
let closeicon = document.querySelector(".close");// close icon in modal
let modal = document.getElementById("popup1")// declare modal
const deck = document.getElementById("card-deck");// deck of all cards in game
var disableCards = false;
let cards = document.querySelectorAll(' .deck .card');
let hasFlipedCard = false;
let firstCard, secondCard;
let images = document.getElementsByClassName("face");
let stratmenu = document.getElementById("popup0");
let player1 = document.getElementById("player1").value;
let player2 = document.getElementById("player2").value;
console.log(player1, player2);
//let name1 = document.getElementById("name1").innerHTML = player1;
//let name2 = document.getElementById("name2").innerHTML = player2;



var selected="cats";
let options = document.getElementsByClassName("option");
function ChosenOption() {
    this.classList.add("selected");
    selected = this.id;
    console.log(selected);
    for (var i = 0; i < options.length; i++) {
        option = options[i];
        if (option.id !== selected) {
            option.classList.remove("selected");
        }
    }
}
for (var i = 0; i < options.length; i++) {
    options[i].addEventListener("click", ChosenOption);
}


document.body.onload = StartMenu();
function StartMenu() {
    $(deck).css({ "visibility": "hidden" });
    $(".players").css({ "visibility": "hidden" });
    stratmenu.classList.add("show");
}

/*
var CardFrameImg = new Object();
var ArrayOfImages = [];
var frames = [];
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    frames[i] = card.dataset.framework;
    CardFrameImg = { Card: cards[i], Framework: frames[i], Image: images[i].alt };
    ArrayOfImages[i] = CardFrameImg;   
}*/


function Theme() {
    var Theme = [];

    var ThemeAlts = [];
    for (var i = 0; i < 10; i++) {
        Theme[i] = new Image();
        Theme[i].src = "imgs/" + selected+"/img" + (i + 1) + ".jpg";
        Theme[i].alt = "img" + (i + 1);
        ThemeAlts[i] = Theme[i].alt;
    }
    var imgAlts = [];
    for (var j = 0; j < 20; j++) {
        imgAlts[j] = images[j].alt;
        if (ThemeAlts.includes(imgAlts[j])) {
            let index = ThemeAlts.indexOf(imgAlts[j]);
            images[j].src = Theme[index].src;
        }
    }
}


(function shuffle() {
    /*
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;*/
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 20);
        card.style.order = randomPos;
        console.log(card.dataset.framework);
    });
})();


// document.body.onload = startGame();


function startGame() {
    stratmenu.classList.remove("show");

    $(deck).css({ "visibility": "visible" });
    $(".players").css({ "visibility": "visible" });
    firstCard = 0;
    secondCard = 0;
    Theme();

    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");

    }

    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}




function flipCard() {

    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");

    if (!hasFlipedCard) {
        hasFlipedCard = true;
        firstCard = this;
    }
    else {
        disablePlayGround();
        hasFlipedCard = false;
        secondCard = this;
        moveCounter();
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        matched();
    }
    else {
        unmatched();
    }
}

function matched() {
    firstCard.classList.add("match","disabled");
    secondCard.classList.add("match","disabled");

    AblePlayGround();
}
function unmatched() {
    
    firstCard.classList.add("unmatched");
    secondCard.classList.add("unmatched");
    setTimeout(function () {
        firstCard.classList.remove("open", "unmatched");
        secondCard.classList.remove("open","unmatched");
        enable();
    }, 850);
    setTimeout(function () {
        firstCard.classList.remove("show");
        secondCard.classList.remove("show");
        AblePlayGround();
    }, 900);

}


function disablePlayGround() {
    for (var c = 0; c < cards.length; c++) {
        card = cards[c];
        card.classList.add("disableplayground");
    }
} //disable all cards
function AblePlayGround() {
    for (var c = 0; c < cards.length; c++) {
        card = cards[c];

        card.classList.remove("disableplayground");
    }
}//unblock plauground


//enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

//count player's moves
function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 13 && moves < 17) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 17) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + " mins " + second + " secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}


//congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
    if (matchedCard.length == 20) {
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


//close icon on modal
function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
        startGame();
    });
}



function playAgain() {
    modal.classList.remove("show");
    startGame();
}


for (var i = 0; i < cards.length; i++) {
    card = cards[i];
        card.addEventListener("click", flipCard);
        card.addEventListener("click", congratulations);
    }