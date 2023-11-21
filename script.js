const gridSize = 11;
const grid = [];
let score = 0;
let remainingTimeUnits = 20;
let remainingTimeUnitsSeason = 7
let currentlySelectedElement = null;
const seasonNames = ['Spring', 'Summer', 'Autumn', 'Winter'];
let currentSeasonIndex = 0; 
let currentSeasonMissionMapping = {};
const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]


const missionCards = [
    {
        name: 'Edge of the forest',
        description: 'You get one point for each forest field adjacent to the edge of your map.',
        completed: false,
        calculatePoints: function() {
            let points = 0;
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    if (grid[row][col].terrain === 'forest') {
                        // Check if the forest field is adjacent to the edge
                        if (
                            row === 0 || row === gridSize - 1 ||
                            col === 0 || col === gridSize - 1
                        ) {
                            points++;
                        }
                    }
                }
            }
            return points;
        }
    },
    {
        name: 'Sleepy valley',
        description: 'For every row with three forest fields, you get four points.',
        completed: false,
        calculatePoints: function() {
            let points = 0;
            for (let row = 0; row < gridSize; row++) {
                let forestCount = 0;
                for (let col = 0; col < gridSize; col++) {
                    if (grid[row][col].terrain === 'forest') {
                        forestCount++;
                    }
                }
                if (forestCount === 3) {
                    points += 4;
                }
            }
            return points;
        }
    },
    {
        name: 'Watering potatoes',
        description: 'You get two points for each water field adjacent to your farm fields.',
        completed: false,
        calculatePoints: function() {
            let points = 0;
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    if (grid[row][col].terrain === 'farm') {
                        // Check adjacent cells for water fields
                        if (row > 0 && grid[row - 1][col].terrain === 'water') {
                            points += 2;
                        }
                        if (row < gridSize - 1 && grid[row + 1][col].terrain === 'water') {
                            points += 2;
                        }
                        if (col > 0 && grid[row][col - 1].terrain === 'water') {
                            points += 2;
                        }
                        if (col < gridSize - 1 && grid[row][col + 1].terrain === 'water') {
                            points += 2;
                        }
                    }
                }
            }
            return points;
        }
    },
    {
        name: 'Borderlands',
        description: 'For each full row or column, you get six points.',
        completed: false,
        calculatePoints:function(){
            let points = 0;

            // Calculate points for filled rows
            for (let row = 0; row < gridSize; row++) {
                let isFullRow = true;
                for (let col = 0; col < gridSize; col++) {
                    if (grid[row][col].terrain === 'empty') {
                        isFullRow = false;
                        console.log(row, col);
                        console.log(grid[row][col]);
                        console.log("inside if");
                        break; // If any cell in the row is empty, mark it as not full and exit the loop
                    }
                    console.log("out of if");
                }
                if (isFullRow) {
                    console.log("Row is filled");
                    console.log(row);
                    points += 6; // Add 6 points for each filled row
                }
            }
        
            // Calculate points for filled columns
            for (let col = 0; col < gridSize; col++) {
                let isFullColumn = true;
                for (let row = 0; row < gridSize; row++) {
                    if (grid[row][col].terrain === 'empty') {
                        isFullColumn = false;
                        break; // If any cell in the column is empty, mark it as not full and exit the loop
                    }
                }
                if (isFullColumn) {
                    console.log("Column is filled");
                    console.log(col);
                    points += 6; // Add 6 points for each filled column
                }
            }
        
            return points;
}  
    },

    {
        name: 'Tree line',
        description: 'You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts.',
        completed: false,
        calculatePoints: function() {
            let maxTreeLineLength = 0;
            let currentTreeLineLength = 0;
            
            for (let col = 0; col < gridSize; col++) {
                for (let row = 0; row < gridSize; row++) {
                    // Check if the cell is part of a forest
                    if (grid[row][col].terrain === 'forest') {
                        currentTreeLineLength++;
                    } else {
                        // The forest is interrupted, update the max length if needed
                        maxTreeLineLength = Math.max(maxTreeLineLength, currentTreeLineLength);
                        currentTreeLineLength = 0;
                    }
                }
                // Update the max length at the end of each column
                maxTreeLineLength = Math.max(maxTreeLineLength, currentTreeLineLength);
                currentTreeLineLength = 0;
            }
    
            // Calculate points: 2 points for each field in the longest tree line
            const points = 2 * maxTreeLineLength;
            return points;
        }
    },
    {
        name: 'Wealthy town',
        description: 'You get three points for each of your village fields adjacent to at least three different terrain types.',
        completed: false,
        calculatePoints: function() {
            let points = 0;
            
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    // Check if the cell is a village
                    if (grid[row][col].terrain === 'town') {
                        // Count the number of different terrain types adjacent to this village
                        const uniqueTerrainTypes = new Set();
                        
                        // Check all adjacent cells
                        for (let i = -1; i <= 1; i++) {
                            for (let j = -1; j <= 1; j++) {
                                const adjacentRow = row + i;
                                const adjacentCol = col + j;
                                
                                // Check if the adjacent cell is within the grid
                                if (
                                    adjacentRow >= 0 &&
                                    adjacentRow < gridSize &&
                                    adjacentCol >= 0 &&
                                    adjacentCol < gridSize
                                ) {
                                    const terrainType = grid[adjacentRow][adjacentCol].terrain;
                                    if (terrainType !== 'empty') {
                                        uniqueTerrainTypes.add(terrainType);
                                    }
                                }
                            }
                        }
                        
                        // If the village is adjacent to at least three different terrain types, award points
                        if (uniqueTerrainTypes.size >= 3) {
                            points += 3;
                        }
                    }
                }
            }
    
            return points;
        }
    },
    {
        name: "Magicians valley",
        description: 'You get three points for your water fields adjacent to your mountain fields.',
        completed: false,
        calculatePoints: function() {
            let points = 0;
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    // Check if the cell is a water field
                    if (grid[row][col].terrain === 'water') {
                        // Check all adjacent cells
                        for (let i = -1; i <= 1; i++) {
                            for (let j = -1; j <= 1; j++) {
                                const adjacentRow = row + i;
                                const adjacentCol = col + j;
    
                                // Check if the adjacent cell is within the grid
                                if (
                                    adjacentRow >= 0 &&
                                    adjacentRow < gridSize &&
                                    adjacentCol >= 0 &&
                                    adjacentCol < gridSize
                                ) {
                                    // Check if the adjacent cell is a mountain field
                                    if (grid[adjacentRow][adjacentCol].terrain === 'mountain') {
                                        points += 3; // Award 3 points for each water field adjacent to a mountain field
                                    }
                                }
                            }
                        }
                    }
                }
            }
    
            return points;
        }
    },
    {
        name: 'Empty site',
        description: 'You get two points for empty fields adjacent to your village fields.',
        completed: false,
        calculatePoints: function() {
            let points = 0;
    
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    // Check if the cell is a village field
                    if (grid[row][col].terrain === 'town') {
                        // Check all adjacent cells
                        for (let i = -1; i <= 1; i++) {
                            for (let j = -1; j <= 1; j++) {
                                const adjacentRow = row + i;
                                const adjacentCol = col + j;
    
                                // Check if the adjacent cell is within the grid
                                if (
                                    adjacentRow >= 0 &&
                                    adjacentRow < gridSize &&
                                    adjacentCol >= 0 &&
                                    adjacentCol < gridSize
                                ) {
                                    // Check if the adjacent cell is empty
                                    if (grid[adjacentRow][adjacentCol].terrain === 'empty') {
                                        points += 2; // Award 2 points for each empty field adjacent to a village field
                                    }
                                }
                            }
                        }
                    }
                }
            }
    
            return points;
        }
    },
    {
        name: 'Row of houses',
        description: 'For each field in the longest village fields that are horizontally uninterrupted and contiguous, you will get two points.',
        completed: false,
        calculatePoints: function() {
            let points = 0;
            let currentStreak = 0;
            let longestStreak = 0;
    
            for (let row = 0; row < gridSize; row++) {
                currentStreak = 0;
    
                for (let col = 0; col < gridSize; col++) {
                    if (grid[row][col].terrain === 'town') {
                        currentStreak++;
                    } else {
                        if (currentStreak > longestStreak) {
                            longestStreak = currentStreak;
                        }
                        currentStreak = 0;
                    }
                }
    
                if (currentStreak > longestStreak) {
                    longestStreak = currentStreak;
                }
            }
    
            points = longestStreak * 2; // Award 2 points for each field in the longest village fields
            return points;
        }
    },
    {
        name: 'Odd numbered silos',
        description: 'For each of your odd-numbered full columns, you get 10 points.',
        completed: false,
        calculatePoints: function() {
            let points = 0;
    
            for (let col = 1; col < gridSize; col += 2) {
                let isFullColumn = true;
                for (let row = 0; row < gridSize; row++) {
                    if (grid[row][col].terrain === 'empty') {
                        isFullColumn = false;
                        break;
                    }
                }
                if (isFullColumn) {
                    points += 10; // Award 10 points for each odd-numbered full column
                }
            }
    
            return points;
        }
    },
    {
        name: 'Rich countryside',
        description: 'For each row with at least five different terrain types, you will receive four points.',
        completed: false,
        calculatePoints: function() {
            let points = 0;
    
            for (let row = 0; row < gridSize; row++) {
                let terrainTypes = new Set();
    
                for (let col = 0; col < gridSize; col++) {
                    terrainTypes.add(grid[row][col].terrain);
                }
    
                if (terrainTypes.size >= 5) {
                    points += 4; // Award 4 points for each row with at least five different terrain types
                }
            }
    
            return points;
        }
    }    
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function intialState() {
    puzzleElements = shuffleArray(elements);
    const gridContainer = document.getElementById("grid-container");
    for (let row = 0; row < gridSize; ++row) {
        grid[row] = [];

        for (let col = 0; col < gridSize; ++col) {
            // Set the terrain type based on the initial grid elements
            const terrainType = isMountainCell(row, col) ? "mountain" : "empty"; // Use the type of the first element
            grid[row][col] = { terrain: terrainType, timeValue: 0 };
            const cell = document.createElement("div");
            cell.className = "grid-cell";
            cell.dataset.terrain = terrainType;
            cell.dataset.row = row;
            cell.dataset.col = col;

            const img = document.createElement("img");
            img.alt = "";
            cell.appendChild(img);

            gridContainer.appendChild(cell);
            // cell.addEventListener("click", () => handleCellClick(cell));
        }
    }
    const cells = gridContainer.querySelectorAll(".grid-cell");
    cells.forEach(cell => {
        const terrainType = cell.dataset.terrain;
        const img = cell.querySelector("img");

        if (terrainType === "mountain") {
            img.src = "mountain_tile.png"; // Set the image source for mountain cells
        } else {
            img.src = "base_tile.png"; // Set the image source for empty cells
        }
    });
    console.log("initials done");
}

