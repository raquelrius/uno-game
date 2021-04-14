import {canPlayCard, Game} from "./UnoGame.mjs";

/*
This is a UNO game simulation where the will of the players is simulated with randomness (such as deciding which card to play).
We will use the functions from the UnoGame.mjs to perform the needed actions.
The console.log() messages are to help you to know what is going on. Feel free to change the number and name of players.
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

console.log("START GAME!")
const game = new Game();
let endGame = false;

game.addPlayers(['A', 'B', 'C']);
game.dealCards();

console.log('First card on the table: ', game.activeCard);
while (!endGame) {
    console.log('Current turn: ', game.turn);
    const activePlayerName = Object.keys(game.players)[game.turn];
    const activePlayer = game.players[activePlayerName];
    console.log('Active player name and cards left: ', activePlayerName, activePlayer?.hand.cards.length);

    if (game.activeCard.behaviour.includes('+')) {
        game.playerDrawCards(activePlayer, parseInt(game.activeCard.behaviour.match(/\+(\d)[a-z\s]*/)[1]));
    }
    const possibleCardsToPlay = activePlayer.hand.cards.filter(card => canPlayCard(game.activeCard, card));
    if (possibleCardsToPlay.length !== 0) {
        const selectedCard = possibleCardsToPlay[getRandomInt(0, possibleCardsToPlay.length)];
        console.log('Can play! With: ', selectedCard);

        game.playerPlayCard(activePlayer, selectedCard);
        console.log('Cards left from player: ', activePlayer.hand.cards.length);

        if (activePlayer.hand.cards.length === 1) {
            const sayUno = Math.random() >= 0.2;
            if (!sayUno) game.playerDrawCards(activePlayer, 1);
        }
        if (activePlayer.hand.cards.length === 0) {
            console.log('END OF GAME!! Wins: ', activePlayerName)
            endGame = true;
        }
    } else {
        console.log('Cannot play, drawing and skipping ...')
        game.playerDrawCards(activePlayer, 1);
        game.skipTurn();
    }
}

