const decks = document.querySelectorAll(".card.deck")
const activeCards = document.querySelectorAll(".card.active-card")

class Game {
  constructor() {
    this.cards = []
    this.gameStarted = false
    this.gameOver = false
    this.player = []
    this.computer = []

    this.buildDeck()
    this.assignCards()
  }

  buildDeck() {
    const suits = ["h", "s", "d", "c"]
  
    suits.forEach((suit) => {
      for (let i = 2; i < 15; i++) {
        this.cards.push({suit: suit, value: i})
      }
    })
  }

  assignCards() {
    let playerGetsCard = true
    while (this.cards.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.cards.length)
      const pickedCard = this.cards.splice(randomIndex, 1)
      console.log(pickedCard)
    }
  }

  showNextCards() {
    if (gameOver) return
    if (!gameStarted) {
      activeCards.forEach(activeCard => {
        activeCard.classList.add("show")
      })
    }
  
    players.player1
  }
}

const game = new Game;

decks.forEach(deck => {
  deck.addEventListener("click", game.showNextCards)
})