const gridContainer = document.getElementById("grid-container");

gridContainer.addEventListener("click", (event) => {
    const cell = event.target.closest(".grid-cell");

    if (cell) {
        // Check if a valid element is currently selected
        if (currentlySelectedElement) {
            // Get the row and col from the cell's data attributes
            console.log("here")
            const rowIndex = parseInt(cell.dataset.row);
            const colIndex = parseInt(cell.dataset.col);
            // Attempt to place the element on the grid
            const placementValid = placeElementOnGrid(currentlySelectedElement, rowIndex, colIndex);

            if (placementValid) {
                // Update the visual representation of the grid
                updateGridVisuals(rowIndex, colIndex, currentlySelectedElement);
                
                // Deduct time units and update the score
                remainingTimeUnits -= currentlySelectedElement.time;
                remainingTimeUnitsSeason -= currentlySelectedElement.time;
                updateUIForSeason();
                console.log(remainingTimeUnits);
                console.log(remainingTimeUnitsSeason);


                if (remainingTimeUnitsSeason <= 0) {
                    updateUIForSeason();
                    updateSeason();
                    remainingTimeUnitsSeason = 7;
                }
                if(remainingTimeUnits <= 0)
                {
                   endGame();
                }

                displayNextElement();
                // updateScore();
            }
        }
    }
});


