# Carcassonne Challenge 🏰🎲

Welcome to Carcassonne Challenge: my web-based implementation of the popular board game Carcassonne! 🎉
This is a single player variation in which the player will try to score as much points as he can.

🛠️ Built with Vite, ReactJS and TypeScript.

## Getting Started 🚀

To get started with the game, follow these steps:

1. Clone the repository to your local machine using the following command: 🤖

        git clone https://github.com/your-username/carcassonne-game.git

2. Install the dependencies using npm: 📦

        npm install

3. Start the development server: 🚀

        npm run dev

The game should now be running on http://localhost:3000. 🌐

## How to Play 🎲

### Objective 🎯

- The objective of Carcassonne Challenge is to score the most points by strategically placing tiles within the limits of a board. 💡

- The game is played by placing tiles on the board to create a landscape. The landscape will be occupied by tiles representing roads, abbeys and
cities. Each of these tiles give the player a different amount of points.  

### Rules 📜

- At the start of each game, you will be dealt four random tiles.

- On each turn you will only be able to place one tile of these types:

  - 🏰 Cities: They can be placed in any free space that is adjacent to any placed tile.
  
  - 🛣️ Roads: They can be placed in any free space that has an adjacent road.
  
  - ⛪ Abbeys: They can be placed in any free space that is adjacent to any placed tile.

- After a tile is placed, you will be dealt a new random tile.

- You are able to discard the tiles in your hand, but this ability takes 5 turns to recharge.

- The game ends when all tiles have been placed, or a tile in your current hand can't be played and you have no discards available. 💥 

### Points ⭐

You are able to gain points through a variety of ways:

- Roads give you one point per tile.

- Abbeys give you one point for each tile that surrounds it. This way, the maximum amount of points per Abbey is 8 points.

- Cities gives you two points per tile, and an extra point for each city chain.

