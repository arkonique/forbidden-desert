class Deck {
    deck=[];
    discarded=[];
    constructor(deck, discarded) {
        this.deck = deck;
        this.discarded = discarded;
    }
    shuffle() {
        const { deck } = this;
        let m = deck.length,
        i;
        while (m) {
        i = Math.floor(Math.random() * m--);
        [deck[m], deck[i]] = [deck[i], deck[m]];
        }
        return this;
    }
    draw(n) {
        return this.deck.slice(0, n);
    }
    drawOne() {
        return this.draw(1)[0];
    }
    discard(card) {
        this.discarded.push(card);
        this.deck = this.deck.filter((c) => c !== card);
        return this;
    }
}