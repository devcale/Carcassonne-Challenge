# Carcassonne Challenge 🏰🎲

![image](https://user-images.githubusercontent.com/65783607/225818569-34d1ce90-6944-4185-8c24-c5b664c9ec47.png)

Welcome to Carcassonne Challenge: my web-based implementation of the popular board game Carcassonne! 🎉

This is a single player variation in which the player will try to score as much points as he can, and compare their highest scores to other players' highscores.

🛠️ Built with Vite, ReactJS and TypeScript.

## Getting Started 🚀

To get started with the game, follow these steps:

1.  Clone the repository to your local machine using the following command: 🤖

        git clone https://github.com/devcale/Carcassonne-Challenge.git

2.  Install the dependencies using npm: 📦

        npm install

3.  Start the development server: 🚀

        npm run dev

The game should now be running on http://localhost:3000. 🌐

## Technical Details

Every aspect of the game runs on Vite + ReactJS + TypeScript (except for the leaderboard logic). 

### Managing the game state
In order to manage the game's state, the project leverages React's useContext hook. Using this hook, we avoid prop drilling and can easily access important data throughout the project.

The hook is created using the createContext function, setting up the variables related to the game's state:

    export const GameStateContext: React.Context<GameState> = createContext<GameState>({
    currentTile: 0,
    setCurrentTile: (newTile: number) => {},
    points: 0,
    setPoints: (newPoints: number) => {},
    mapGlobal: [],
    setMapGlobal: (newMapGlobal: { type: string; variant: number }[][]) => {},
    gameMode: 'classic',
    setGameMode: (newGameMode: string) => {},
    ...
    });

The most important value that is stored in the context is the game's board, saved as "mapGlobal".

The variable mapGlobal is a matrix of tile objects, in which each tile object has a type and a variant. The type can be "init", "inactive", "road", "city" or "abbey". The variant is a number which represents the variation of a given type, this is useful for game modes in which there are multiple types of cities, roads, etc. An example of this can be seen on the image below:

![image](https://user-images.githubusercontent.com/65783607/225816387-36a0a333-baf0-42b5-a195-5084e70fb4f2.png)


This hook is then exported as follows:

    export const useGameStateContext = () => useContext(GameStateContext);
    
In order to use and modify each of the values that make up the context, it is necessary to initialize each variable and set function as a state.
This is done in the App.tsx file.
   
It can be imported to any component that is wrapped by the context.

### Initializing the board

The initial board is setup as the inital value of the "mapGlobal" context state in the App.tsx file. The default board size is 11.

A new board is initialized every time a player selects a size from the select mode page. The board is created using a the "Board" class' constructor. This constructor receives the size of the board, the default tile that is going to be assigned to every cell, and what the center tile should be. The board is then retrieved and duplicated in order to avoid any memory errors. The new board is then assigned to the "mapGlobal" context state.   

    const board = new Board(
      size,
      {
        type: 'inactive',
        variant: 0,
      },
      {
        type: 'init',
        variant: 0,
      },
    );
    const newBoard = mapDuplication(board.getBoard());

    setMapGlobal(newBoard);
    
The visual component for the board is then rendered in the BoardComponent.tsx file. Here, a matrix of "Cell" components is created, in which each cell has knowledge of it's location, its type and variant.

### Placing a tile

Each cell component has a "OnClick" attribute, which as the name says, when the cell is clicked triggers a function. The function handles the click by doing the following:
1. Checks if the cell clicked is inactive, this way a previously placed cell can not be replaced.
2. Checks if the tile can be placed in the current position.
3. If the tile can be placed, sets the "type" of the current cell component to the type of the cell that the player had selected in hand.
4. Updates the score.
5. Updates the countdown that manages when a discard can be played.
6. Deals a new tile taking into account the tile dealing considerations.
7. Updates the "mapGlobal" context state.
8. Checks if there are any moves left (if the game has ended).

### Checking if a tile can be placed

In order to check if a tile can be placed, the game uses the "IsPlacementValid" function from the BoardUtils.tsx file. The function receives the tile which wants to be checked, the coordinates where it wants to be placed, the map where it wants to be placed, and the gamemode. The function returns a boolean (true if it can be placed, false otherwise).

The function first retrieves the adjacent cells to the tile:

    let upperCell = { type: 'out', variant: -1 };
    let lowerCell = { type: 'out', variant: -1 };
    let rightCell = { type: 'out', variant: -1 };
    let leftCell = { type: 'out', variant: -1 };

    if (altitude - 1 >= 0) {
      upperCell = map[latitude][altitude - 1];
    }
    if (altitude + 1 < map.length) {
      lowerCell = map[latitude][altitude + 1];
    }
    if (latitude + 1 < map.length) {
      rightCell = map[latitude + 1][altitude];
    }
    if (latitude - 1 >= 0) {
      leftCell = map[latitude - 1][altitude];
    }

And depending on the gamemode, checks which tiles are allowed on each direction. If all the adjacent tiles are valid, then the placement is considered valid. Example for the simplest case, classic challenge:

    if (gameMode === 'classic' || gameMode === 'abbey') {
      if (cell.type === 'city') {
        allowedTypes = ['city', 'abbey', 'road', 'init'];
      } else if (cell.type === 'road') {
        allowedTypes = ['road', 'init'];
      } else if (cell.type === 'abbey') {
        allowedTypes = ['city', 'abbey', 'road', 'init'];
      }

      if (
        currentCell.type === 'inactive' &&
        (allowedTypes.includes(upperCell.type) ||
          allowedTypes.includes(lowerCell.type) ||
          allowedTypes.includes(rightCell.type) ||
          allowedTypes.includes(leftCell.type))
      ) {
        isValid = true;
      }


### Updating the points

In order to know how many points were gained during a move, the game uses the "GainPoints" function from the PointUtils.ts file. 

This function first checks what type of tile is being placed, and then checks the adjacent tiles in order to know how many points have to be added. 

Cities use the "TilesInChain" and "IsCityClosed" functions from the BoardUtils.ts file in order to know how many cities are part of a chain, and if the city is closed for the "City Craze" mode.

### Dealing a new tile

Tile dealing is not completely random, and is managed by the "DealNewTile" function from the TileDealingUtils.ts file. This function checks if an abbey has been dealt in the last 15 turns, as well as 3 cities. Countdown variables are created in the UseContext hook in order to keep track of how many turns have passed without an abbey and the 3 cities. If the countdowns for abbey and cities are big enough, the tile dealing is random and weighted based on the game mode (i.e. abbeys are more common in the Abbeys Ablaze mode).


### Handling a discard

When the player selects to discard his hand, the game manages it by using the "handleDiscard" function from the Discard.tsx component. If the discard countdown is 0, 4 new random tiles are selected using the "DealNewTile" function. This 4 new cards are then set to the "hand" context variable, and the discard countdown is reset. Finally, the game checks if there are any moves left with the new set of tiles.

### Checking if there are any moves left

In order to check if there are any moves left, the game first checks if the player has an available discard. If the player does not have an available discard, the game then checks if any of the tiles in the players hand can be placed in any space on the board. If this is also false, the game has ended and a modal is shown.

### The leaderboard
As the leaderboard needs to be updated globally, scores that are submitted are sent to an express backend, which store the given score on a MongoDB database.
![image](https://user-images.githubusercontent.com/65783607/225813043-e7982e55-a230-4025-8a9f-b0b403bd7188.png)

The top scores are retrieved using a simple query that filters by gamemode and board size. This response is then sorted on descending order and the answer is limited to the top 6 scores. 

The route configuration for retrieving the top scores is the following:

    app.get("/api/leaderboard", async (req, res) => {
    
    let query = {mode: req.query.mode, size: req.query.size}
    try{
        const result = await Score.find(query).sort({points: -1}).limit(6);
        res.json({"scores": result});
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})


