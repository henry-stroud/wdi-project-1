$(() => {



  const $body = $('body')
  const mainGrid = document.querySelector('.grid')
  const humanGrid = document.querySelector('.humanGrid')
  const $horizontal = $('.horizontal')
  const $vertical = $('.vertical')
  const $carrierHuman = $('.shipCarrier')
  const $battleShipHuman = $('.shipBattleShip')
  const $subHuman = $('.shipSub')
  const $cruiserHuman = $('.shipCruiser')
  const $destroyerHuman = $('.shipDestroyer')

  $body.css({
    background: 'pink'
  })

  //  computer grid creation

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

  // human grid creation

  const humanGridArray = []
  humanGridArray.length = 100

  for (let i = 0; i < grid.length; i++) {
    humanGridArray[i] = 'empty'
  }

  for (let i = 0; i < humanGridArray.length; i++) {
    const humanGridBox = document.createElement('div')
    humanGridBox.setAttribute('class', 'grid-item-human')
    humanGrid.appendChild(humanGridBox)
  }

  const $humanGridItems = $('.grid-item-human')


  // ship creation

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

  const occupied = []

  let occupiedHuman = []

  //ship placement function

  function shipPlacementVertical(shipLength, shipType) {
    let shipAnchorIndexVertical = null
    shipAnchorIndexVertical = Math.floor(Math.random() * ((100 - (shipLength * 10)) + 10))
    for (let i = 0; i < occupied.length; i++) {
      for (let x = 0; x < shipLength; x++) {
        if (shipAnchorIndexVertical + (10 * x) === occupied[i]) {
          return shipPlacementVertical(shipLength, shipType)
        }
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
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 === 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical - 10] = occupado
        grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado
        grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical <= 9) && (shipAnchorIndexVertical % 10 === 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado
        grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical <= 9) && (shipAnchorIndexVertical % 10 !== 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado
        grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
        grid[shipAnchorIndexVertical + 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 === 0) && (shipAnchorIndexVertical <= 9) && (shipAnchorIndexVertical % 10 !== 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado
        grid[shipAnchorIndexVertical + 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 === 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 !== 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical - 10] = occupado
        grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado
        grid[shipAnchorIndexVertical + 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical > (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 !== 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical - 10] = occupado
        grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
        grid[shipAnchorIndexVertical + 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical >= (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 === 0) && (shipAnchorIndexVertical > 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical - 10] = occupado
        grid[shipAnchorIndexVertical + 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical === (100 - (shipLength * 10) - 1) && shipAnchorIndexVertical % 10 === 9) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado
        grid[shipAnchorIndexVertical - 10] = occupado
        grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical >= (100 - (shipLength * 10) - 1) && shipAnchorIndexVertical % 10 === 9) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical - 10] = occupado
        grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
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
    for (let i = 0; i < occupied.length; i++) {
      for (let x = 0; x < shipLength; x++) {
        if (shipAnchorIndexHorizontal + (1 * x) === occupied[i]) {
          return shipPlacementHorizontal(shipLength, shipType)
        }
      }
    }
    for (let i = 0; i < shipLength; i++) {
      grid[shipAnchorIndexHorizontal + i] = shipType
    }
    if (shipAnchorIndexHorizontal % 10 === (10 - shipLength) && shipAnchorIndexHorizontal > 8 && shipAnchorIndexHorizontal < 90) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado
      }
    } else if (shipAnchorIndexHorizontal % 10 !== (10 - shipLength) && shipAnchorIndexHorizontal > 8 && shipAnchorIndexHorizontal < 90 && shipAnchorIndexHorizontal % 10 !== 0) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
      }
    } else if (shipAnchorIndexHorizontal > 0 && shipAnchorIndexHorizontal < 9 && shipAnchorIndexHorizontal % 10 !== (10 - shipLength)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
      }
    } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal > 9 && shipAnchorIndexHorizontal < 90) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
      }
    } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal < 9 && shipAnchorIndexHorizontal !== 0) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
      }
    } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal < 9) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
      }
    } else if (shipAnchorIndexHorizontal % 10 === (10 - shipLength) && shipAnchorIndexHorizontal < 9) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
      }
    } else if (shipAnchorIndexHorizontal > 90 && shipAnchorIndexHorizontal % 10 !== (10 - shipLength)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado
        grid[shipAnchorIndexHorizontal - 1] = occupado
      }
    } else if (shipAnchorIndexHorizontal === 90) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado
      }
    } else if (shipAnchorIndexHorizontal > 90 && shipAnchorIndexHorizontal % 10 === (10 - shipLength)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado
        grid[shipAnchorIndexHorizontal - 1] = occupado
      }
    } else if (shipAnchorIndexHorizontal === 0) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
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
    shipPlacement(5, carrier)
    shipPlacement(4, battleShip)
    shipPlacement(3, cruiser)
    shipPlacement(3, submarine)
    shipPlacement(2, destroyer)
  }

  computerPlacement()


  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === carrier) {
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
      $gridItems.eq(i).addClass('occupied')
    }
  }

  const noDuplicatesOccupiedList = [...new Set(occupied)]


  // human placement

  let humanVerticalOrHorizontal = null
  let humanShipChoice = null
  let humanShipType = null
  let carrierPlaced = false
  let battleShipPlaced = false
  let submarinePlaced = false
  let cruiserPlaced = false
  let destroyerPlaced = false

  ///////////// vertical or horizontal

  $vertical.on('click', () => {
    humanVerticalOrHorizontal = 0
    console.log(humanVerticalOrHorizontal)
  } )

  $horizontal.on('click', () => {
    humanVerticalOrHorizontal = 1
    console.log(humanVerticalOrHorizontal)
  } )

  ////////////////// ship selection

  $carrierHuman.on('click', () => {
    humanShipChoice = 5
    humanShipType = carrier
    console.log(humanShipChoice)
  } )
  $battleShipHuman.on('click', () => {
    humanShipChoice = 4
    humanShipType = battleShip
    console.log(humanShipChoice)
  } )
  $subHuman.on('click', () => {
    humanShipChoice = 3
    humanShipType = submarine
    console.log(humanShipChoice)
  } )
  $cruiserHuman.on('click', () => {
    humanShipChoice = 3
    humanShipType = cruiser
    console.log(humanShipChoice)
  } )
  $destroyerHuman.on('click', () => {
    humanShipChoice = 2
    humanShipType = destroyer
    console.log(humanShipChoice)
  } )

  /// number of ships placed


  function humanShipPlacementVertical(shipLength, shipType, index) {
    let shipAnchorIndexVertical = null
    shipAnchorIndexVertical = index
    occupiedHuman = [...new Set(occupiedHuman)]
    console.log(occupiedHuman)
    for (let i = 0; i < humanGridArray.length; i++) {
      if (humanGridArray[i] === carrier) {
        $humanGridItems.eq(i).removeClass('carrier')
      }
      if (humanGridArray[i] === battleShip) {
        $humanGridItems.eq(i).removeClass('battleShip')
      }
      if (humanGridArray[i] === cruiser) {
        $humanGridItems.eq(i).removeClass('cruiser')
      }
      if (humanGridArray[i] === submarine) {
        $humanGridItems.eq(i).removeClass('submarine')
      }
      if (humanGridArray[i] === destroyer) {
        $humanGridItems.eq(i).removeClass('destroyer')
      }
    }
    for (let i = 0; i < humanGridArray.length; i++) {
      if (humanGridArray[i] === occupado) {
        $humanGridItems.eq(i).removeClass('occupied')
      }
    }
    for (let i = 0; i < humanGridArray.length; i++) {
      if (humanGridArray[i] === occupado) {
        humanGridArray[i] = 'empty'
        occupiedHuman = [...new Set(occupiedHuman)]
        const cat = occupiedHuman.indexOf(i)
        occupiedHuman.splice(cat, 1)
      }
      if (humanGridArray[i] === shipType) {
        humanGridArray[i] = 'empty'
        occupiedHuman = [...new Set(occupiedHuman)]
        const cat = occupiedHuman.indexOf(i)
        occupiedHuman.splice(cat, 1)
      }
    }
    if (index > (100 - (shipLength * 10) + 9)) {
      return (console.log('you cant place here'))
    }
    for (let i = 0; i < occupiedHuman.length; i++) {
      for (let x = 0; x < shipLength; x++) {
        if (shipAnchorIndexVertical + (10 * x) === occupiedHuman[i]) {
          return (console.log('you cant place ship here'))
        }
      }
    }
    for (let i = 0; i < shipLength; i++) {
      humanGridArray[shipAnchorIndexVertical + (10 * i)] = shipType
    }
    if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 !== 9)) {
      for (let i = 0; i < shipLength; i++) {
        humanGridArray[shipAnchorIndexVertical - 10] = occupado
        humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado
        humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
        humanGridArray[shipAnchorIndexVertical + 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 === 9)) {
      for (let i = 0; i < shipLength; i++) {
        humanGridArray[shipAnchorIndexVertical - 10] = occupado
        humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado
        humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical <= 9) && (shipAnchorIndexVertical % 10 === 9)) {
      for (let i = 0; i < shipLength; i++) {
        humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado
        humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical <= 9) && (shipAnchorIndexVertical % 10 !== 9)) {
      for (let i = 0; i < shipLength; i++) {
        humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado
        humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
        humanGridArray[shipAnchorIndexVertical + 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 === 0) && (shipAnchorIndexVertical <= 9) && (shipAnchorIndexVertical % 10 !== 9)) {
      for (let i = 0; i < shipLength; i++) {
        humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado
        humanGridArray[shipAnchorIndexVertical + 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 === 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 !== 9)) {
      for (let i = 0; i < shipLength; i++) {
        humanGridArray[shipAnchorIndexVertical - 10] = occupado
        humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado
        humanGridArray[shipAnchorIndexVertical + 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical > (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 !== 9)) {
      for (let i = 0; i < shipLength; i++) {
        humanGridArray[shipAnchorIndexVertical - 10] = occupado
        humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
        humanGridArray[shipAnchorIndexVertical + 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical >= (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 === 0) && (shipAnchorIndexVertical > 9)) {
      for (let i = 0; i < shipLength; i++) {
        humanGridArray[shipAnchorIndexVertical - 10] = occupado
        humanGridArray[shipAnchorIndexVertical + 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical === (100 - (shipLength * 10) - 1) && shipAnchorIndexVertical % 10 === 9) {
      for (let i = 0; i < shipLength; i++) {
        humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado
        humanGridArray[shipAnchorIndexVertical - 10] = occupado
        humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
      }
    } else if (shipAnchorIndexVertical >= (100 - (shipLength * 10) - 1) && shipAnchorIndexVertical % 10 === 9) {
      for (let i = 0; i < shipLength; i++) {
        humanGridArray[shipAnchorIndexVertical - 10] = occupado
        humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado
      }
    }

    for (let i = 0; i < humanGridArray.length; i++) {
      if (humanGridArray[i] === occupado) {
        occupiedHuman.push(i)
      }
      if (humanGridArray[i] === shipType) {
        occupiedHuman.push(i)
      }
    }
  }

  function humanShipPlacementHorizontal(shipLength, shipType) {
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
    for (let i = 0; i < occupied.length; i++) {
      for (let x = 0; x < shipLength; x++) {
        if (shipAnchorIndexHorizontal + (1 * x) === occupied[i]) {
          return humanShipPlacementHorizontal(shipLength, shipType)
        }
      }
    }
    for (let i = 0; i < shipLength; i++) {
      grid[shipAnchorIndexHorizontal + i] = shipType
    }
    if (shipAnchorIndexHorizontal % 10 === (10 - shipLength) && shipAnchorIndexHorizontal > 8 && shipAnchorIndexHorizontal < 90) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado
      }
    } else if (shipAnchorIndexHorizontal % 10 !== (10 - shipLength) && shipAnchorIndexHorizontal > 8 && shipAnchorIndexHorizontal < 90 && shipAnchorIndexHorizontal % 10 !== 0) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
      }
    } else if (shipAnchorIndexHorizontal > 0 && shipAnchorIndexHorizontal < 9 && shipAnchorIndexHorizontal % 10 !== (10 - shipLength)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
      }
    } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal > 9 && shipAnchorIndexHorizontal < 90) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
      }
    } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal < 9 && shipAnchorIndexHorizontal !== 0) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
      }
    } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal < 9) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
      }
    } else if (shipAnchorIndexHorizontal % 10 === (10 - shipLength) && shipAnchorIndexHorizontal < 9) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
      }
    } else if (shipAnchorIndexHorizontal > 90 && shipAnchorIndexHorizontal % 10 !== (10 - shipLength)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado
        grid[shipAnchorIndexHorizontal - 1] = occupado
      }
    } else if (shipAnchorIndexHorizontal === 90) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado
      }
    } else if (shipAnchorIndexHorizontal > 90 && shipAnchorIndexHorizontal % 10 === (10 - shipLength)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado
        grid[shipAnchorIndexHorizontal - 1] = occupado
      }
    } else if (shipAnchorIndexHorizontal === 0) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado
        grid[shipAnchorIndexHorizontal + shipLength] = occupado
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
  }

  function humanShipPlacement(shipLength, shipType, index) {
    if (humanVerticalOrHorizontal === 0) {
      humanShipPlacementVertical(shipLength, shipType, index)
    } else if (humanVerticalOrHorizontal === 1) {
      humanShipPlacementHorizontal(shipLength, shipType, index)
    }
  }

  $humanGridItems.on('click', (e) => {
    const index = $humanGridItems.index(e.target)
    humanShipPlacement(humanShipChoice, humanShipType, index)
    for (let i = 0; i < humanGridArray.length; i++) {
      if (humanGridArray[i] === carrier) {
        $humanGridItems.eq(i).addClass('carrier')
      }
      if (humanGridArray[i] === battleShip) {
        $humanGridItems.eq(i).addClass('battleShip')
      }
      if (humanGridArray[i] === cruiser) {
        $humanGridItems.eq(i).addClass('cruiser')
      }
      if (humanGridArray[i] === submarine) {
        $humanGridItems.eq(i).addClass('submarine')
      }
      if (humanGridArray[i] === destroyer) {
        $humanGridItems.eq(i).addClass('destroyer')
      }
    }
    for (let i = 0; i < humanGridArray.length; i++) {
      if (humanGridArray[i] === occupado) {
        $humanGridItems.eq(i).addClass('occupied')
      }
    }
    console.log(humanGridArray)
    console.log(occupiedHuman)
  })

  console.log(noDuplicatesOccupiedList)

  console.log(humanGridArray)
  console.log(grid)


// DO NOT WRITE BELOW THIS LINE
})