function calculateSeasonScore() {
    let seasonScore = 0;

    // Get the labels for the missions of the current season
    const currentSeasonMissionLabels = missions[seasonNames[currentSeasonIndex]];
    console.log(currentSeasonMissionMapping);
    // Calculate points for completed missions
    missionCards.forEach(missionCard => {
        const isMissionInCurrentSeason = currentSeasonMissionLabels.some(label => currentSeasonMissionMapping[label] === missionCard.name);
        console.log(isMissionInCurrentSeason);
        console.log("isMissionInCurrentSeason");
        if (isMissionInCurrentSeason && !missionCard.completed) {
            console.log("mariam is here");
            seasonScore += missionCard.calculatePoints();
            missionCard.completed = true; // Reset for next time this mission appears
            console.log(seasonScore);
        }
    });

    // Update the score display and reset completed flags as needed
    updateScoreDisplay(seasonScore);

    return seasonScore;
}



function updateSeason() {
    // Increment currentSeasonIndex, and loop back to 0 if it exceeds the number of seasons
    currentSeasonIndex = (currentSeasonIndex + 1) % seasonNames.length;

    // Update UI to show the new season
    // ...
    console.log("before");
    // Update and highlight missions for the new season
    displayMissionCards();
    console.log("after");


    // Calculate and display score for the ended season
    calculateSeasonScore();


    console.log("after the after");
}

