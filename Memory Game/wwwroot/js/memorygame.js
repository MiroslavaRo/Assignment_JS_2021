let moves = 0;
let matchedCard = document.getElementsByClassName("match");// declaring variable of matchedCards
let closeicon = document.querySelector(".close");// close icon in modal
let closemenu = document.getElementById("closemenu");
let modal = document.getElementById("popup1")// declare modal
const deck = document.getElementById("card-deck");// deck of all cards in game
var disableCards = false;
let cards = document.querySelectorAll(' .deck .card');
let hasFlipedCard = false;
let firstCard, secondCard;
let images = document.getElementsByClassName("face");
let stratmenu = document.getElementById("popup0");
let Score = document.getElementsByClassName("score");
let playerScore1 = document.getElementById("score1");

var a = 1;

let names = document.getElementsByClassName("name");

let formPlayers = [
    document.getElementById("1player"),
    document.getElementById("2player"),
    document.getElementById("3player"),
    document.getElementById("4player")];

let nameScores = document.getElementsByClassName("name-score");


function GetPlayersName() {
    let player1 = document.getElementById("player1").value;
    names[0].innerHTML = player1;
    let player2 = document.getElementById("player2").value;
    names[1].innerHTML = player2;
    let player3 = document.getElementById("player3").value;
    names[2].innerHTML = player3;
    let player4 = document.getElementById("player4").value;
    names[3].innerHTML = player4;
}

var PlayersPoints = [
    { Player: names[0], Points: Score[0].value },
    { Player: names[1], Points: Score[1].value },
    { Player: names[2], Points: Score[2].value },
    { Player: names[3], Points: Score[3].value }
];
let currentPlayer = PlayersPoints[0].Player;



document.getElementById("content2").style.display = "inline";
let radiobtns = document.getElementsByClassName("radiobutton");
let chosen = 1;
radiobtns[0].checked = true;
function Multiplayer() {
    for (var i = 0; i < radiobtns.length; i++) {
        radiobtns[i].checked = false;
    }
    this.checked = true;
    chosen = Number(this.value);
    console.log(chosen);
    DisplayPlayers();
}
function DisplayPlayers() {
    for (var i = 1; i < 4; i++) {
        formPlayers[i].classList.remove("vis");
        nameScores[i].style.display = "none";
    }
    nameScores[0].style.display = "block";
    let l = chosen;
    for (var j = 0; j < l; j++) {
        formPlayers[j].classList.add("vis");
        nameScores[j].style.display = "block";
    }
}
for (var i = 0; i < radiobtns.length; i++) {
    if (radiobtns[i].disabled === false) {
        radiobtns[i].addEventListener("click", Multiplayer);
    }
}


function CloseMenu() {
    document.getElementById("closemenu").style.display = "block";
    closemenu.addEventListener("click", function (e) {
        GetPlayersName();
        stratmenu.classList.remove("show");

        $(deck).css({ "visibility": "visible" });
        $(".players").css({ "visibility": "visible" });
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.display = "block";
        }
    });
}

document.body.onload = StartMenu(0);
function StartMenu(index) {
        $(deck).css({ "visibility": "hidden" });
        $(".players").css({ "visibility": "hidden" });
        stratmenu.classList.add("show");
        if (index == 0) {
            for (var i = 0; i < cards.length; i++) {
                cards[i].classList.remove("show", "open", "match", "disabled");
            }
        }
        else {
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.display = "none";
            }
            for (var i = 0; i < radiobtns.length; i++) {
                radiobtns[i].disabled = true;
            }
            CloseMenu();
        }
   
}



var selected = "cats";
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

function startGame() {
    hasFlipedCard = false;
    document.getElementById("namescore1").style.display = "block";
    playerScore1.value = 0;
    PlayersPoints = [
        { Player: names[0], Points: Score[0].value },
        { Player: names[1], Points: Score[1].value },
        { Player: names[2], Points: Score[2].value },
        { Player: names[3], Points: Score[3].value }
    ];
    for (var i = 0; i < PlayersPoints.length; i++) {
        PlayersPoints[i].Points = 0;
        Score[i].value = 0;
        PlayersPoints[i].Player.classList.remove("turn");
    }

    PlayersPoints[0].Player.classList.add("turn");
    currentPlayer = PlayersPoints[0].Player;
    a = 1;


    GetPlayersName();
    stratmenu.classList.remove("show");

    $(deck).css({ "visibility": "visible" });
    $(".players").css({ "visibility": "visible" });

    firstCard = 0;
    secondCard = 0;
    Theme();
    /*
    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 20);
            card.style.order = randomPos;
            console.log(card.dataset.framework);
        });
    })();
    */
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function (item) {
            deck.appendChild(item);
        });
        cards[i].style.display = "block";
        cards[i].classList.remove("show", "open", "match", "disabled");

    }

    moves = 0;

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
        checkForMatch();
        moveCounter();
        
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
    secondCard.classList.add("match", "disabled");
    if (chosen === 1) {
        playerScore1.value++;
        console.log(playerScore1.value);
    }
    else {
        console.log(currentPlayer.innerHTML);
     
        for (var i = 0; i < PlayersPoints.length; i++) {
           
            if (currentPlayer.innerHTML == PlayersPoints[i].Player.innerHTML) {
                console.log("points1:" + PlayersPoints[i].Points);
                PlayersPoints[i].Points++;
                Score[i].value++;
                console.log("points2:" + PlayersPoints[i].Points);
            }
        }
    }
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

