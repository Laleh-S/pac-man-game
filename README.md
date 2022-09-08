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

## Planning and whiteboarding 
Although I played Pac-Man many times before, I never made the game. Therefore, I began researching to get an idea of the design pattern. After the  research, I had a better understanding of how the Pac-Man game really works behind the scenes. So I started thinking and planning about the functions and the features I would like to include in my game. Once I had a basic layout and features in mind I started with the whiteboarding. I have also planned the timeline and set a target for MVP.
 

<img width="1178" alt="Screen Shot 2022-09-06 at 19 21 52" src="https://user-images.githubusercontent.com/92860992/188717974-8661f786-a694-4ffb-9022-293e1c1c6103.png">

## Timeline

**week 1**  
- Decide which game to choose from
- Plan and whiteboard 
- Create the maze
- Add Pac-Man to the maze

How the maze works is that, all **0**s represent pac-dots, **1**s are walls, **2**s are the ghost house and **3**s are power-dots. 
````
Creating the maze was fun. 
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
````
  

 
 **week 2** 
 - Add Pac-Man to the maze  
 - Add ghosts to the maze
 - Make Pack-Man and the ghosts move in different directions around the maze
 
 **week 3** 
- MVP
- Add sounds
- Styling 


## Project Screenshot

<img width="695" alt="Screen Shot 2022-09-08 at 13 23 21" src="https://user-images.githubusercontent.com/92860992/189110476-b93cd5fe-d300-4d42-bb9f-483c2814acad.png">



This is a very helpful website I came across while I was searching: https://dev.to/code2bits/pac-man-patterns--ghost-movement-strategy-pattern-1k1a