function updateScoreDisplay(seasonScore) {
    let scoreElementId;

    switch (seasonNames[currentSeasonIndex]) {
        case 'Spring':
            scoreElementId = 'spring-score';
            break;
        case 'Summer':
            scoreElementId = 'summer-score';
            break;
        case 'Autumn':
            scoreElementId = 'autumn-score';
            break;
        case 'Winter':
            scoreElementId = 'winter-score';
            break;
        default:
            console.error('Invalid season name');
            return;
    }

    const scoreElement = document.getElementById(scoreElementId);
    if (scoreElement) {
        scoreElement.textContent = seasonScore;
    } else {
        console.error('Score element not found for the season:', seasonNames[currentSeasonIndex]);
    }
}


function isMountainCell(row, col) {
    const mountainPositions = [
        { row: 1, col: 1 },
        { row: 3, col: 8 },
        { row: 5, col: 3 },
        { row: 8, col: 9 },
        { row: 9, col: 5 }
    ];

    return mountainPositions.some(position => position.row === row && position.col === col);
}

const startButton = document.querySelector("#start-button")

startButton.addEventListener("click", intialState);

function getImageForType(type) {
    // Define the mapping between types and image URLs
    const typeToImageMap = {
        'water': 'water_tile.png',
        'town': 'village_tile.png',
        'forest': 'forest_tile.png',
        'farm': 'plains_tile.png',
        // Add other types as needed
    };
    return typeToImageMap[type] || 'base_tile.png'; // Fallback image
}