//disable all cards
function disablePlayGround() {
    for (var c = 0; c < cards.length; c++) {
        card = cards[c];
        card.classList.add("disableplayground");
    }
} 
//unblock plauground
function AblePlayGround() {
    for (var c = 0; c < cards.length; c++) {
        card = cards[c];

        card.classList.remove("disableplayground");
    }
}


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
    if (matchedCard.length !== 20) {
        if (chosen == 4 && a == 4) {
            PlayersPoints[3].Player.classList.remove("turn");
            a = 5;
        }

        if (a <= chosen) {
            PlayersPoints[a - 1].Player.classList.remove("turn");
            console.log("before change: " + PlayersPoints[a - 1].Player.innerHTML);
            PlayersPoints[a].Player.classList.add("turn");
            currentPlayer = PlayersPoints[a].Player;
            console.log("after change: " + currentPlayer.innerHTML);
            console.log(PlayersPoints[a].Player);
            a++;
        }
        if (a > chosen) {
            PlayersPoints[chosen - 1].Player.classList.remove("turn");
            PlayersPoints[0].Player.classList.add("turn")
            currentPlayer = PlayersPoints[0].Player;
            a = 1;
        }
    }


    //start timer on first click
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
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

let SortedPlayersPoints = [];

//congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
    if (matchedCard.length == 20) {
        var b = 0;
        while (b < 4) {
            PlayersPoints[b].Player.classList.remove("turn");
            b++
        }

       clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");
        var points = [];
        for (var i = 0; i < chosen; i++) {
            points[i] = Score[i].value;
        }
        points = points.sort(function (a, b) { return b - a });
        console.log(points);
        SortedPlayersPoints = PlayersPoints.sort(function (a, b) { return b.Points - a.Points });
        var d = 4;
        while (d > chosen) {

            SortedPlayersPoints.pop();
            d--;
        }
        console.log(SortedPlayersPoints);

        var equal = true;
        for (let i = 0; i + 1 < chosen; i++) {
            equal = (points[i] === points[i + 1]) || equal;
        }
        console.log(equal);
        

        document.getElementById("totalTime").innerHTML = finalTime;
        if (chosen == 1) {
            document.getElementById("finalMove").innerHTML = moves;
            document.getElementById("playername").innerHTML = names[0].innerHTML + "!";
            document.getElementById("winner").style.display = "none";

            document.getElementById("congrats2").style.display = "none";
        }      
        else {           

           // document.getElementById("winner").style.display = "inline-flex";
            document.getElementById("loserscore").style.display = "inline-flex";

            document.getElementById("finalMove").style.display = "none";
            document.getElementById("movescount").style.display = "none";

            if (equal) {
                document.getElementById("congrats2").style.display = "inline-flex";
                document.getElementById("congrats1").style.display = "none";
            }
            else {
                document.getElementById("congrats2").style.display = "none";
                document.getElementById("congrats1").style.display = "inline-flex";
                document.getElementById("playername").innerHTML = SortedPlayersPoints[0].Player.innerHTML + "!";
            }


            document.getElementById("winnername").innerHTML = SortedPlayersPoints[0].Player.innerHTML+":";
            document.getElementById("firstscore").innerHTML = SortedPlayersPoints[0].Points;

            document.getElementById("loser1name").innerHTML = SortedPlayersPoints[1].Player.innerHTML + ":";
            document.getElementById("loser1score").innerHTML = SortedPlayersPoints[1].Points;
            if (chosen == 2) {

               
                document.getElementById("loser2").style.display = "none";

                document.getElementById("loser3").style.display = "none";
            }
            if (chosen == 3) {
                document.getElementById("loser3").style.display = "none";

                document.getElementById("loser2name").innerHTML = SortedPlayersPoints[2].Player.innerHTML + ":";
                document.getElementById("loser2score").innerHTML = SortedPlayersPoints[2].Points;
            }

            if (chosen == 4) {
           


                document.getElementById("loser2name").innerHTML = SortedPlayersPoints[2].Player.innerHTML + ":";
            document.getElementById("loser2score").innerHTML = SortedPlayersPoints[2].Points;

                document.getElementById("loser3name").innerHTML = SortedPlayersPoints[3].Player.innerHTML + ":";
            document.getElementById("loser3score").innerHTML = SortedPlayersPoints[3].Points;
            }
        }


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