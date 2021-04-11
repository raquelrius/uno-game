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

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
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

class Game {
    constructor() {
        this.deck = shuffle(createAllCards());
        this.discardPile = [];
        this.players = {};
    }

    addPlayer(name) {
        this.players[name] = new Player();
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
        })
    }

    playerDrawCards(player, amountCards) {
        const totalCards = [];
        for (let i = 0; i < amountCards; i++) {
            if (this.deck.length !== 0) {
                const drawnCard = this.deck.pop();
                this.players[player]?.hand.addCard(drawnCard);
            } else {
                this.deck = shuffle(this.deck.concat(this.discardPile)); // if there are no more cards, we add the discard pile
            }
        }
        return totalCards;
    }

    playerPLayCard(player, card) {

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
