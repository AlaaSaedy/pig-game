/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // 1. Creating Random Number.

        var diceGenerator1 = Math.floor(Math.random() * 6) + 1;
        var diceGenerator2 = Math.floor(Math.random() * 6) + 1;

        //2. Display The Result of Rolling Dice.

        var diceImg1 = document.getElementById('dice-1');
        var diceImg2 = document.getElementById('dice-2');
        
        diceImg1.style.display = "block";
        diceImg2.style.display = "block";
        diceImg1.src = 'dice-' + diceGenerator1 + '.png';
        diceImg2.src = 'dice-' + diceGenerator2 + '.png';

        //3. Update Player Score If the Rolled Dice != 1

        if (diceGenerator1 !== 1 && diceGenerator2 !== 1 ) {

            roundScore += diceGenerator1 + diceGenerator2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else { // Next Player
            nextPlayer()
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        // Add Cureent Score to Global Score
        scores[activePlayer] += roundScore;


        // Update The UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check If Player Won the Game
        var finalScore = document.querySelector('.final-score').value;
        var winningScore;

        if (finalScore) {
            winningScore = finalScore;
        } else {
            winningScore = 20;
        }

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            gamePlaying = false;

        } else {
            // Next Player
            nextPlayer()
        }
    }
});


function nextPlayer() {

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.querySelector('#name-0').textContent = "Player 1";
    document.querySelector('#name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.final-score').value = "";
}
