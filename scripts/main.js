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
    constructor(shipType,lengthOfShip,hitPoints,placed,sunk,position,name) {
      this.shipType = shipType
      this.lengthOfShip = lengthOfShip
      this.hitPoints = hitPoints
      this.placed = placed
      this.sunk = sunk
      this.position = position
      this.name = name
    }
  }

  const carrier = new Ship('carrier','5','5',false,false,[],'Carrier')
  const battleShip = new Ship('battleShip','4','4',false,false,[],'Battleship')
  const cruiser = new Ship('cruiser','3','3',false,false,[], 'Cruiser')
  const submarine = new Ship('submarine','3','3',false,false,[], 'Submarine')
  const destroyer = new Ship('destroyer','2','2',false,false,[], 'Destroyer')

  const humanCarrier = new Ship('carrier','5','5',false,false, [], 'Carrier')
  const humanBattleShip = new Ship('battleShip','4','4',false,false,[], 'Battleship')
  const humanCruiser = new Ship('cruiser','3','3',false,false,[], 'Cruiser')
  const humanSubmarine = new Ship('submarine','3','3',false,false,[], 'Submarine')
  const humanDestroyer = new Ship('destroyer','2','2',false,false,[], 'Destroyer')


  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function verticalOrHorizontal() {
    return Math.floor(Math.random() * 2)
  }

  const occupied = []

  const occupiedHuman = []

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
      shipType.position.push(shipAnchorIndexVertical + (10 * i))
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
      shipType.placed = true
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
      shipType.position.push(shipAnchorIndexHorizontal + i)
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
      shipType.placed = true
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
    humanShipType = humanCarrier
    console.log(humanShipChoice)
  } )
  $battleShipHuman.on('click', () => {
    humanShipChoice = 4
    humanShipType = humanBattleShip
    console.log(humanShipChoice)
  } )
  $subHuman.on('click', () => {
    humanShipChoice = 3
    humanShipType = humanSubmarine
    console.log(humanShipChoice)
  } )
  $cruiserHuman.on('click', () => {
    humanShipChoice = 3
    humanShipType = humanCruiser
    console.log(humanShipChoice)
  } )
  $destroyerHuman.on('click', () => {
    humanShipChoice = 2
    humanShipType = humanDestroyer
    console.log(humanShipChoice)
  } )

  /// number of ships placed


  function humanShipPlacementVertical(shipLength, shipType, index) {
    if (shipType.placed === true) {
      console.log('youve already placed this ship')
    } else {
      let shipAnchorIndexVertical = null
      shipAnchorIndexVertical = index
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
        shipType.position.push(shipAnchorIndexVertical + (10 * i))
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
      shipType.placed = true
    }
  }

  function humanShipPlacementHorizontal(shipLength, shipType, index) {
    if (shipType.placed === true) {
      return console.log('youve already placed this ship')
    } else {
      let shipAnchorIndexHorizontal = null
      shipAnchorIndexHorizontal = index
      if (shipAnchorIndexHorizontal % 10 > 10 - shipLength) {
        return (console.log('you cant place here'))
      }
      for (let i = 0; i < occupiedHuman.length; i++) {
        for (let x = 0; x < shipLength; x++) {
          if (shipAnchorIndexHorizontal + (1 * x) === occupiedHuman[i]) {
            return (console.log('you cant place ship here'))
          }
        }
      }
      for (let i = 0; i < shipLength; i++) {
        humanGridArray[shipAnchorIndexHorizontal + i] = shipType
        shipType.position.push(shipAnchorIndexHorizontal + i)

      }
      if (shipAnchorIndexHorizontal % 10 === (10 - shipLength) && shipAnchorIndexHorizontal > 8 && shipAnchorIndexHorizontal < 90) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado
          humanGridArray[shipAnchorIndexHorizontal - 10 + i] = occupado
        }
      } else if (shipAnchorIndexHorizontal % 10 !== (10 - shipLength) && shipAnchorIndexHorizontal > 8 && shipAnchorIndexHorizontal < 90 && shipAnchorIndexHorizontal % 10 !== 0) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado
          humanGridArray[shipAnchorIndexHorizontal - 10 + i] = occupado
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado
        }
      } else if (shipAnchorIndexHorizontal > 0 && shipAnchorIndexHorizontal < 9 && shipAnchorIndexHorizontal % 10 !== (10 - shipLength)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado
        }
      } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal > 9 && shipAnchorIndexHorizontal < 90) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado
          humanGridArray[shipAnchorIndexHorizontal - 10 + i] = occupado
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado
        }
      } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal < 9 && shipAnchorIndexHorizontal !== 0) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado
        }
      } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal < 9) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado
        }
      } else if (shipAnchorIndexHorizontal % 10 === (10 - shipLength) && shipAnchorIndexHorizontal < 9) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado
        }
      } else if (shipAnchorIndexHorizontal > 90 && shipAnchorIndexHorizontal % 10 !== (10 - shipLength)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado
          humanGridArray[shipAnchorIndexHorizontal - 10 + i] = occupado
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado
        }
      } else if (shipAnchorIndexHorizontal === 90) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado
          humanGridArray[shipAnchorIndexHorizontal - 10 + i] = occupado
        }
      } else if (shipAnchorIndexHorizontal > 90 && shipAnchorIndexHorizontal % 10 === (10 - shipLength)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal - 10 + i] = occupado
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado
        }
      } else if (shipAnchorIndexHorizontal === 0) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado
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
      shipType.placed = true
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
      if (humanGridArray[i] === humanCarrier) {
        $humanGridItems.eq(i).addClass('carrier')
      }
      if (humanGridArray[i] === humanBattleShip) {
        $humanGridItems.eq(i).addClass('battleShip')
      }
      if (humanGridArray[i] === humanCruiser) {
        $humanGridItems.eq(i).addClass('cruiser')
      }
      if (humanGridArray[i] === humanSubmarine) {
        $humanGridItems.eq(i).addClass('submarine')
      }
      if (humanGridArray[i] === humanDestroyer) {
        $humanGridItems.eq(i).addClass('destroyer')
      }
    }
    for (let i = 0; i < humanGridArray.length; i++) {
      if (humanGridArray[i] === occupado) {
        $humanGridItems.eq(i).addClass('occupied')
      }
    }
    console.log(humanGridArray)
    if (humanCarrier.placed === true && humanBattleShip.placed === true && humanCruiser.placed === true && humanSubmarine.placed === true && humanDestroyer.placed === true) {
      console.log('all placed')
      playGame()
    }
  })

  // game function

  const shipArray = [carrier, battleShip, cruiser, submarine, destroyer]
  const humanShipArray = [humanCarrier, humanBattleShip, humanCruiser, humanSubmarine, humanDestroyer]

  const computerTargetNumbers = []
  const humanTargetNumbers = []

  function computerShot() {
    const computerHit = Math.floor(Math.random() * 100)
    console.log(computerHit)
    console.log(humanGridArray[computerHit])
    for (let i = 0; i < computerTargetNumbers.length; i++) {
      if (computerHit === computerTargetNumbers[i]) {
        console.log('already tried this square')
        return computerShot()
      }
    }
    for (let i = 0; i < humanShipArray.length; i++) {
      if (humanGridArray[computerHit] === humanShipArray[i]) {
        humanShipArray[i].hitPoints = humanShipArray[i].hitPoints - 1
        console.log('hit!')
        computerTargetNumbers.push(computerHit)
        $humanGridItems.eq(computerHit).addClass('hit')
        for (let x = 0; x < humanShipArray[i].position.length; x++) {
          if (humanShipArray[i].hitPoints === 0) {
            $humanGridItems.eq(humanShipArray[i].position[x]).addClass('sunk')
            console.log(`${humanShipArray[i].name} has been sunk!`)
          }
        }
        console.log(humanGridArray)
        return setTimeout(computerShot, 1000)
      }
    }
    console.log('miss!')
    $humanGridItems.eq(computerHit).addClass('miss')
    computerTargetNumbers.push(computerHit)
    console.log(humanGridArray)
    return console.log(computerTargetNumbers)
  }



  function playGame() {
    $gridItems.on('click', (e) => {
      if (humanCarrier.hitPoints === 0 && humanBattleShip.hitPoints === 0 && humanCruiser.hitPoints === 0 && humanSubmarine.hitPoints === 0 && humanDestroyer.hitPoints === 0) {
        return console.log('You Lose')
      } else if (carrier.hitPoints === 0 && battleShip.hitPoints === 0 && cruiser.hitPoints === 0 && submarine.hitPoints === 0 && destroyer.hitPoints === 0) {
        return console.log('You Win')
      } else {
        const index = $gridItems.index(e.target)
        for (let i = 0; i < humanTargetNumbers.length; i++) {
          if (index === humanTargetNumbers[i]) {
            return console.log('youve already tried this square')
          }
        }
        for (let i = 0; i < shipArray.length; i++) {
          if (grid[index] === shipArray[i]) {
            shipArray[i].hitPoints = shipArray[i].hitPoints - 1
            console.log('hit!')
            humanTargetNumbers.push(index)
            $gridItems.eq(index).addClass('hit')
            for (let x = 0; x < shipArray[i].position.length; x++) {
              if (shipArray[i].hitPoints === 0) {
                $gridItems.eq(shipArray[i].position[x]).addClass('sunk')
                console.log(`${shipArray[i].name} has been sunk!`)
              }
            }
            return console.log(grid)
          }
        }
        console.log('miss!')
        $gridItems.eq(index).addClass('miss')
        humanTargetNumbers.push(index)
        console.log(grid)
        return setTimeout(computerShot, 1000)
      }
    })
  }

  console.log(grid)



  // DO NOT WRITE BELOW THIS LINE

  // function for taking out of array

  // occupiedHuman = [...new Set(occupiedHuman)]
  // console.log(occupiedHuman)
  // console.log(occupado + shipLength)
  // for (let i = 0; i < humanGridArray.length; i++) {
  //   if (humanGridArray[i] === carrier) {
  //     $humanGridItems.eq(i).removeClass('carrier')
  //   }
  //   if (humanGridArray[i] === battleShip) {
  //     $humanGridItems.eq(i).removeClass('battleShip')
  //   }
  //   if (humanGridArray[i] === cruiser) {
  //     $humanGridItems.eq(i).removeClass('cruiser')
  //   }
  //   if (humanGridArray[i] === submarine) {
  //     $humanGridItems.eq(i).removeClass('submarine')
  //   }
  //   if (humanGridArray[i] === destroyer) {
  //     $humanGridItems.eq(i).removeClass('destroyer')
  //   }
  // }
  // for (let i = 0; i < humanGridArray.length; i++) {
  //   if (humanGridArray[i] === occupado + shipLength) {
  //     $humanGridItems.eq(i).removeClass('occupied')
  //   }
  // }
  // for (let i = 0; i < humanGridArray.length; i++) {
  //   if (humanGridArray[i] === occupado + shipLength) {
  //     humanGridArray[i] = 'empty'
  //     occupiedHuman = [...new Set(occupiedHuman)]
  //     const cat = occupiedHuman.indexOf(i)
  //     occupiedHuman.splice(cat, 1)
  //   }
  //   if (humanGridArray[i] === shipType) {
  //     humanGridArray[i] = 'empty'
  //     occupiedHuman = [...new Set(occupiedHuman)]
  //     const cat = occupiedHuman.indexOf(i)
  //     occupiedHuman.splice(cat, 1)
  //   }
  // }

})
