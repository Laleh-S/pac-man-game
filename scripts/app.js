//
// Pac-Man game

// - create a grid() function losing a for loop.
// - populate certian grids with the .wall class to create a maze. fills the rest with .dots and few .powerups.
// - create and array for every level to indicate what .class goes in what cell and send that to grid() eg [wall, pill, powerup] etc..

// - create .player
// - playerMovment() function stops pacman from entering cells with .wall 
// - changes what direction pacman's mouth is facing based on direction 
// - should allow player to wrap if possible - checks if it shares position with [ghost, dots, powerup, fruit] and runs apropriate function
// - Charecter Class obj for both player creation and ghosts {id: name: speed: startingPosition: currentPosition: chaseBehaviour} 
//  (each ghost chases player in a different way) maybe...
// - ghosts have the same movment limitations as player
// - ghostChaseBehaviour() function depends on distance to player - calculate distance (populate and array with multipul distances from the player) 
// - Ghosts will pick longest or shortest or maybe somewhere in between based on their chaseBehavior property 
// - setInterval() function to keep it checking and updating paths

// - ghostRunBehaviour() function activated when player eats a .powerup from the board 
// - ghosts calculate what near by box would create the largest distance between them and the player 
// - change ghost animation (have them flicker possibly) - stop ghostChaseBehavior()

// - ghostEaten() function remove ghost for a setTimer and place them at the startingPosition (ghosts den)

// - create fruit array of fruit objects {name: , score: , img:} or maybe just one fruit to start with.
// - create dropFruit() function that pops a fruit randomly on spaces with no .wall at certian intervals - and are removed if not eaten after a 
// certian amount of time has passed

//- gameOver() function runs death animation removes the game displays scores.



// Not to think about for now:
//- call different animations based on direction of charecter 
// creating the AI might prove to be the biggest challage here.. maybe figuring out a way to make the charecters transition smoothly between grids 

const grid = document.querySelector('.grid')
const scoreBoard = document.querySelector('.score')

document.querySelector('#gameOver').style.visibility = 'hidden'
document.querySelector('#gameWin').style.visibility = 'hidden'

// document.querySelector('.gameWin-score')
// const gameOverAudio = document.querySelector('#gameOver-audio')
// const gameWinAudio = document.querySelector('#gameWin-audio')
const eatScaredGhostAudio = document.querySelector('#scaredGost-audio')
// const eatPowerDotsAudio = document.querySelector('#eat-power-dots')

const left = 37
const right = 39
const up = 38
const down = 40

// Create Ghost Class 
class Ghost {
  constructor(name, startPosition, pace, directions){
    this.name = name
    this.startPosition = startPosition
    this.directions = directions
    this.currentDirection = this.directions[Math.floor(Math.random() * this.directions.length)] 
    this.pace = pace
    this.currentPosition = startPosition
    this.isScared = false
    this.timerId = 0
  }

  changeCurrentDirection() {
    this.currentDirection = this.directions[Math.floor(Math.random() * this.directions.length)] 
  }

  changeCurrentDirectionToUp() {
    this.currentDirection = this.directions[2]
  }
}

let pacmanCurrentPosition = 0
let score = 0
let cells = []
let ghosts = []

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Creating Grid
function createGrid(maze) {
  removeAllChildNodes(grid)
  cells = []

  for ( let i = 0; i < maze.length; i++){
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)

    if (maze[i] === 0) {
      cells[i].classList.add('dots')
    } else if (maze[i] === 1) {
      cells[i].classList.add('walls')
    } else if (maze[i] === 2) {
      cells[i].classList.add('ghost-house')
    } else if (maze[i] === 3) {
      cells[i].classList.add('power-dots')
    } 
  }
}

// Adding Pac-Man
function addPacman(direction) {
  let cssClass
  switch (direction) {
    case left:
      cssClass = 'pacman'
      break;
    case up:
      cssClass = 'pacman-up'
      break;
    case right:
      cssClass = 'pacman-right'
      break;
    case down:
      cssClass = 'pacman-down'
      break;
  }
  cells[pacmanCurrentPosition].classList.add('pacman')
  cells[pacmanCurrentPosition].classList.add(cssClass)
}

