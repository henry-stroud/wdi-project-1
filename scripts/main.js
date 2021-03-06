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
  const $boxCarrier = $('.boxCarrier')
  const $boxBattleShip = $('.boxBattleShip')
  const $boxSub = $('.boxSub')
  const $boxCruiser = $('.boxCruiser')
  const $boxDestroyer = $('.boxDestroyer')
  const $playButton = $('.playButton')
  const $main = $('main')
  const $winOrLose = $('.winOrLose')

  $playButton.on('click', () => {
    $main.fadeIn(1500)
    $main.css({
      display: 'block'
    })
    $playButton.css({
      display: 'none'
    })
  })

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
    constructor(shipType,lengthOfShip,hitPoints,placed,sunk,position,name,occupied,relatedShip) {
      this.shipType = shipType
      this.lengthOfShip = lengthOfShip
      this.hitPoints = hitPoints
      this.placed = placed
      this.sunk = sunk
      this.position = position
      this.name = name
      this.occupied = occupied
      this.relatedShip = relatedShip
    }
  }

  const carrier = new Ship('carrier','5','5',false,false,[],'Carrier',[])
  const battleShip = new Ship('battleShip','4','4',false,false,[],'Battleship',[])
  const cruiser = new Ship('cruiser','3','3',false,false,[], 'Cruiser',[])
  const submarine = new Ship('submarine','3','3',false,false,[], 'Submarine',[])
  const destroyer = new Ship('destroyer','2','2',false,false,[], 'Destroyer',[])

  const humanCarrier = new Ship('carrier','5','5',false,false, [], 'Carrier',[],$boxCarrier)
  const humanBattleShip = new Ship('battleShip','4','4',false,false,[], 'Battleship',[],$boxBattleShip)
  const humanCruiser = new Ship('cruiser','3','3',false,false,[], 'Cruiser',[],$boxSub)
  const humanSubmarine = new Ship('submarine','3','3',false,false,[], 'Submarine',[],$boxCruiser)
  const humanDestroyer = new Ship('destroyer','2','2',false,false,[], 'Destroyer',[],$boxDestroyer)

  if (carrier.sunk === true) {
    carrier.position
  }


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
        grid[shipAnchorIndexVertical - 10] = occupado + shipType.name
        grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
        grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
        grid[shipAnchorIndexVertical + 1 + (i * 10)] = occupado + shipType.name
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 === 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical - 10] = occupado + shipType.name
        grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
        grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical <= 9) && (shipAnchorIndexVertical % 10 === 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
        grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical <= 9) && (shipAnchorIndexVertical % 10 !== 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
        grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
        grid[shipAnchorIndexVertical + 1 + (i * 10)] = occupado + shipType.name
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 === 0) && (shipAnchorIndexVertical <= 9) && (shipAnchorIndexVertical % 10 !== 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
        grid[shipAnchorIndexVertical + 1 + (i * 10)] = occupado + shipType.name
      }
    } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 === 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 !== 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical - 10] = occupado + shipType.name
        grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
        grid[shipAnchorIndexVertical + 1 + (i * 10)] = occupado + shipType.name
      }
    } else if (shipAnchorIndexVertical > (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 !== 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical - 10] = occupado + shipType.name
        grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
        grid[shipAnchorIndexVertical + 1 + (i * 10)] = occupado + shipType.name
      }
    } else if (shipAnchorIndexVertical >= (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 === 0) && (shipAnchorIndexVertical > 9)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical - 10] = occupado + shipType.name
        grid[shipAnchorIndexVertical + 1 + (i * 10)] = occupado + shipType.name
      }
    } else if (shipAnchorIndexVertical === (100 - (shipLength * 10) - 1) && shipAnchorIndexVertical % 10 === 9) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
        grid[shipAnchorIndexVertical - 10] = occupado + shipType.name
        grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
      }
    } else if (shipAnchorIndexVertical >= (100 - (shipLength * 10) - 1) && shipAnchorIndexVertical % 10 === 9) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexVertical - 10] = occupado + shipType.name
        grid[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
      }
    }
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === occupado + shipType.name) {
        occupied.push(i)
        shipType.occupied.push(i)
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
        grid[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado + shipType.name
      }
    } else if (shipAnchorIndexHorizontal % 10 !== (10 - shipLength) && shipAnchorIndexHorizontal > 8 && shipAnchorIndexHorizontal < 90 && shipAnchorIndexHorizontal % 10 !== 0) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
      }
    } else if (shipAnchorIndexHorizontal > 0 && shipAnchorIndexHorizontal < 9 && shipAnchorIndexHorizontal % 10 !== (10 - shipLength)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
      }
    } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal > 9 && shipAnchorIndexHorizontal < 90) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
      }
    } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal < 9 && shipAnchorIndexHorizontal !== 0) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
      }
    } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal < 9) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
      }
    } else if (shipAnchorIndexHorizontal % 10 === (10 - shipLength) && shipAnchorIndexHorizontal < 9) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
      }
    } else if (shipAnchorIndexHorizontal > 90 && shipAnchorIndexHorizontal % 10 !== (10 - shipLength)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
      }
    } else if (shipAnchorIndexHorizontal === 90) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado + shipType.name
      }
    } else if (shipAnchorIndexHorizontal > 90 && shipAnchorIndexHorizontal % 10 === (10 - shipLength)) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal - 10 + i] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
      }
    } else if (shipAnchorIndexHorizontal === 0) {
      for (let i = 0; i < shipLength; i++) {
        grid[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
        grid[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
      }
    }
    for (let i = 0; i < grid.length; i++) {
      if (grid[i] === occupado + shipType.name) {
        occupied.push(i)
        shipType.occupied.push(i)
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

  const shipArray = [carrier, battleShip, cruiser, submarine, destroyer]
  const humanShipArray = [humanCarrier, humanBattleShip, humanCruiser, humanSubmarine, humanDestroyer]

  for (let i = 0; i < grid.length; i++) {
    for (let x = 0; x < shipArray.length; x++) {
      if (grid[i] === occupado + shipArray[x].name) {
        $gridItems.eq(i).addClass('occupied')
      }
    }
  }

  // human placement

  let humanVerticalOrHorizontal = 1
  let humanShipChoice = 5
  let humanShipType = humanCarrier
  ///////////// vertical or horizontal

  $vertical.on('click', () => {
    humanVerticalOrHorizontal = 0
    $vertical.css({
      background: 'rgba(144,238,144 ,0.5)'
    })
    $horizontal.css({
      background: 'none'
    })
  } )

  $horizontal.css({
    background: 'rgba(144,238,144 ,0.5)'
  })

  $horizontal.on('click', () => {
    humanVerticalOrHorizontal = 1
    $horizontal.css({
      background: 'rgba(144,238,144 ,0.5)'
    })
    $vertical.css({
      background: 'none'
    })
  } )

  ////////////////// ship selection

  $carrierHuman.on('click', () => {
    humanShipChoice = 5
    humanShipType = humanCarrier
    $winOrLose.css({
      display: 'none'
    })
  } )
  $battleShipHuman.on('click', () => {
    humanShipChoice = 4
    humanShipType = humanBattleShip
    $winOrLose.css({
      display: 'none'
    })
  } )
  $subHuman.on('click', () => {
    humanShipChoice = 3
    humanShipType = humanSubmarine
    $winOrLose.css({
      display: 'none'
    })
  } )
  $cruiserHuman.on('click', () => {
    humanShipChoice = 3
    humanShipType = humanCruiser
    $winOrLose.css({
      display: 'none'
    })
  } )
  $destroyerHuman.on('click', () => {
    humanShipChoice = 2
    humanShipType = humanDestroyer
    $winOrLose.css({
      display: 'none'
    })
  } )

  /// number of ships placed


  function humanShipPlacementVertical(shipLength, shipType, index) {
    $winOrLose.css({
      display: 'none'
    })
    if (shipType.placed === true) {
      $winOrLose.css({
        display: 'flex'
      })
      $winOrLose.text('You\'ve already placed this ship')
    } else {
      let shipAnchorIndexVertical = null
      shipAnchorIndexVertical = index
      if (index > (100 - (shipLength * 10) + 9)) {
        $winOrLose.css({
          display: 'flex'
        })
        $winOrLose.text('Ship can\'t be placed here')
        return
      }
      for (let i = 0; i < occupiedHuman.length; i++) {
        for (let x = 0; x < shipLength; x++) {
          if (shipAnchorIndexVertical + (10 * x) === occupiedHuman[i]) {
            $winOrLose.css({
              display: 'flex'
            })
            $winOrLose.text('Ship can\'t be placed here')
            return
          }
        }
      }
      for (let i = 0; i < shipLength; i++) {
        humanGridArray[shipAnchorIndexVertical + (10 * i)] = shipType
        shipType.position.push(shipAnchorIndexVertical + (10 * i))
      }
      if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 !== 9)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexVertical - 10] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical + 1 + (i * 10)] = occupado + shipType.name
        }
      } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 === 9)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexVertical - 10] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
        }
      } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical <= 9) && (shipAnchorIndexVertical % 10 === 9)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
        }
      } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical <= 9) && (shipAnchorIndexVertical % 10 !== 9)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical + 1 + (i * 10)] = occupado + shipType.name
        }
      } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 === 0) && (shipAnchorIndexVertical <= 9) && (shipAnchorIndexVertical % 10 !== 9)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical + 1 + (i * 10)] = occupado + shipType.name
        }
      } else if (shipAnchorIndexVertical < (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 === 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 !== 9)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexVertical - 10] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical + 1 + (i * 10)] = occupado + shipType.name
        }
      } else if (shipAnchorIndexVertical > (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 !== 0) && (shipAnchorIndexVertical > 9) && (shipAnchorIndexVertical % 10 !== 9)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexVertical - 10] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical + 1 + (i * 10)] = occupado + shipType.name
        }
      } else if (shipAnchorIndexVertical >= (100 - (shipLength * 10) - 1) && (shipAnchorIndexVertical % 10 === 0) && (shipAnchorIndexVertical > 9)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexVertical - 10] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical + 1 + (i * 10)] = occupado + shipType.name
        }
      } else if (shipAnchorIndexVertical === (100 - (shipLength * 10) - 1) && shipAnchorIndexVertical % 10 === 9) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexVertical + (shipLength * 10)] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical - 10] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
        }
      } else if (shipAnchorIndexVertical >= (100 - (shipLength * 10) - 1) && shipAnchorIndexVertical % 10 === 9) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexVertical - 10] = occupado + shipType.name
          humanGridArray[shipAnchorIndexVertical - 1 + (i * 10)] = occupado + shipType.name
        }
      }

      for (let i = 0; i < humanGridArray.length; i++) {
        if (humanGridArray[i] === occupado + shipType.name) {
          occupiedHuman.push(i)
          shipType.occupied.push(i)
        }
        if (humanGridArray[i] === shipType) {
          occupiedHuman.push(i)
        }
      }
      shipType.placed = true
    }
  }

  function humanShipPlacementHorizontal(shipLength, shipType, index) {
    $winOrLose.css({
      display: 'none'
    })
    if (shipType.placed === true) {
      $winOrLose.css({
        display: 'flex'
      })
      $winOrLose.text('You\'ve already placed this ship')
      return
    } else {
      let shipAnchorIndexHorizontal = null
      shipAnchorIndexHorizontal = index
      if (shipAnchorIndexHorizontal % 10 > 10 - shipLength) {
        $winOrLose.css({
          display: 'flex'
        })
        $winOrLose.text('Ship can\'t be placed here')
        return
      }
      for (let i = 0; i < occupiedHuman.length; i++) {
        for (let x = 0; x < shipLength; x++) {
          if (shipAnchorIndexHorizontal + (1 * x) === occupiedHuman[i]) {
            $winOrLose.css({
              display: 'flex'
            })
            $winOrLose.text('Ship can\'t be placed here')
            return
          }
        }
      }
      for (let i = 0; i < shipLength; i++) {
        humanGridArray[shipAnchorIndexHorizontal + i] = shipType
        shipType.position.push(shipAnchorIndexHorizontal + i)

      }
      if (shipAnchorIndexHorizontal % 10 === (10 - shipLength) && shipAnchorIndexHorizontal > 8 && shipAnchorIndexHorizontal < 90) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal - 10 + i] = occupado + shipType.name
        }
      } else if (shipAnchorIndexHorizontal % 10 !== (10 - shipLength) && shipAnchorIndexHorizontal > 8 && shipAnchorIndexHorizontal < 90 && shipAnchorIndexHorizontal % 10 !== 0) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal - 10 + i] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
        }
      } else if (shipAnchorIndexHorizontal > 0 && shipAnchorIndexHorizontal < 9 && shipAnchorIndexHorizontal % 10 !== (10 - shipLength)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
        }
      } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal > 9 && shipAnchorIndexHorizontal < 90) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal - 10 + i] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
        }
      } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal < 9 && shipAnchorIndexHorizontal !== 0) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
        }
      } else if (shipAnchorIndexHorizontal % 10 === 0 && shipAnchorIndexHorizontal < 9) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
        }
      } else if (shipAnchorIndexHorizontal % 10 === (10 - shipLength) && shipAnchorIndexHorizontal < 9) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
        }
      } else if (shipAnchorIndexHorizontal > 90 && shipAnchorIndexHorizontal % 10 !== (10 - shipLength)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal - 10 + i] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
        }
      } else if (shipAnchorIndexHorizontal === 90) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal - 10 + i] = occupado + shipType.name
        }
      } else if (shipAnchorIndexHorizontal > 90 && shipAnchorIndexHorizontal % 10 === (10 - shipLength)) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal - 10 + i] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal - 1] = occupado + shipType.name
        }
      } else if (shipAnchorIndexHorizontal === 0) {
        for (let i = 0; i < shipLength; i++) {
          humanGridArray[shipAnchorIndexHorizontal + 10 + i] = occupado + shipType.name
          humanGridArray[shipAnchorIndexHorizontal + shipLength] = occupado + shipType.name
        }
      }
      for (let i = 0; i < humanGridArray.length; i++) {
        if (humanGridArray[i] === occupado + shipType.name) {
          occupiedHuman.push(i)
          shipType.occupied.push(i)
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
      for (let x = 0; x < humanShipArray.length; x++) {
        if (humanGridArray[i] === occupado + humanShipArray[x].name) {
          $humanGridItems.eq(i).addClass('occupied')
        }
      }
    }
    if (humanCarrier.placed === true && humanBattleShip.placed === true && humanCruiser.placed === true && humanSubmarine.placed === true && humanDestroyer.placed === true) {
      $winOrLose.css({
        display: 'flex'
      })
      $winOrLose.text('Click on enemy grid to fire torpedo')
      $main.css({
        display: 'block'
      })
      $winOrLose.on('click', () => {
        $winOrLose.css({
          display: 'none'
        })
      })
      $horizontal.css({
        background: 'none',
        cursor: 'default'
      })
      $vertical.css({
        background: 'none',
        cursor: 'default'
      })
      $humanGridItems.css({
        cursor: 'default'
      })
      $vertical.unbind('click')
      $horizontal.unbind('click')
      $humanGridItems.unbind('click')
      playGame()
    }
  })

  // game function
  let randomNumber
  let lastHit
  let originalShot
  let computerTargetNumbers = [-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,100,101,102,103,104,105,106,107,108,109]
  const humanTargetNumbers = []
  const computerHitNumbers = []
  const computerMissNumbers = []

  function huntedMode(hitRange) {
    if (Math.abs(computerHitNumbers[computerHitNumbers.length - 1] - computerHitNumbers[computerHitNumbers.length - 2]) === 10) {
      randomNumber = Math.floor(Math.random() * 2)
      if (hitRange.every(elem => computerTargetNumbers.indexOf(elem) >= 0)) {
        return huntedMode([originalShot + 10, originalShot - 10])
      }
    } else if (Math.abs(computerHitNumbers[computerHitNumbers.length - 1] - computerHitNumbers[computerHitNumbers.length - 2]) === 1) {
      randomNumber = Math.floor(Math.random() * 2)
      if (hitRange.every(elem => computerTargetNumbers.indexOf(elem) >= 0)) {
        return huntedMode([originalShot - 1, originalShot + 1])
      }
    } else {
      randomNumber = Math.floor(Math.random() * 4)
    }
    // hit range needs to be individual to horizontal or vertical when it is parsed so have the random functions in the computer placement function
    const shotChoice = hitRange[randomNumber]
    for (let i = 0; i < computerTargetNumbers.length; i++) {
      if (shotChoice === computerTargetNumbers[i]) {
        return huntedMode(hitRange)
      }
    }
    for (let i = 0; i < humanShipArray.length; i++) {
      if (humanGridArray[shotChoice] === humanShipArray[i]) {
        const targetedShip = humanShipArray[i]
        targetedShip.hitPoints = targetedShip.hitPoints - 1
        computerHitNumbers.push(shotChoice)
        computerTargetNumbers.push(shotChoice)
        $humanGridItems.eq(shotChoice).addClass('hit')
        if (targetedShip.hitPoints === 0) {
          targetedShip.sunk = true
          for (let x = 0; x < targetedShip.position.length; x++) {
            $humanGridItems.eq(targetedShip.position[x]).addClass('sunk')
          }
          computerTargetNumbers = computerTargetNumbers.concat(targetedShip.occupied)
          targetedShip.relatedShip.css({
            background: 'black'
          })
        }
        return setTimeout(computerShot, 1000)
      }
    }
    $humanGridItems.eq(shotChoice).addClass('miss')
    computerTargetNumbers.push(shotChoice)
    computerMissNumbers.push(shotChoice)
    return
  }

  function computerShot() {
    if (humanCarrier.hitPoints === 0 && humanBattleShip.hitPoints === 0 && humanCruiser.hitPoints === 0 && humanSubmarine.hitPoints === 0 && humanDestroyer.hitPoints === 0) {
      $winOrLose.css({
        display: 'flex'
      })
      $gridItems.unbind('click')
      $winOrLose.text('You Lose, Play Again?')
      $main.css({
        display: 'block'
      })
      $winOrLose.on('click', () => {
        location.reload()
      })
      return
    } else if (carrier.hitPoints === 0 && battleShip.hitPoints === 0 && cruiser.hitPoints === 0 && submarine.hitPoints === 0 && destroyer.hitPoints === 0) {
      $winOrLose.css({
        display: 'flex'
      })
      $gridItems.unbind('click')
      $winOrLose.text('You Won, Play Again?')
      $main.css({
        display: 'block'
      })
      $winOrLose.on('click', () => {
        location.reload()
      })
      return
    } else {
      lastHit = computerHitNumbers[computerHitNumbers.length - 1]
      if (lastHit !== undefined) {
        const shipTargeted = humanGridArray[lastHit]
        const shipTargetedHitpoints = shipTargeted.hitPoints
        if (shipTargetedHitpoints > 0) {
          if (Math.abs(computerHitNumbers[computerHitNumbers.length - 1] - computerHitNumbers[computerHitNumbers.length - 2]) === 10) {
            return huntedMode([lastHit + 10, lastHit - 10])
          } else if (Math.abs(computerHitNumbers[computerHitNumbers.length - 1] - computerHitNumbers[computerHitNumbers.length - 2]) === 10 && lastHit >= 0 && lastHit <= 9) {
            return huntedMode([lastHit + 10, lastHit + 10])
          } else if (Math.abs(computerHitNumbers[computerHitNumbers.length - 1] - computerHitNumbers[computerHitNumbers.length - 2]) === 10 && lastHit >= 90 && lastHit <= 99) {
            return huntedMode([lastHit - 10, lastHit - 10])
          } else if (Math.abs(computerHitNumbers[computerHitNumbers.length - 1] - computerHitNumbers[computerHitNumbers.length - 2]) === 1 && lastHit % 10 !== 0 && lastHit % 10 !== 9) {
            return huntedMode([lastHit - 1, lastHit + 1])
          } else if (Math.abs(computerHitNumbers[computerHitNumbers.length - 1] - computerHitNumbers[computerHitNumbers.length - 2]) === 1 && lastHit % 10 === 0 && lastHit % 10 !== 9) {
            return huntedMode([lastHit + 1, lastHit + 1])
          } else if (Math.abs(computerHitNumbers[computerHitNumbers.length - 1] - computerHitNumbers[computerHitNumbers.length - 2]) === 1 && lastHit % 10 !== 0 && lastHit % 10 === 9) {
            return huntedMode([lastHit - 1, lastHit - 1])
          } else {
            if (lastHit % 10 !== 0 && lastHit % 10 !== 9) {
              return huntedMode([lastHit + 10, lastHit - 10, lastHit - 1, lastHit + 1])
            } else if (lastHit % 10 === 0 && lastHit % 10 !== 9) {
              return huntedMode([lastHit + 10, lastHit - 10, lastHit + 1, lastHit + 1])
            } else if (lastHit % 10 !== 0 && lastHit % 10 === 9) {
              return huntedMode([lastHit + 10, lastHit - 10, lastHit - 1, lastHit - 1])
            }
          }
        }
      }
      const computerHit = Math.floor(Math.random() * 100)
      for (let i = 0; i < computerTargetNumbers.length; i++) {
        if (computerHit === computerTargetNumbers[i]) {
          return computerShot()
        }
      }
      for (let i = 0; i < humanShipArray.length; i++) {
        if (humanGridArray[computerHit] === humanShipArray[i]) {
          const targetedShip = humanShipArray[i]
          targetedShip.hitPoints = targetedShip.hitPoints - 1
          computerHitNumbers.push(computerHit)
          computerTargetNumbers.push(computerHit)
          originalShot = computerHit
          $humanGridItems.eq(computerHit).addClass('hit')
          if (targetedShip.hitPoints === 0) {
            targetedShip.sunk = true
            for (let x = 0; x < targetedShip.position.length; x++) {
              $humanGridItems.eq(targetedShip.position[x]).addClass('sunk')
            }
            computerTargetNumbers = computerTargetNumbers.concat(targetedShip.occupied)
            targetedShip.relatedShip.css({
              background: 'black'
            })
          }
          return setTimeout(computerShot, 1000)
        }
      }
      $humanGridItems.eq(computerHit).addClass('miss')
      computerTargetNumbers.push(computerHit)
      computerMissNumbers.push(computerHit)
      return
    }
  }



  function playGame() {
    $gridItems.on('click', (e) => {
      $winOrLose.css({
        display: 'none'
      })
      const index = $gridItems.index(e.target)
      for (let i = 0; i < humanTargetNumbers.length; i++) {
        if (index === humanTargetNumbers[i]) {
          return
        }
      }
      for (let i = 0; i < shipArray.length; i++) {
        if (grid[index] === shipArray[i]) {
          shipArray[i].hitPoints = shipArray[i].hitPoints - 1
          humanTargetNumbers.push(index)
          $gridItems.eq(index).addClass('hit')
          if (shipArray[i].hitPoints === 0) {
            for (let x = 0; x < shipArray[i].position.length; x++) {
              $gridItems.eq(shipArray[i].position[x]).addClass('sunk')

            }
          }
          if (humanCarrier.hitPoints === 0 && humanBattleShip.hitPoints === 0 && humanCruiser.hitPoints === 0 && humanSubmarine.hitPoints === 0 && humanDestroyer.hitPoints === 0) {
            $gridItems.unbind('click')
            $winOrLose.css({
              display: 'flex'
            })
            $winOrLose.text('You Lose, Play Again?')
            $main.css({
              display: 'block'
            })
            $winOrLose.on('click', () => {
              location.reload()
            })
            return
          } else if (carrier.hitPoints === 0 && battleShip.hitPoints === 0 && cruiser.hitPoints === 0 && submarine.hitPoints === 0 && destroyer.hitPoints === 0) {
            $gridItems.unbind('click')
            $winOrLose.css({
              display: 'flex'
            })
            $winOrLose.text('You Won, Play Again?')
            $main.css({
              display: 'block'
            })
            $winOrLose.on('click', () => {
              location.reload()
            })
            return
          } else {
            return
          }
        }
      }
      $gridItems.eq(index).addClass('miss')
      humanTargetNumbers.push(index)
      return setTimeout(computerShot, 1000)

    })
  }

})
