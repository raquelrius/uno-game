import { Game } from "./UnoGame.mjs";

const game = new Game();
game.addPlayers('Marc');
console.log(game.players)
console.log(game.cards.length)