function updateGridVisuals(startRow, startCol, selectedElement) {
    
    const numRows = selectedElement.shape.length;
    const numCols = selectedElement.shape[0].length;
    console.log("I'm updating visuals");
    
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const gridRow = startRow + row;
            const gridCol = startCol + col;
            const cellDiv = document.querySelector(`[data-row="${gridRow}"][data-col="${gridCol}"]`);
            if (selectedElement.shape[row][col] === 1) {
                // Set the background image of the cell to match the selected element's type
                cellDiv.style.backgroundImage = `url('${getImageForType(selectedElement.type)}')`;

                // Update the data-terrain attribute to reflect the type of the element
                cellDiv.dataset.terrain = selectedElement.type;
                cellDiv.setAttribute("reserved", "true");

                // Update the time value display on the cell
                
                cellDiv.innerHTML = "";
                grid[gridRow][gridCol].terrain = selectedElement.type;
                grid[gridRow][gridCol].timeValue = selectedElement.time;
                
                // Update the score based on the placed element's type and time value
                // score += calculateScore(selectedElement.type, selectedElement.time);
            } else if (isMountainCell(gridRow,gridCol)) {
                // If the cell is a mountain, set its background to "mountain_tile"
                cellDiv.style.backgroundImage = `url('mountain_tile.png')`;
            } else if (selectedElement.shape[row][col] === 0) {
                // For unfilled cells, do not update the background image
                continue;
            }
        }
    }

    
        

    // Update the score display
    const scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = `Score: ${score}`;
    
  
}

function placeElementOnGrid(selectedElement, startRow, startCol) {
    const numRows = selectedElement.shape.length;
    const numCols = selectedElement.shape[0].length;
    let availbe = true;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (selectedElement.shape[row][col] === 1){
                    if (
                        startRow + row >= gridSize ||
                        startCol + col >= gridSize
                    ) {
                        console.log("here is the reason");
                        return false;
                    }
                    const gridRow = startRow + row;
                    const gridCol = startCol + col;
                    console.log(`Cell at (${gridRow}, ${gridCol}) is filled.`);
                    
                    if (isMountainCell(gridRow, gridCol)) {
                        console.log(`reson fails 2 (${gridRow}, ${gridCol})`);
                        return false;
                        
                    }
                    // Check if the cell is reserved
                const cellDiv = document.querySelector(`[data-row="${gridRow}"][data-col="${gridCol}"]`);
                if (cellDiv.getAttribute("reserved") === "true") {
                    console.log(`Invalid placement: cell at (${gridRow}, ${gridCol}) is reserved`);
                    return false;
                }
                

            }
            }
        }

        
   
    console.log("Placement valid: ");
    return true;
}

const missions = {
        Spring: ['A', 'B'],
        Summer: ['B', 'C'],
        Autumn: ['C', 'D'],
        Winter: ['D', 'A'],
      };
      function displayMissionCards() {
        const sidebar = document.getElementById("sec_sidebar");
    
        // Clear existing mission cards
        sidebar.innerHTML = '';
      
        // Shuffle the missionCards array
        const shuffledMissionCards = shuffleArray(missionCards);
      
        // Select the first four mission cards
        const randomMissionCards = shuffledMissionCards.slice(0, 4);
      
        // Define labels A, B, C, D (or more if you have more than four missions)
        const labels = ['A', 'B', 'C', 'D'];
      
        // Iterate over the selected random mission cards and display them with labels
        randomMissionCards.forEach((missionCard, index) => {
            const missionCardDiv = document.createElement("div");
            missionCardDiv.className = "mission-card";
      
            // Create a label element for the mission card
            const label = document.createElement("div");
            label.className = "mission-label";
            label.textContent = labels[index]; // Assign label text sequentially
            missionCardDiv.appendChild(label);
      
            // Create an image element for the mission card
            const img = document.createElement("img");
            img.src = `mission_${missionCard.name.toLowerCase().replace(/\s+/g, '_')}.png`;
            img.alt = missionCard.name;
            missionCardDiv.appendChild(img);
      
            // Highlight the mission card if it's part of the current season's missions
            if (missions[seasonNames[currentSeasonIndex]].includes(label.textContent)) {
                missionCardDiv.classList.add("highlighted");
            }
      
            // Add the mission card to the sidebar
            sidebar.appendChild(missionCardDiv);
            currentSeasonMissionMapping[labels[index]] = missionCard.name;
        });
    }
    

