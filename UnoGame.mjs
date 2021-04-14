const colors = ['blue', 'green', 'red', 'yellow'];

const typeCard = {
    0: 'number',
    1: 'number',
    2: 'number',
    3: 'number',
    4: 'number',
    5: 'number',
    6: 'number',
    7: 'number',
    8: 'number',
    9: 'number',
    10: 'wild',
    11: '+4 wild',
    12: '+2',
    13: 'skip',
    14: 'reverse',
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

const createAllCards = () => {
    const cards = [];
    Object.entries(typeCard).forEach(([key, value]) => {
        if (!value.includes('wild')) {
            colors.forEach(color => {
                const card = new Card(color, key, value);
                cards.push(card);
            })
            if (key.toString() !== '0') {
                colors.forEach(color => {
                    const card = new Card(color, key, value);
                    cards.push(card);
                })
            }
        } else {
            cards.push(new Card('none', key, value));
            cards.push(new Card('none', key, value));
            cards.push(new Card('none', key, value));
            cards.push(new Card('none', key, value));
        }
    })
    return cards;
}

export const canPlayCard = (firstCard, secondCard) => (
    firstCard.color === secondCard.color ||
        firstCard.number === secondCard.number ||
        (firstCard.behaviour.includes('wild') && secondCard.behaviour.includes('wild')) ||
        secondCard.behaviour.includes('wild')
);

class Game {
    constructor() {
        this.deck = shuffle(createAllCards());
        this.discardPile = [];
        this.players = {};
        this.turn = 0;
        this.activeCard = null;
        this.turnDirection = 1;
    }

    addPlayers(namesList) {
        namesList.forEach(name => this.players[name] = new Player());
    }

    dealCards() {
        Object.keys(this.players).forEach(player => {
            const hand = new Hand();
            for (let i = 0; i < 7; i++) { // each player has 7 cards
                const drawnCard = this.deck.pop();
                hand.addCard(drawnCard);
            }
            this.players[player].setHand(hand);
        });
        const onTableCard = this.deck.pop();
        this.discardPile.push(onTableCard);
        this.activeCard = onTableCard;
        if (onTableCard.behaviour.includes('wild')) this.activeCard.color = colors[getRandomInt(0, colors.length)]; //if 1st card is a wild card, random color
    }

    playerDrawCards(player, amountCards) {
        const totalCards = [];
        for (let i = 0; i < amountCards; i++) {
            if (this.deck.length !== 0) {
                const drawnCard = this.deck.pop();
                player.hand.addCard(drawnCard);
            } else {
                this.deck = shuffle(this.deck.concat(this.discardPile)); // if there are no more cards, we add the discard pile
            }
        }
        return totalCards;
    }

    skipTurn() {
        this.turn = mod((this.turn + this.turnDirection), Object.keys(this.players).length);
    }

    playerPlayCard(player, card) {
        this.discardPile.push(card);
        this.activeCard = card;
        if (card.behaviour.includes('wild')) this.activeCard.color = colors[getRandomInt(0, colors.length)]; // simulate choosing color for wild card
        if (card.behaviour === 'skip') this.skipTurn();

        const direction = card?.behaviour === 'reverse' ? -1 * this.turnDirection : this.turnDirection;
        this.turn = mod((this.turn + direction), Object.keys(this.players).length); // the % for negatives values gives negative in js
        if (card.behaviour === 'reverse' ) {
            this.turnDirection = -1 * this.turnDirection;
        }

        player.hand.deleteCard(card);
    }

}

class Card {
    constructor(color, number, behaviour) {
        this.color = color;
        this.number = number;
        this.behaviour = behaviour;
    }
}

class Hand {
    constructor() {
        this.cards = [];
    }

    addCard(card) {
        this.cards.push(card);
    }

    deleteCard(card) {
        this.cards.splice(this.cards.indexOf(card), 1);
    }
}

class Player {
    constructor() {
        this.hand = new Hand();
    }

    setHand(hand) {
        this.hand = hand;
    }

}


export { Card, Game, Hand, Player };
