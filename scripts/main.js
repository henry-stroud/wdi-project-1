$(() => {


  console.log('hello')

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

  console.log(grid)

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

  function computerPlacement() {
    const verticalOrHorizontal = Math.floor(Math.random() * 2)
    console.log(verticalOrHorizontal)
    if (verticalOrHorizontal === 0) {
      const carrierAnchorIndex = Math.floor(Math.random() * 60)
      grid[carrierAnchorIndex] = carrier
      grid[carrierAnchorIndex + 10] = carrier
      grid[carrierAnchorIndex + 20] = carrier
      grid[carrierAnchorIndex + 30] = carrier
      grid[carrierAnchorIndex + 40] = carrier
      console.log(grid)
    }
    if (verticalOrHorizontal === 1) {
      let carrierAnchorIndex
      const row = (Math.floor(Math.random() * 10))
      console.log(row)
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
      console.log(carrierAnchorIndex)
      grid[carrierAnchorIndex] = carrier
      grid[carrierAnchorIndex + 1] = carrier
      grid[carrierAnchorIndex + 2] = carrier
      grid[carrierAnchorIndex + 3] = carrier
      grid[carrierAnchorIndex + 4] = carrier
      console.log(grid)
    }
  }

  computerPlacement()

})
