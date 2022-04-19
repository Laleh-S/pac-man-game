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
const gameOverAudio = document.querySelector('#gameOver-audio')
const gameWinAudio = document.querySelector('#gameWin-audio')
const eatScaredGhostAudio = document.querySelector('#scaredGost-audio')
const eatPowerDotsAudio = document.querySelector('#eat-power-dots')

let score = 0
const width = 28
const cellCount = width * width
const cells = []
const isOver = false
// let target = 3280


// function updateLabels() {
//   document.querySelector('.collected').innerHTML =  + ' / ' + target
//   document.querySelector('.score').innerHTML = target - score
// }
// updateLabels()

// function updateProgress() {
//   document.querySelector('#progress').setAttribute('value', score)
//   document.querySelector('#progress').setAttribute('max', target)
// }
// updateProgress()

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


const left = 37
const right = 39
const up = 38
const down = 40

// const pacmanStartPosition = 292
let pacmanCurrentPosition = 490

function startGame() {





  
}


// Creating Grid
function createGrid() {
  for ( let i = 0; i < maze.length; i++){
    const cell = document.createElement('div')
    // cell.innerText = i
    grid.appendChild(cell)
    cells.push(cell)

    if (maze[i] === 0) {
      cells[i].classList.add('dots')
    } else if (maze[i] === 1) {
      cells[i].classList.add('walls')
    } else if (maze [i] === 2) {
      cells[i].classList.add('ghost-house')
    } else if (maze [i] === 3) {
      cells[i].classList.add('power-dots')
    } 
  }
  addPacman(right)
}
createGrid()


// Adding Pac-Man
function addPacman(key) {
  const currentCell = cells[pacmanCurrentPosition]
  currentCell.classList.add('pacman')
  let cssClass
  switch (key) {
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
  currentCell.classList.add(cssClass)
}

// Removing Pac-Man
function removePacman() {
  const currentCell = cells[pacmanCurrentPosition]
  currentCell.classList.remove('pacman')
  currentCell.classList.remove('pacman-up')
  currentCell.classList.remove('pacman-right')
  currentCell.classList.remove('pacman-down')
}


// Moving Pac-Man in The Maze
function handleKeyDown(event) {
  const key = event.keyCode // store the event.keyCode in a variable to save us repeatedly typing it out
  // console.log(pacmanCurrentPosition)
  removePacman()

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
  eatingdots()
  eatingPowerDots()
  gameWin ()
  gameOver()
}


document.addEventListener('keydown', handleKeyDown) // listening for key press
createGrid() // pass function the starting position of pacman


// Pac-Man Eats Dots
function eatingdots() {
  if (cells[pacmanCurrentPosition].classList.contains('dots')){
    score += 10
    scoreBoard.innerHTML = score
    cells[pacmanCurrentPosition].classList.remove('dots')
  }
}


// Pac-Man Eats Power-dots
function eatingPowerDots() {
  if (cells[pacmanCurrentPosition].classList.contains('power-dots')){
    cells[pacmanCurrentPosition].classList.remove('power-dots')  
    score += 50
    scoreBoard.innerHTML = score
    // eatPowerDotsAudio.play('#eat-power-dots')
    ghosts.forEach((ghost) => {
      ghost.isScared = true
      clearInterval(ghost.timerId)
      ghost.pace = 500
      moveGhost(ghost)
    })
    setTimeout(undoScared, 10000)  
    
  }  
}


function undoScared(){
  ghosts.forEach((ghost) => {
    ghost.isScared = false
  })
}



// Create Ghost Class 
class Ghost {
  constructor(name, startPosition, pace){
    this.name = name
    this.startPosition = startPosition
    this.pace = pace
    this.currentPosition = startPosition
    this.isScared = false
    this.timerId = 0
  }
}


// Meet the Ghosts
ghosts = [
  new Ghost('red-ghost', 349, 250),
  new Ghost('green-ghost', 350, 300),
  new Ghost('blue-ghost', 377, 400),
  new Ghost('orange-ghost', 378, 450)
]


// Add the Ghosts to the Grid 
ghosts.forEach((ghost) => {
  cells[ghost.currentPosition].classList.add(ghost.name) // calling individual ghosts using their name
  cells[ghost.currentPosition].classList.add('ghost') //  
})

ghosts.forEach((ghost) => {
  moveGhost(ghost)
})

// Move the Ghosts 
let directions = [-1, +1, -width, +width]
let randomDirection = directions[Math.floor(Math.random() * directions.length)] 

function moveGhost(ghost) {
  ghost.timerId = setInterval(function(){
    if (!cells[ghost.currentPosition + randomDirection].classList.contains('walls') &&
      !cells[ghost.currentPosition + randomDirection].classList.contains('ghost')){  //if this is true...
      cells[ghost.currentPosition].classList.remove(ghost.name) // remove each ghost name to avoid multiplying 
      cells[ghost.currentPosition].classList.replace('ghost','scared-ghost') // replace ghost with scared-ghost
      cells[ghost.currentPosition].classList.remove('scared-ghost') // remove scared-ghost stopped them multiplying
      
      if (cells[ghost.currentPosition].classList.contains('ghost-house')) {
        (ghost.currentPosition += -width)
      } else {
        ghost.currentPosition += randomDirection 
      }
      
      cells[ghost.currentPosition].classList.add(ghost.name, 'ghost') // add the ghost 
      cells[ghost.currentPosition].classList.add('ghost')
    } randomDirection = directions[Math.floor(Math.random() * directions.length)] // find another random direction
    
    if (ghost.isScared){
      cells[ghost.currentPosition].classList.add('scared-ghost')
    }
    gameOver()

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
      moveGhost(ghost)
    } 
  }, ghost.pace)
}


// Checking for Wins
function gameWin () {
  if (score === 300) {
    ghosts.forEach((ghost) => { clearInterval(ghost.timerId)})
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

function startGame(ghost) {
  createGrid()
  document.querySelector('#gameOver').style.visibility = 'hidden'
  ghosts.forEach((ghost) => {
    moveGhost(ghost)
  })
}

// Checking For Game Over
function gameOver() {
  if (cells[pacmanCurrentPosition].classList.contains('ghost') // if pacman current position contains ghost
  && !cells[pacmanCurrentPosition].classList.contains('scared-ghost')){  // and pacman current position does not contan scared-ghost
    ghosts.forEach((ghost) => { clearInterval(ghost.timerId)})
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






