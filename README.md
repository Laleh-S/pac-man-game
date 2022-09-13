# Pac-Man Game
Link to the project: https://laleh-s.github.io/GA-Project-1

## Overview
In this project I had three weeks to build a grid base game using JavaScript, HTML and CSS. I was given a list of games to choose from. After going through the options, I decided to choose Pac-Man. Pac-Man, originally called Puck Man in Japan, is a 1980 maze action video game. 

**How it works:**
Pac-Man moves around a maze and eats all the dots inside while avoiding four  ghosts. When Pac-Man eats the large flashing dots the ghosts temporarily turn blue, which allow Pac-Man to eat them for bonus. The Ghosts also have the ability to catch Pac-Man which results in Pac-Man losing life and ending the game.


## Requirements
- Render a game in the browser
- Use JavaScript, CSS and HTML
- Use JavaScript for DOM manipulation
- Deploy the game using GitHub pages

## Technologies Used
- HTML
- CSS
- JavaScript
- DOM
- Git
- GitHub Pages

## Planning and Whiteboarding 
Although I played Pac-Man many times before, I never made the game. Therefore, I began researching to get an idea of the design pattern. After the  research, I had a better understanding of how the Pac-Man game really works behind the scenes. So I started thinking and planning about the functions and the features I would like to include in my game. Once I had a basic layout and features in mind I started with the whiteboarding. I have also planned the timeline and set a target for MVP.
 

<img width="1178" alt="Screen Shot 2022-09-06 at 19 21 52" src="https://user-images.githubusercontent.com/92860992/188717974-8661f786-a694-4ffb-9022-293e1c1c6103.png">

## Timeline

**WEEK 1**  
- Decide which game to choose from
- Plan and whiteboard 
- Create the maze
- Add Pac-Man to the maze

How the maze works is that, all **0**s represent pac-dots, **1**s are walls, **2**s are the ghost house and **3**s are power-dots. 

````
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
  function createGrid(maze) {
  removeAllChildNodes(grid)
  cells = []

  for ( let i = 0; i < maze.length; i++){
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
````

After adding Pac-Man to the board, I had to make it able to move around the grid. Therefore, I created a function to move Pac-Man using keycodes. It worked well, but Pac-Man was faced to one direction at all times, even when it was moving up or down. I had to find a way of turning it head to different directions. I found that this could be fixed with some styling. Although I wanted to leave the styling for the third week, I decided to do this using CSS transform property. 

````
.pacman-up {
  -ms-transform: rotate(90deg); /* IE 9 */
  transform: rotate(90deg);
}

.pacman-right {
  -ms-transform: rotate(180deg); /* IE 9 */
  transform: rotate(180deg);
}

.pacman-down {
  -ms-transform: rotate(270deg); /* IE 9 */
  transform: rotate(270deg);
}


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

````

**WEEK 2** 
- Add ghosts to the maze
- Make the ghosts move in different directions around the maze

Initially when I started creating the ghost, I started with creating one ghost function, I thought I would get one ghost done and then the rest would be easy. When I moved on to create the second ghost I noticed that coding this way would cause repetition. To avoid this, I used a class constructor function to create an object instance of a class. Inside the class constructor I passed the ghost’s name, starting position, pace, and the direction in which they move.


````
function addGhosts() {
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
    cells[ghost.currentPosition].classList.add(ghost.name, 'ghost') 
    cells[ghost.currentPosition].classList.add('ghost')
  } 
    
  ghost.changeCurrentDirection()
  
  if (ghost.isScared){
    cells[ghost.currentPosition].classList.add('scared-ghost')
  }
  lostLife() 
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
````

**WEEK 3** 
- MVP
- Styling 

Because I did not think about creating the game reset option from the beginning of the game I had to refactor the entire code and spend most of my MVP and styling time working on the reset feature. For that reason my final styling was suffored. 
In the last remaining days I mostly focused on adding and editing sounds as well as working on visual effects and gameover pop up screen.

When I was adding sounds to the game I learned about an html loop attribute which puts a sound on loop and plays it over and over which i found helpful. 

````
  <audio control loop id='eat-power-dots' src='sounds/eat-power-dots.wav'></audio>
````


## Project Screenshot

<img width="695" alt="Screen Shot 2022-09-08 at 13 23 21" src="https://user-images.githubusercontent.com/92860992/189110476-b93cd5fe-d300-4d42-bb9f-483c2814acad.png">

## Key Learnings

I learned the importance of good planning and time management in advance. I started working on the game without creating a reset button from the start. It was only in the last week of the project when I realised that.  Unfortunately this caused me a lot of headache and influenced the final result.  When I was creating the ghost I thought creating one ghost to start with and the rest are going to be the same. I was very wrong because that was causing a lot of repetition in my code and that was a wrong practice. 

As well as everything else I learned a lot about Pac-Man game especially the ghosts moving pattern by reading the following source: https://dev.to/code2bits/pac-man-patterns--ghost-movement-strategy-pattern-1k1a

## Challenges

**First challenge** in creating this game was the ghosts movement. The issue was that I set the ghosts starting position to be inside the ghosts house. I wanted my ghost to move in a random direction and this caused some of the ghosts to get stuck inside the ghost house and not be able to get out. I thought I would first get the ghosts out of the ghosts house and then set them to move randomly.

 
**Second challenge** was the reset option of the game. I did not think about creating the reset game function from the beginning of the game therefore creating a reset function at the end of the game caused me a lot of headaches. To fix that I ended up changing the entire code.

## Future Improvements
- Adding ghosts AI movement
- Adding mobile version
- Add levels
- Work on Start and Gameover UI