startButton.addEventListener("click", displayMissionCards);
function calculateFinalScore() {
    let totalScore = 0;
    const scoreResults = [];

    // Iterate through the selected mission cards and calculate points for each
    missionCards.forEach((missionCard, index) => {
        const points = missionCard.calculatePoints();
        totalScore += points;
        scoreResults.push({
            missionName: missionCard.name,
            points: points
        });
       
    });

    // Display the final score and mission-specific results
    console.log(`Total Score: ${totalScore}`);
    console.log("Mission Results:");
    scoreResults.forEach(result => {
        console.log(`${result.missionName}: ${result.points} points`);
    });
}

function calculateAndDisplayFinalScore() {
    let totalScore = 0;
    let missionResults = [];

    // Iterate through all the mission cards and calculate points for each
    missionCards.forEach(missionCard => {
        const points = missionCard.calculatePoints();
        totalScore += points;
        missionResults.push({
            missionName: missionCard.name,
            points: points
        });
    });

    // Display the total score and mission-specific results
    console.log(`Total Score: ${totalScore}`);
    console.log("Mission Results:");
    missionResults.forEach(result => {
        console.log(`${result.missionName}: ${result.points} points`);
    });

    // Update the UI with the final score
    const finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = `Total Score: ${totalScore}`;

    // Optionally, display mission-specific results in the UI
    const missionResultsElement = document.getElementById("mission-results");
    missionResultsElement.innerHTML = missionResults.map(result => `<li>${result.missionName}: ${result.points} points</li>`).join('');
}

function endGame() {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = "<p>Game over. 28 Total time units used.</p>";

    // Calculate and display the final score
    calculateAndDisplayFinalScore();
}


const elementContainer = document.getElementById("element-container");
let currentElementIndex = 0; // Keeps track of the currently displayed element

// Function to display the next puzzle element
function displayNextElement() {
    if (currentElementIndex < elements.length) {
        const nextElement = elements[currentElementIndex];
        currentlySelectedElement = elements[currentElementIndex];

        const elementDiv = createPuzzleElementDiv(nextElement);
        elementContainer.innerHTML = ""; // Clear the container
        elementContainer.appendChild(elementDiv);
        currentElementIndex++;
    } else {
        // All elements have been used
        elementContainer.innerHTML = "No more elements left.";

    }
}


// Function to create a puzzle element div
function createPuzzleElementDiv(element) {
    const elementDiv = document.createElement("div");
    elementDiv.className = "puzzle-element";
    elementDiv.dataset.type = element.type;
    elementDiv.dataset.time = element.time;
    elementDiv.innerHTML = `<b>Type:</b> ${element.type}<br><b>Time:</b> ${element.time}`;

    // Create an element grid to represent the shape
    const elementGrid = document.createElement("div");
    elementGrid.className = "element-grid";

    element.shape.forEach(row => {
        row.forEach(cell => {
            const cellDiv = document.createElement("div");
            cellDiv.className = "element-cell";
            if (cell === 1) {
                cellDiv.classList.add("filled");
                cellDiv.setAttribute("filled", "true");
                cellDiv.style.backgroundImage = `url('${getImageForType(element.type)}')`;
            }
            elementGrid.appendChild(cellDiv);
        });
    });

    elementDiv.appendChild(elementGrid);

    return elementDiv;
}

// Initialize the game
function initializeGame() {
    shuffleArray(elements);
    currentElementIndex = 0;
    displayNextElement();
    // Initialize other game components and event listeners here
}

startButton.addEventListener("click", initializeGame);


function updateUIForSeason() {
    // Get the elements from the DOM
    const currentSeasonElement = document.getElementById("current_season");
    const remainingTimeUnitsElement = document.getElementById("remaining_time_units");

    // Update the elements with the current season name and remaining time units
    currentSeasonElement.textContent = seasonNames[currentSeasonIndex];
    remainingTimeUnitsElement.textContent = remainingTimeUnitsSeason.toString();
}


