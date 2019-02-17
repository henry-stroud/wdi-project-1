$(() => {



  const $body = $('body')
  const mainGrid = document.querySelector('.grid')

  $body.css({
    background: 'red'
  })

  // grid creation

  const occupado = 'occupado'

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
  const occupied = []

  // carrier placement

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

  //ship placement function

  function shipPlacementVertical(shipLength, shipType) {
    let shipAnchorIndexVertical = null
    shipAnchorIndexVertical = Math.floor(Math.random() * ((100 - (shipLength * 10)) + 10))
    if (shipLength === 4) {
      for (let i = 0; i < occupied.length; i++) {
        if (shipAnchorIndexVertical === occupied[i] || shipAnchorIndexVertical + 10 === occupied[i] || shipAnchorIndexVertical + 20 === occupied[i] || shipAnchorIndexVertical + 30 === occupied[i]) {
          return shipPlacementVertical(shipLength, shipType)
        }
      }
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical + (10 * i)] = shipType
      }
      if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 !== 9)) {
        for (let i = 0; i < shipLength; i++) {
          grid[shipAnchorIndexVertical - 10] = occupado
          grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado
          grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
          grid[shipAnchorIndexVertical + 1 + (i * 10)] = occupado
        }
      } 
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] === occupado) {
          occupied.push(i)
        }
        if (grid[i] === shipType) {
          occupied.push(i)
        }
      }
    } else if (shipLength === 3) {
      for (let i = 0; i < occupied.length; i++) {
        if (shipAnchorIndexVertical === occupied[i] || shipAnchorIndexVertical + 10 === occupied[i] || shipAnchorIndexVertical + 20 === occupied[i]) {
          return shipPlacementVertical(shipLength, shipType)
        }
      }
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical + (10 * i)] = shipType
      }
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] === shipType) {
          occupied.push(i)
        }
      }
    } else if (shipLength === 2) {
      for (let i = 0; i < occupied.length; i++) {
        if (shipAnchorIndexVertical === occupied[i] || shipAnchorIndexVertical + 10 === occupied[i]) {
          return shipPlacementVertical(shipLength, shipType)
        }
      }
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical + (10 * i)] = shipType
      }
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] === shipType) {
          occupied.push(i)
        }
      }
    }
  }

  function shipPlacementHorizontal(shipLength, shipType) {
    let shipAnchorIndexHorizontal = null
    const row = (Math.floor(Math.random() * 10))
    switch(row) {
      case 0:
        shipAnchorIndexHorizontal = getRandomInt(0,10 - shipLength)
        break
      case 1:
        shipAnchorIndexHorizontal = getRandomInt(10,20 - shipLength)
        break
      case 2:
        shipAnchorIndexHorizontal = getRandomInt(20,30 - shipLength)
        break
      case 3:
        shipAnchorIndexHorizontal = getRandomInt(30,40 - shipLength)
        break
      case 4:
        shipAnchorIndexHorizontal = getRandomInt(40,50 - shipLength)
        break
      case 5:
        shipAnchorIndexHorizontal = getRandomInt(50,60 - shipLength)
        break
      case 6:
        shipAnchorIndexHorizontal = getRandomInt(60,70 - shipLength)
        break
      case 7:
        shipAnchorIndexHorizontal = getRandomInt(70,80 - shipLength)
        break
      case 8:
        shipAnchorIndexHorizontal = getRandomInt(80,90 - shipLength)
        break
      case 9:
        shipAnchorIndexHorizontal = getRandomInt(90,100 - shipLength)
        break
    }
    if (shipLength === 4) {
      for (let i = 0; i < occupied.length; i++) {
        if (shipAnchorIndexHorizontal === occupied[i] || shipAnchorIndexHorizontal + 1 === occupied[i] || shipAnchorIndexHorizontal + 2 === occupied[i] || shipAnchorIndexHorizontal + 3 === occupied[i] ) {
          return shipPlacementHorizontal(shipLength, shipType)
        }
      }
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + i] = shipType
      }
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] === shipType) {
          occupied.push(i)
        }
      }
    } else if (shipLength === 3) {
      for (let i = 0; i < occupied.length; i++) {
        if (shipAnchorIndexHorizontal === occupied[i] || shipAnchorIndexHorizontal + 1 === occupied[i] || shipAnchorIndexHorizontal + 2 === occupied[i]) {
          return shipPlacementHorizontal(shipLength, shipType)
        }
      }
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + i] = shipType
      }
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] === shipType) {
          occupied.push(i)
        }
      }
    } else if (shipLength === 2) {
      for (let i = 0; i < occupied.length; i++) {
        if (shipAnchorIndexHorizontal === occupied[i] || shipAnchorIndexHorizontal + 1 === occupied[i]) {
          return shipPlacementHorizontal(shipLength, shipType)
        }
      }
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + i] = shipType
      }
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] === shipType) {
          occupied.push(i)
        }
      }
    }

  }

  function shipPlacement(shipLength, shipType) {
    const verticalOrHorizontalShip = verticalOrHorizontal()
    if (verticalOrHorizontalShip === 0) {
      shipPlacementVertical(shipLength, shipType)
    } else if (verticalOrHorizontalShip === 1) {
      shipPlacementHorizontal(shipLength, shipType)
    }
  }

  function computerPlacement() {
    carrierPlacement()
    shipPlacement(4, battleShip)
    shipPlacement(3, cruiser)
    shipPlacement(3, submarine)
    shipPlacement(2, destroyer)
    console.log(grid)
    console.log(occupied)
  }

  computerPlacement()


  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === carrier) {
      console.log(grid[i])
      $gridItems.eq(i).addClass('carrier')
    }
    if (grid[i] === battleShip) {
      $gridItems.eq(i).addClass('battleShip')
    }
    if (grid[i] === cruiser) {
      $gridItems.eq(i).addClass('cruiser')
    }
    if (grid[i] === submarine) {
      $gridItems.eq(i).addClass('submarine')
    }
    if (grid[i] === destroyer) {
      $gridItems.eq(i).addClass('destroyer')
    }
  }

  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === occupado) {
      console.log(grid[i])
      $gridItems.eq(i).addClass('occupied')
    }
  }


})
