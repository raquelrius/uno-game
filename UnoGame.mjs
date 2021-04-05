const colors = ['blue', 'green', 'red', 'yellow'];

const behaviour = {
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
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function createAllCards(totalCards) {
    const cards = [];
    Object.entries(behaviour).forEach(([key, value]) => {
        console.log(key,value)
        if (!value.includes('wild')) {
            colors.forEach(color => {
                const card = new Card(color, value);
                cards.push(card);
            })
            if (key.toString() !== '0') {
                console.log(key)
                colors.forEach(color => {
                    const card = new Card(color, value);
                    cards.push(card);
                })
            }
        }
        cards.push(new Card('none', value));
        cards.push(new Card('none', value));
        cards.push(new Card('none', value));
        cards.push(new Card('none', value));
    })
    return cards;
}

class Game {
    constructor() {
        this.totalCards = 180;
        this.players = {};
        this.cards = createAllCards(180);
    }

    addPlayers(name) {
        this.players[name] = new Player();
    }
    dealCards() {
        this.players.forEach(player => {
            const color = colors[getRandomInt(0,4)];
            const number = getRandomInt(0,15);
            player.hand = new Hand();

        })
    }
}

class Card {
    constructor(color, number) {
        this.color = color;
        this.number = number;
    }
}

class Hand {
    constructor(cards) {
        this.cards = cards;
    }

    addCard(card) {
        this.cards.add(card);
    }

}

class Player {
    constructor() {
        this.hand = undefined;
    }
}


export { Card, Game, Hand, Player };
