class Game {
  constructor() {
    this.cards = []
    this.gameStarted = false
    this.player = []
    this.computer = []
    this.playerDeck = document.querySelector(".player-container.player .card.deck")
    this.playerActiveCard = document.querySelector(".player-container.player .card.active-card")
    this.computerDeck = document.querySelector(".player-container.computer .card.deck")
    this.computerActiveCard = document.querySelector(".player-container.computer .card.active-card")
    this.roundInfo = document.querySelector(".round-info")

    this.buildDeck()
    this.assignCards()
    
    this.playerDeck.addEventListener("click", () => this.playCard())
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
      if (playerGetsCard) {
        this.player.push(pickedCard)
      } else {
        this.computer.push(pickedCard)
      }

      playerGetsCard = !playerGetsCard
    }
  }

  playCard() {
    if (this.player.length < 1 || this.computer.length < 1) {
      if (this.player.length < 1) {
        this.roundInfo.innerText = "Computer won the game!"
      } else if (this.computer.length < 1) {
        this.roundInfo.innerText = "Player won the game!"
      }
      return
    }
    if (!this.gameStarted) {
      this.playerActiveCard.classList.add("show")
      this.computerActiveCard.classList.add("show")
    }
    
    const playerTopCard = this.player.shift()
    const computerTopCard = this.computer.shift()
    
    this.playerDeck.querySelector(".card-count").innerText = this.player.length
    this.computerDeck.querySelector(".card-count").innerText = this.computer.length

    const playerValue = playerTopCard[0].value
    let playerValueDisplay = playerValue

    if (playerValueDisplay === 11) {
      playerValueDisplay = "J"
    } else if (playerValueDisplay === 12) {
      playerValueDisplay = "Q"
    } else if (playerValueDisplay === 13) {
      playerValueDisplay = "K"
    } else if (playerValueDisplay === 14) {
      playerValueDisplay = "A"
    }

    this.playerActiveCard.querySelectorAll(".value").forEach(v => {
      v.innerText = playerValueDisplay
    })

    const playerSuit = playerTopCard[0].suit

    this.playerActiveCard.querySelectorAll(".suit").forEach(s => {
      s.src = `assets/${playerSuit}.svg`
    })

    const computerValue = computerTopCard[0].value
    let computerValueDisplay = computerValue

    if (computerValueDisplay === 11) {
      computerValueDisplay = "J"
    } else if (computerValueDisplay === 12) {
      computerValueDisplay = "Q"
    } else if (computerValueDisplay === 13) {
      computerValueDisplay = "K"
    } else if (computerValueDisplay === 14) {
      computerValueDisplay = "A"
    }

    this.computerActiveCard.querySelectorAll(".value").forEach(v => {
      v.innerText = computerValueDisplay
    })

    const computerSuit = computerTopCard[0].suit

    this.computerActiveCard.querySelectorAll(".suit").forEach(s => {
      s.src = `assets/${computerSuit}.svg`
    })

    const winner = this.winner(playerValue, computerValue)

    if (winner === "player") {
      this.player.push(playerTopCard)
      this.player.push(computerTopCard)
      this.roundInfo.innerText = "Player won the round!"
    } else if (winner === "computer") {
      this.computer.push(playerTopCard)
      this.computer.push(computerTopCard)
      this.roundInfo.innerText = "Computer won the round!"
    } else {
      this.player.push(playerTopCard)
      this.computer.push(computerTopCard)
      this.roundInfo.innerText = "Round was a draw!"
    }
  }

  winner(pValue, cValue) {
    let winner = null

    if (pValue > cValue) {
      winner = "player"
    } else if (cValue > pValue) {
      winner = "computer"
    }

    return winner
  }
}

const game = new Game;