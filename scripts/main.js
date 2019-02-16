$(() => {



  const $body = $('body')
  const mainGrid = document.querySelector('.grid')

  $body.css({
    background: 'red'
  })

  // grid creation

  const grid = []
  grid.length = 100

  for (let i = 0; i < grid.length; i++) {
    grid[i] = 'empty'
  }

  for (let i = 0; i < grid.length; i++) {
    const gridBox = document.createElement('div')
    gridBox.setAttribute('class', 'grid-item')
    mainGrid.appendChild(gridBox)
  }

  const $gridItems = $('.grid-item')

  class Ship {
    constructor(shipType,lengthOfShip,hitPoints,sunk) {
      this.shipType = shipType
      this.lengthOfShip = lengthOfShip
      this.hitPoints = hitPoints
      this.sunk = sunk
    }
  }

  const carrier = new Ship('carrier','5','5','false')
  const battleShip = new Ship('battleShip','4','4','false')
  const cruiser = new Ship('cruiser','3','3','false')
  const submarine = new Ship('submarine','3','3','false')
  const destroyer = new Ship('destroyer','2','2','false')

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function verticalOrHorizontal() {
    return Math.floor(Math.random() * 2)
  }

  let carrierAnchorIndex
  let battleShipAnchorIndexHorizontal
  const occupied = []

  function carrierPlacement() {
    const verticalOrHorizontalCarrier = verticalOrHorizontal()
    if (verticalOrHorizontalCarrier === 0) {
      carrierAnchorIndex = Math.floor(Math.random() * 60)
      grid[carrierAnchorIndex] = carrier
      grid[carrierAnchorIndex + 10] = carrier
      grid[carrierAnchorIndex + 20] = carrier
      grid[carrierAnchorIndex + 30] = carrier
      grid[carrierAnchorIndex + 40] = carrier
    } else if (verticalOrHorizontalCarrier === 1) {
      const row = (Math.floor(Math.random() * 10))
      switch(row) {
        case 0:
          carrierAnchorIndex = getRandomInt(0,5)
          break
        case 1:
          carrierAnchorIndex = getRandomInt(10,15)
          break
        case 2:
          carrierAnchorIndex = getRandomInt(20,25)
          break
        case 3:
          carrierAnchorIndex = getRandomInt(30,35)
          break
        case 4:
          carrierAnchorIndex = getRandomInt(40,45)
          break
        case 5:
          carrierAnchorIndex = getRandomInt(50,55)
          break
        case 6:
          carrierAnchorIndex = getRandomInt(60,65)
          break
        case 7:
          carrierAnchorIndex = getRandomInt(70,75)
          break
        case 8:
          carrierAnchorIndex = getRandomInt(80,85)
          break
        case 9:
          carrierAnchorIndex = getRandomInt(90,95)
          break
      }
      grid[carrierAnchorIndex] = carrier
      grid[carrierAnchorIndex + 1] = carrier
      grid[carrierAnchorIndex + 2] = carrier
      grid[carrierAnchorIndex + 3] = carrier
      grid[carrierAnchorIndex + 4] = carrier
    }
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === carrier) {
        occupied.push(i)
      }
    }
  }

  function battleShipPlacementVertical() {
    let battleShipAnchorIndexVertical = null
    battleShipAnchorIndexVertical = Math.floor(Math.random() * 70)
    for (let i = 0; i < occupied.length; i++) {
      if (battleShipAnchorIndexVertical === occupied[i] || battleShipAnchorIndexVertical + 10 === occupied[i] || battleShipAnchorIndexVertical + 20 === occupied[i] || battleShipAnchorIndexVertical + 30 === occupied[i]) {
        return battleShipPlacementVertical()
      }
    }
    grid[battleShipAnchorIndexVertical] = battleShip
    grid[battleShipAnchorIndexVertical + 10] = battleShip
    grid[battleShipAnchorIndexVertical + 20] = battleShip
    grid[battleShipAnchorIndexVertical + 30] = battleShip
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === battleShip) {
        occupied.push(i)
      }
    }
  }

  function battleShipPlacementHorizontal() {
    let battleShipAnchorIndexHorizontal = null
    const row = (Math.floor(Math.random() * 10))
    switch(row) {
      case 0:
        battleShipAnchorIndexHorizontal = getRandomInt(0,5)
        break
      case 1:
        battleShipAnchorIndexHorizontal = getRandomInt(10,15)
        break
      case 2:
        battleShipAnchorIndexHorizontal = getRandomInt(20,25)
        break
      case 3:
        battleShipAnchorIndexHorizontal = getRandomInt(30,35)
        break
      case 4:
        battleShipAnchorIndexHorizontal = getRandomInt(40,45)
        break
      case 5:
        battleShipAnchorIndexHorizontal = getRandomInt(50,55)
        break
      case 6:
        battleShipAnchorIndexHorizontal = getRandomInt(60,65)
        break
      case 7:
        battleShipAnchorIndexHorizontal = getRandomInt(70,75)
        break
      case 8:
        battleShipAnchorIndexHorizontal = getRandomInt(80,85)
        break
      case 9:
        battleShipAnchorIndexHorizontal = getRandomInt(90,95)
        break
    }
    console.log(occupied)
    console.log(battleShipAnchorIndexHorizontal)
    for (let i = 0; i < occupied.length; i++) {
      if (battleShipAnchorIndexHorizontal === occupied[i] || battleShipAnchorIndexHorizontal + 1 === occupied[i] || battleShipAnchorIndexHorizontal + 2 === occupied[i] || battleShipAnchorIndexHorizontal + 3 === occupied[i] ) {
        return battleShipPlacementHorizontal()
      }
    }
    grid[battleShipAnchorIndexHorizontal] = battleShip
    grid[battleShipAnchorIndexHorizontal + 1] = battleShip
    grid[battleShipAnchorIndexHorizontal + 2] = battleShip
    grid[battleShipAnchorIndexHorizontal + 3] = battleShip
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === battleShip) {
        occupied.push(i)
      }
    }
  }

  function battleShipPlacement () {
    const verticalOrHorizontalbattleShip = verticalOrHorizontal()
    if (verticalOrHorizontalbattleShip === 0) {
      battleShipPlacementVertical()
    } else if (verticalOrHorizontalbattleShip === 1) {
      battleShipPlacementHorizontal()
    }
  }

  function computerPlacement() {
    carrierPlacement()
    battleShipPlacement()
    console.log(grid)
    console.log(occupied)
  }

  computerPlacement()

})
