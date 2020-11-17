class Game {
  constructor() {
    this.cards = []
    this.gameStarted = false
    this.player = []
    this.computer = []
    this.isDraw = false
    this.drawCards = []
    this.playerDeck = document.querySelector(".player-container.player .card.deck")
    this.computerDeck = document.querySelector(".player-container.computer .card.deck")
    this.computerActiveCard = document.querySelector(".player-container.computer .card.active-card")
    this.roundInfo = document.querySelector(".round-info")
    this.playerContainer = document.querySelector(".player-container.player")
    this.computerContainer = document.querySelector(".player-container.computer")

    this.buildDeck()
    this.assignCards()
    
    this.playerDeck.addEventListener("click", () => {
      this.playCard()
    })
  }

  buildDeck() {
    const suits = ["h", "s", "d", "c"]
  
    suits.forEach((suit) => {
      for (let i = 7; i < 15; i++) {
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

    this.playerDeck.querySelector(".card-count").innerText = this.player.length
    this.computerDeck.querySelector(".card-count").innerText = this.computer.length
  }

  createNewCard(container, faceDown) {
    const card = document.createElement("div")
    card.classList.add("card", "active-card", "latest")

    if (this.isDraw) {
      card.classList.add("draw")
    }

    if (faceDown) {
      card.classList.add("face-down")
    }

    const valueSuitTop = document.createElement("div")
    valueSuitTop.classList.add("card-value-suit", "top")

    const valueTop = document.createElement("span")
    valueTop.classList.add("value")

    valueSuitTop.appendChild(valueTop)

    const suitTop = document.createElement("img")
    suitTop.classList.add("suit")

    valueSuitTop.appendChild(suitTop)
    
    card.appendChild(valueSuitTop)

    const suitCenter = document.createElement("img")
    suitCenter.classList.add("suit", "center")

    card.appendChild(suitCenter)

    const valueSuitBottom = document.createElement("div")
    valueSuitBottom.classList.add("card-value-suit", "bottom")

    const valueBottom = document.createElement("span")
    valueBottom.classList.add("value")

    valueSuitBottom.appendChild(valueBottom)

    const suitBottom = document.createElement("img")
    suitBottom.classList.add("suit")

    valueSuitBottom.appendChild(suitBottom)

    card.appendChild(valueSuitBottom)

    container.appendChild(card)
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

    if (this.isDraw) {
      this.createNewCard(this.playerContainer, true)
      this.createNewCard(this.computerContainer, true)
      this.drawCards.push(this.player.pop())
      this.drawCards.push(this.computer.pop())
    }
    
    const playerTopCard = this.player.shift()
    const computerTopCard = this.computer.shift()

    this.playerDeck.querySelector(".card-count").innerText = this.player.length
    this.computerDeck.querySelector(".card-count").innerText = this.computer.length

    if (!this.isDraw) {
      this.playerContainer.querySelectorAll(".active-card").forEach(card => {
        card.remove()
      })
      this.computerContainer.querySelectorAll(".active-card").forEach(card => {
        card.remove()
      })
    } else {
      this.playerContainer.querySelectorAll(".active-card").forEach(card => {
        card.classList.remove("latest")
      })
      this.computerContainer.querySelectorAll(".active-card").forEach(card => {
        card.classList.remove("latest")
      })
    }

    this.createNewCard(this.playerContainer)
    this.createNewCard(this.computerContainer)
    
    const playerActiveCard = document.querySelector(".player-container.player .card.active-card.latest")
    const computerActiveCard = document.querySelector(".player-container.computer .card.active-card.latest")

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

    playerActiveCard.querySelectorAll(".value").forEach(v => {
      v.innerText = playerValueDisplay
    })

    const playerSuit = playerTopCard[0].suit

    playerActiveCard.querySelectorAll(".suit").forEach(s => {
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

    computerActiveCard.querySelectorAll(".value").forEach(v => {
      v.innerText = computerValueDisplay
    })

    const computerSuit = computerTopCard[0].suit

    computerActiveCard.querySelectorAll(".suit").forEach(s => {
      s.src = `assets/${computerSuit}.svg`
    })

    const winner = this.winner(playerValue, computerValue)
    
    if (winner === "player") {
      if (this.isDraw) {
        this.drawCards.forEach(card => {
          this.player.push(card)
        })
        this.drawCards = []
      }
      this.player.push(playerTopCard)
      this.player.push(computerTopCard)
      this.isDraw = false
      this.roundInfo.innerText = "Player won the round!"
    } else if (winner === "computer") {
      if (this.isDraw) {
        this.drawCards.forEach(card => {
          this.computer.push(card)
        })
        this.drawCards = []
      }
      this.computer.push(computerTopCard)
      this.computer.push(playerTopCard)
      this.isDraw = false
      this.roundInfo.innerText = "Computer won the round!"
    } else {
      this.isDraw = true
      this.drawCards.push(playerTopCard)
      this.drawCards.push(computerTopCard)
      this.roundInfo.innerText = "Round was a draw!"
    }

    console.log(this.drawCards)
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