// Removing Pac-Man
function removePacman() {
  const cell = cells[pacmanCurrentPosition]
  cell.classList.remove('pacman')
  cell.classList.remove('pacman-up')
  cell.classList.remove('pacman-right')
  cell.classList.remove('pacman-down')
}

// Pac-Man Eats Dots
function eatDotIfNeeded() {
  if (cells[pacmanCurrentPosition].classList.contains('dots')){
    score += 10
    scoreBoard.innerHTML = score
    cells[pacmanCurrentPosition].classList.remove('dots')
  }
}

function undoScared(){
  ghosts.forEach((ghost) => {
    ghost.isScared = false
  })
}

// Pac-Man Eats Power-dots
function eatPowerDotIFNeeded() {
  if (cells[pacmanCurrentPosition].classList.contains('power-dots')){
    cells[pacmanCurrentPosition].classList.remove('power-dots')  
    score += 50
    scoreBoard.innerHTML = score
    // eatPowerDotsAudio.play('#eat-power-dots')
    ghosts.forEach((ghost) => {
      ghost.isScared = true
      clearInterval(ghost.timerId)
      ghost.pace = 500
      setupGhostMovement(ghost)
    })
    setTimeout(undoScared, 10000)  
  }  
}

// Checking for Wins
function isGameWon () {
  if (score === 300) {
    ghosts.forEach((ghost) => clearInterval(ghost.timerId))
    document.removeEventListener('keydown', handleKeyDown)
    document.querySelector('#gameWin').style.visibility = 'visible'
    // gameWinAudio.play('#gameWin-audio')
    cells[pacmanCurrentPosition].classList.remove('pacman') 
    // document.querySelector('.power-dots').style.visibility = 'hidden'
    ghosts.forEach((ghost) => {
      cells[ghost.currentPosition].classList.remove(ghost.name) 
      cells[ghost.currentPosition].classList.remove('scared-ghost') 
    })
    // gameWinAudio.play('#gameWin-audio')
  }
}

// Checking For Game Over
function isGameOver() {
  if (cells[pacmanCurrentPosition].classList.contains('ghost') // if pacman current position contains ghost
  && !cells[pacmanCurrentPosition].classList.contains('scared-ghost')){  // and pacman current position does not contan scared-ghost
    ghosts.forEach((ghost) => clearInterval(ghost.timerId))
    document.removeEventListener('keydown', handleKeyDown)
    document.querySelector('#gameOver').style.visibility = 'visible'
    document.querySelector('#restart').addEventListener('click', startGame)  
    
    // gameOverAudio.play('#gameover-audio')
    cells[pacmanCurrentPosition].classList.remove('pacman') 
    ghosts.forEach((ghost) => {
      cells[ghost.currentPosition].classList.remove(ghost.name) 
      cells[ghost.currentPosition].classList.remove('scared-ghost') 
    })
  }    
}

// Moving Pac-Man in The Maze
function handleKeyDown(event) {
  const width = Math.sqrt(cells.length)
  const cellCount = cells.length
  const key = event.keyCode // store the event.keyCode in a variable to save us repeatedly typing it out
  // console.log(pacmanCurrentPosition)
  removePacman(cells[pacmanCurrentPosition])

  if (key === left && pacmanCurrentPosition % width !== 0) { 
    if (!cells[pacmanCurrentPosition - 1].classList.contains('walls'))
      pacmanCurrentPosition-- 
    // pacman going through left exit coming out of right
    if (pacmanCurrentPosition - 1 === 363) {
      pacmanCurrentPosition = 391
    }
  } else if (key === right && pacmanCurrentPosition % width !== width - 1 ) { 
    if (!cells[pacmanCurrentPosition + 1].classList.contains('walls'))
      pacmanCurrentPosition++   
    // pacman going through right exit coming out of left
    if (pacmanCurrentPosition + 1 === 392) {
      pacmanCurrentPosition = 364
    }
  } else if (key === up && pacmanCurrentPosition >= width) { 
    if (!cells[pacmanCurrentPosition - width].classList.contains('walls'))
      pacmanCurrentPosition -= width 
    cells[pacmanCurrentPosition].classList.add('pacman-up')
    cells[pacmanCurrentPosition].classList.remove('pacman-up')
    
  } else if (key === down && pacmanCurrentPosition + width <= cellCount - 1) {
    if (!cells[pacmanCurrentPosition + width].classList.contains('walls'))
      pacmanCurrentPosition += width 
  }
  addPacman(key)
  eatDotIfNeeded()
  eatPowerDotIFNeeded()
  isGameWon()
  isGameOver()
}

