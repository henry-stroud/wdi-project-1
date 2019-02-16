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

  console.log($gridItems[99])



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

  


})
