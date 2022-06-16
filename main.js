const panelArea = document.getElementById('panel');

let sheetNum = 12;
let cardCol = [];

function createRandomNum() {
    let source = [];
    for (let i = 1; i < sheetNum / 2 + 1; i++) {
        source.push(i);
        source.push(i);
    }

    for (let i = 0; i < sheetNum; i++) {
        cardCol[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
    }
    console.log(cardCol);
}

function createCards () {
    for (let i = 0; i < sheetNum; i++) {
        const div = document.createElement('div');
        div.className = 'card back';
        div.number = cardCol[i];
        div.innerHTML = '';
        div.onclick = turnedCards;
        panelArea.appendChild(div);
    }
}

createRandomNum();
createCards();

let cardTurn = 0;
let checkedCard;
let backTimer;

const nextPlayer = document.getElementById('nextPlayer');
const player1Point = document.getElementById('player1Point');
const player2Point = document.getElementById('player2Point');

let player,player1GetPoint,player2GetPoint;

function resetText() {
    checkedCard = null;
    player = 1;
    player1GetPoint = 0;
    player2GetPoint = 0;
    nextPlayer.innerText = `次はplayer${player}の番です`;
    player1Point.innerText = `player1:${player1GetPoint}`;
    player2Point.innerText = `player2:${player2GetPoint}`;
}

resetText();

function resetCards() {
    const cards = document.getElementsByClassName('card');
    for (let i = 0; i < sheetNum; i++) {
        cards[i].className = 'card back';
        cards[i].innerHTML = '';
        cards[i].number = cardCol[i];
    }
}

function turnedCards (e) {
    let div = e.target;

    if (div.innerHTML == '') {
    div.className = 'card';
    div.innerHTML = div.number;
    } else {
        return;
    }
    
    if (player == 1) {
        if (cardTurn == 0) {
            checkedCard = div;
            cardTurn = 1;
        } else {
            if (checkedCard.number == div.number) {
                backTimer = setTimeout(function () {
                    div.className = 'card finish';
                    checkedCard.className = 'card finish';
                    if (document.getElementsByClassName('finish').length == sheetNum) {
                        alert('終了です');
                        createRandomNum();
                        resetCards();
                        resetText();
                    }
                }, 500);
                player1GetPoint += 1;
                player1Point.innerText = `player1:${player1GetPoint}`;
            } else {
                backTimer = setTimeout(function () {
                    div.className = 'card back';
                    div.innerHTML = '';
                    checkedCard.className = 'card back';
                    checkedCard.innerHTML = '';
                    checkedCard = null;
                }, 500);
                player = 2;
                nextPlayer.innerText = `次はplayer${player}の番です`;
            }
            cardTurn = 0;
        }
    } else {
        if (cardTurn == 0) {
            checkedCard = div;
            cardTurn = 1;
        } else {
            if (checkedCard.number == div.number) {
                backTimer = setTimeout(function () {
                    div.className = 'card finish';
                    checkedCard.className = 'card finish';
                    if (document.getElementsByClassName('finish').length == sheetNum) {
                        alert('終了です');
                        createRandomNum();
                        resetCards();
                        resetText();
                    }
                }, 500);
                player2GetPoint += 1;
                player2Point.innerText = `player2:${player2GetPoint}`;
            } else {
                backTimer = setTimeout(function () {
                    div.className = 'card back';
                    div.innerHTML = '';
                    checkedCard.className = 'card back';
                    checkedCard.innerHTML = '';
                    checkedCard = null;
                }, 500);
                player = 1;
                nextPlayer.innerText = `次はplayer${player}の番です`;
            }
            cardTurn = 0;
        }
    }
}