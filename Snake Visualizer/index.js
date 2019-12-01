var cnv;
var w, h;

var grid = [];
var gridWidth = 10;
var gridHeight = 10;
var gridSize = 48;

function setup() {
   w = window.innerWidth;
   h = window.innerHeight;
   cnv = createCanvas(w, h);
   cnv.position(0, 0);
   setupCoolors();
   background(coolors.richblack);
   fill(coolors.richblack);
   stroke(coolors.spacecadet);
   strokeWeight(1);
   setupGrid();
   drawGrid();
   var startState = {
      'gameState': 1,
      'justAteFood': false,
      'turn': 0,
      'head': [2, 5],
      'direction': 0,
      'body': [
         [2, 5],
         [2, 6],
         [2, 7]
      ],
      'food': [5, 4]
   }
   var inps = [1, 0, 0, -1, -1, 0, 0, 0, 0, -1, -1, 0, 0, 0, 1, 0, -1, 0, 1, 0, -1, -1, 1, -1, -1, 0, 0, 0, 0, 1, 0, -1, 0, 1, 1, 0, 0, 1, 0, -1, 0, 1, 0, -1, 0, 1, -1, -1, 0, 0, 0, 0, 0, -1, 0, 1, 0, -1, -1, 0, 0, 0, 0, 0, -1, 0, 1, -1, -1, 0, -1, 0, 1, -1, 0, -1, -1, 1, -1, 1, -1, -1, 1, -1, 0, 0, 0, 0, 0, -1, -1, 0, 0, 1, 0, -1, 1, 0, 0, 0, -1, 0, 1, -1, -1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, -1, -1, 0, 0, 0, -1, -1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, 0, 1, 0, -1, 0, 1, 1, 0, -1, 0, 1, -1, -1, 0, -1, 0, 1, 1, -1, -1, 0, 0, 0, -1, 1, -1, -1, 1, -1, -1, 0, 1, 1, 0, -1, 1, -1, -1, 1, -1, 0, 0, 0, -1, -1, 0, 0, 1, 1, 0, -1, 1, -1, -1, 1, -1, 0, 0, -1, 0, 1, 0, -1, -1, 0, 1, 0, -1, 0, 0, 0, -1, 0, 1, -1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, -1, 1];
   var foods = [
      [5, 4],
      [0, 4],
      [7, 9],
      [1, 4],
      [8, 9],
      [6, 1],
      [8, 8],
      [9, 8],
      [5, 6],
      [9, 1],
      [6, 5],
      [1, 7],
      [5, 8],
      [8, 9],
      [0, 7],
      [5, 5],
      [1, 4],
      [7, 2],
      [4, 6],
      [1, 8],
      [5, 4],
      [6, 8],
      [0, 7],
      [8, 2],
      [4, 7]
   ];
   visualizeStates(startState, inps, foods, 75);

}

function makeArray(w, h, val) {
   var arr = [];
   for (let i = 0; i < h; i++) {
      arr[i] = [];
      for (let j = 0; j < w; j++) {
         arr[i][j] = val;
      }
   }
   return arr;
}

function setupGrid() {
   grid = makeArray(gridWidth, gridHeight, 0);
}

function drawGrid() {
   for (var i = 0; i < gridWidth; ++i) {
      for (var j = 0; j < gridHeight; ++j) {
         var p = coors2Pix(i, j);
         strokeWeight(1);
         fill(coolors.richblack);
         rect(p.x, p.y, gridSize, gridSize);
         // strokeWeight(0);
         if (grid[i][j] == 1) { //head
            fill(coolors.spirodisco);
         } else if (grid[i][j] == 2) { //body
            fill(coolors.bleu);
         } else if (grid[i][j] == 3) { //food
            fill(coolors.infrared);
         }
         rect(p.x, p.y, gridSize, gridSize);
      }
   }
}

function coors2Pix(i, j) {
   return {
      x: (w / 2) - (gridWidth / 2 - i) * gridSize,
      y: (h / 2) - (gridHeight / 2 - j) * gridSize
   };
}

function pix2Coors(x, y) {
   var i = Math.round(player.x - ((w / 2) - mouseX) / gridSize);
   var j = Math.round(player.y - ((h / 2) - mouseY) / gridSize);
   if (i >= 0 && j >= 0 && i < gridWidth && j < gridHeight) {
      return {
         i,
         j
      };
   } else {
      return false;
   }
}

function getRandomRange(min, max) {
   return Math.random() * (max - min) + min;
}

function step(state, inp) {
   state["turn"] += 1;
   state["direction"] = (state["direction"] + inp + 4) % 4;
   var newHeadX = 0;
   var newHeadY = 0;
   if (state["direction"] == 0) {
      newHeadY = -1;
   } else if (state["direction"] == 1) {
      newHeadX = 1;
   } else if (state["direction"] == 2) {
      newHeadY = 1;
   } else if (state["direction"] == 3) {
      newHeadX = -1;
   }
   newHeadX += state["head"][0];
   newHeadY += state["head"][1];
   state["head"] = [newHeadX, newHeadY];
   state["body"].splice(0, 0, state["head"]);
   if (state["head"][0] == state["food"][0] && state["head"][1] == state["food"][1]) {
      state["justAteFood"] = true;
      if (state["body"].length == gridSize * gridSize) {
         state["gameState"] = 0;
      }
   } else {
      state["justAteFood"] = false;
      bodyLen = state["body"].length;
      state["body"].splice(bodyLen - 1, 1);
   }
   var hx = state["head"][0];
   var hy = state["head"][1];
   if (hx < 0 || hx >= gridSize || hy < 0 || hy >= gridSize) {
      console.log("head out of bounds");
      state["gameState"] = 0;
   } else {
      for (var i = 1; i < state["body"].length; i++) {
         if (state["body"][i][0] == hx && state["body"][i][1] == hy) {
            state["gameState"] = 0
         }
      }
   }
   return state
}

function clearGrid() {
   for (var i = 0; i < gridWidth; i++) {
      for (var j = 0; j < gridHeight; j++) {
         grid[i][j] = 0;
      }
   }
}

function visualizeState(state) {
   clearGrid();
   grid[state["head"][0]][state["head"][1]] = 1;
   for (var i = 1; i < state["body"].length; i++) {
      grid[state["body"][i][0]][state["body"][i][1]] = 2;
   }
   grid[state["food"][0]][state["food"][1]] = 3;
}

async function visualizeStates(state, inps, foods, speed) {
   var cf = 1;
   var si = state;
   for (var i = 0; i < inps.length; i++) {
      si = step(si, inps[i]);
      if (si["gameState"] == 0) {
         return;
      } else {
         if (si["justAteFood"]) {
            si["food"] = [foods[cf][0], foods[cf][1]];
            cf += 1;
         }
         visualizeState(si);
         clear();
         background(coolors.richblack);
         drawGrid();
         await sleep(speed);
      }
   }
}

function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}
