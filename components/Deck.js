class Deck {
  deck = [];
  discarded = [];
  deckHtml;
  discardedHtml;
  type;
  constructor(deck, discarded, type) {
    this.deck = deck;
    this.discarded = discarded;
    this.type = type;
  }
  shuffle() {
    const { deck } = this;
    let m = deck.length,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    this.deckHtml = `<div class="deck ${this.type}_deck">`;
    this.deckHtml += this.deck
      .reverse()
      .map((card) => {
        return `
        
            <div class="card">
            <div class="card__inner">
            <img
            class="card__face card__face--front"
            src="${this.type}_deck/${card}.png"
            />
            
            <img
            class="card__face card__face--back"
            src="${this.type}_deck/${this.type}_back.png"
            />
            </div>
            </div>
            `;
      })
      .join("");
    this.deckHtml += `</div>`;

    this.discardedHtml = `<div class="discarded ${this.type}_discarded" onclick="openCloseTray('${this.type}')">`;
    this.discardedHtml += this.discarded
      .map((card) => {
        return `
        
            <div class="card flipped">
            <div class="card__inner">
            <img
            class="card__face card__face--front"
            src="${this.type}_deck/${card}.png"
            />
            
            <img
            class="card__face card__face--back"
            src="${this.type}_deck/${this.type}_back.png"
            />
            </div>
            </div>
            `;
      })
      .join("");
    this.discardedHtml += `</div>`;

    return this;
  }
  draw(n) {
    return this.deck.slice(-1 * n);
  }
  drawOne() {
    return this.draw(1)[0];
  }
  discard(card) {
    this.discarded.push(card);
    // remove only one instance of card from deck
    this.deck.splice(this.deck.reverse().indexOf(card), 1);
    this.deck.reverse();
    return this;
  }
}