function addGhosts() {
  // Add the Ghosts to the Grid 
  ghosts.forEach((ghost) => {
    cells[ghost.currentPosition].classList.add(ghost.name) // calling individual ghosts using their name
    cells[ghost.currentPosition].classList.add('ghost') //  
  })

  ghosts.forEach((ghost) => {
    setupGhostMovement(ghost)
  })
}

function moveGhost(ghost) {
  if (!cells[ghost.currentPosition + ghost.currentDirection].classList.contains('walls') &&
      !cells[ghost.currentPosition + ghost.currentDirection].classList.contains('ghost')){  //if this is true...
    cells[ghost.currentPosition].classList.remove(ghost.name) // remove each ghost name to avoid multiplying 
    cells[ghost.currentPosition].classList.replace('ghost','scared-ghost') // replace ghost with scared-ghost
    cells[ghost.currentPosition].classList.remove('scared-ghost') // remove scared-ghost stopped them multiplying
    
    if (cells[ghost.currentPosition].classList.contains('ghost-house')) {
      ghost.changeCurrentDirectionToUp()
    }

    ghost.currentPosition += ghost.currentDirection    
    cells[ghost.currentPosition].classList.add(ghost.name, 'ghost') // add the ghost 
    cells[ghost.currentPosition].classList.add('ghost')
  } 
    
  ghost.changeCurrentDirection()
  
  if (ghost.isScared){
    cells[ghost.currentPosition].classList.add('scared-ghost')
  }
  isGameOver()

  if (ghost.isScared && cells[ghost.currentPosition].classList.contains('pacman')){ 
    eatScaredGhostAudio.play('#scaredGost-audio')
    ghost.isScared = false
    cells[ghost.currentPosition].classList.remove(ghost.name)
    cells[ghost.currentPosition].classList.replace('ghost','scared-ghost') // replace ghost with scared-ghost
    cells[ghost.currentPosition].classList.remove('ghost') 
    cells[ghost.currentPosition].classList.remove('scared-ghost')
    ghost.currentPosition = ghost.startPosition // return ghosts to starting position
    score += 100
    scoreBoard.innerHTML = score

    cells[ghost.currentPosition].classList.add(ghost.name, 'ghost') // return the ghost class back to original by adding the 'ghost' class again  
    cells[ghost.currentPosition].classList.remove('scared-ghost')
    clearInterval(ghost.timerId)
    ghost.pace = 100
    setupGhostMovement(ghost)
  }
}

function setupGhostMovement(ghost) {
  ghost.timerId = setInterval(() => moveGhost(ghost), ghost.pace)
}

function startGame() {
  // Hide the game over popup
  document.querySelector('#gameOver').style.visibility = 'hidden'

  // Reset the score
  score = 0

  // Define the maze
  const maze = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,0,1,1,2,2,1,1,0,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,0,1,2,2,2,2,1,0,1,1,1,0,1,1,1,1,1,1,
    0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,0,
    1,1,1,1,1,1,0,1,1,1,0,1,2,2,2,2,1,0,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,3,1,
    1,0,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,0,1,
    1,0,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,0,1,
    1,0,0,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]

  // Create the board
  createGrid(maze)

  // Reset pac-man
  pacmanCurrentPosition = 490
  addPacman(right)

  // Reset ghosts
  const width = Math.sqrt(cells.length)
  const directions = [-1, +1, -width, +width]
  ghosts = [
    new Ghost('red-ghost', 349, 250, directions),
    new Ghost('green-ghost', 350, 300, directions),
    new Ghost('blue-ghost', 377, 400, directions),
    new Ghost('orange-ghost', 378, 450, directions)
  ]
  addGhosts()

  // Reset keydown tracking
  document.removeEventListener('keydown', handleKeyDown)
  document.addEventListener('keydown', handleKeyDown) // listening for key press
}

startGame()
