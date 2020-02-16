var board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
]
var c=0
var q = 0
var gameloop, sound1, sound2, humansound, aisound, menu1, getBeat
var shows = []
var runs1 = []
var runs2 = []
var drops = []
var a = 0
var win = []
var dropTo = [5, 5, 5, 5, 5, 5, 5]
var canvas, container
var p1Turn = true
var gameOver = false
var winMessage = ''
var screen = 0
var depth = 5
var logo
var skillLevel = 'medium'
var skillLevels = {
  easy: 4,
  medium: 6,
  hard: 7
}
var l = 1
var levels = ['easy', 'medium', 'hard']
// var f
function preload() {
  f = loadFont('f.ttf')
  logo = loadImage('c4logo.gif')

  sound1 = loadSound('s1.wav')
  sound2 = loadSound('s2.wav')
  humansound = loadSound('humansound.wav')
  aisound = loadSound('aisound.wav')
  getBeat = loadSound('getBeat.wav')
  menu2 = loadSound('menu2.wav')
  gameloop = loadSound('gameloop.wav')
}


function setup() {
  container = document.getElementById('container')
  gameloop.loop()
  canvas = createCanvas(700, 600)
  container.appendChild(canvas.elt)
  ellipseMode(CORNER)
  textFont(f)



}

// function aiMove() {
//   var moves = []
//   for (var col = 0; col < 7; col++) {
//     if (dropTo[col] >= 0) {
//       moves.push(col)
//     }
//   }

//   console.log(moves)
//   return random(moves)
// }


// function mousePressed() {
//   if (gameOver == false) {
//     var col = floor(mouseX / 100)

//     var row = dropTo[col]
//     if (row >= 0) {
//       if (p1Turn == true) {
//         board[row][col] = 1
//         drawBoard()
//         dropTo[col]--
//         console.log(checkForWin())

//         p1Turn = !p1Turn
//       } else {
//         board[row][col] = 2
//         drawBoard()

//         dropTo[col]--
//         console.log(checkForWin())
//         p1Turn = !p1Turn
//       }
//     }
//   }
// }

function aiMove() {
  col = bestMove()
  var row = dropTo[col]
  shows.push(new Show(row, col))
  if (row < 0) return
  board[row][col] = 2
  aisound.play()
  dropTo[col]--
  drawBoard()
  if (checkForWin() != null) {

    for (let c2 of runs2) {
      board[c2.row][c2.col] = 3
    }
    gameOver = true
    getBeat.play()
    gameloop.stop()
    //sound2.stop()
  }
  p1Turn = !p1Turn
}


function keyPressed() {
  if (key == 'a' || key == 'A') {
    menu1.play()
  }
  if (key == 'b' || key == 'b') {
    menu2.play()
  }
  if (screen == 0) {
    if (key == 'p' || key == 'P') {
      p1Turn = !p1Turn
    }
    if (keyCode == 32) {
      screen = 1
      gameloop.play()
      menu2.stop()

      if (!p1Turn) setTimeout(function () { aiMove() }, 500);
    }
  }
  if (screen == 1 && gameOver) {
    if (key == 'r' || key == 'R') {
      gameOver = false
      getBeat.stop()
      menu2.loop()
      screen = 0
      dropTo = [5, 5, 5, 5, 5, 5, 5]
      board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
      ]
    }
  }
  if (keyCode == LEFT_ARROW) {
    if (l > 0) l--


  }
  if (keyCode == RIGHT_ARROW) {
    if (l < 2) l++

  }

  if (l == 0) depth = 2
  if (l == 1) depth = 5
  if (l == 2) depth = 7
  console.log(l, depth)
}
function mousePressed() {

  if (gameOver == false && screen == 1) {
    if (p1Turn) {
      var col = floor(mouseX / 100)
      var row = dropTo[col]
      if (row < 0) return
      //drops.push(new Drop(col))
      board[row][col] = 1
      console.log(drops)
      humansound.play()
      dropTo[col]--
      drawBoard()
      var result = checkForWin()

      if (result != null) {
        //console.log(323232322323)
        for (let c1 of runs1) {
          board[c1.row][c1.col] = 3
          //console.log('xxx')
        }
        gameloop.stop()
        gameOver = true

        //sound2.stop()
        return

      }

      p1Turn = !p1Turn
      setTimeout(function () { aiMove() }, 100);
    }
  }
}

// function mousePressed() {
//   var col = floor(mouseX / 100)
//   var row = floor(mouseY / 100)
//   board[row][col] = 2
//   if (checkForWin() != null) {

//     gameOver = true

//   }
// }


// var c = floor(mouseX / 100)
// var r = dropTo[c]
// fill(255, 0, 0, 113)
// if (p1Turn) ellipse(c * 100, r * 100, 100, 100)

function drawBoard() {

  // if (gameOver) {
  //   for (let c1 of runs1) {
  //     board[c1.row][c1.col] = 3
  //     console.log('xxx')
  //   }
  // }
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
      strokeWeight(5)
      stroke(0, 0, 255)
      !gameOver ? fill(255) : fill(255, 13)
      if (board[row][col] == 1) {
        !gameOver ? fill(255, 0, 0) : fill(255, 0, 0, 13)
      }
      if (board[row][col] == 2) {
        !gameOver ? fill(255, 255, 0) : fill(255, 255, 0, 13)
      }
      if (board[row][col] == 3) {

        if (winMessage == 'Human Wins') {
          fill(255, 0, 0)
        } else {
          fill(255, 255, 0)
        }
      }
      ellipse(col * 100, row * 100, 100, 100)
      c = lerp(c,floor(mouseX / 100)*100,0.01)
      console.log(c)
      var r = dropTo[floor(mouseX / 100)]
      noFill()
      stroke(0)
      if (p1Turn && !gameOver) ellipse(c , r * 100, 100, 100)
      textSize(40)
      strokeWeight(2)
      stroke(0)
      fill(130)
      strokeWeight(1)

      if (!p1Turn) text("THINKING", 140, 30)


    }
  }
}
function menu() {

  background(40, 107, 214)
  //textFont(f)
  if (p1Turn) {
    p = "HUMAN"
  } else {
    p = "AI"
  }
  imageMode(CENTER)
  var scale = map(sin(q), -1, 1, 0.95, 1.05)
  q = q + 0.1
  image(logo, width / 2, 75, logo.width * scale, logo.height * scale)
  textSize(50)
  strokeWeight(4)
  //stroke(2)
  fill(0, 153, 102)
  textAlign(CENTER, CENTER)
  text("PRESS SPACE TO START", width / 2, 180)
  textSize(40)
  text("START PLAYER is " + p, width / 2, 300)
  textSize(30)
  text("CHANGE WITH P", width / 2, 350)
  textSize(40)
  text("AI LEVEL is " + levels[l].toUpperCase(), width / 2, 420)
  textSize(30)
  text("CHANGE WITH L and R ARROWS", width / 2, 470)
  textSize(23)
  text("CLICK ON COLUMN TO DROP PIECE IN GAME MODE", width / 2, 230)
  noFill()
  stroke(0)
  strokeWeight(4)
  rect(0, 0, width, height)
}

function draw() {
  strokeWeight(3)
  stroke(0)
  rect(0, 0, width, height)
  if (screen == 0) {
    menu()
  }
  if (screen == 1) {
    for (var s of shows) {
      s.animate()
    }
    if (gameOver == true) {
      background(40, 107, 214, 33)

      drawBoard()

      textSize(55)
      strokeWeight(1)
      stroke(2)
      fill(0, 153, 102)
      textAlign(CENTER, CENTER)
      var tsize = map(sin(a), -1, 1, 90, 110)
      textSize(tsize)
      a += 0.1
      text(winMessage, width / 2, height / 2)
      textSize(50)
      text('PRESS R TO RESTART', width / 2, height / 3)

    } else {


      background(40, 107, 214)

      drawBoard()
      //text(p1Turn,400,100)
    }

    for (var s of shows) {
      s.animate()
    }
    for (var d of drops) {
      d.show()
      d.update()
    }
    strokeWeight(3)
    noFill()
    stroke(0)
    rect(0, 0, width, height)
  }


}

function checkForWin() {

  var p1number = 0
  var p2number = 0

  for (var row = 0; row < 6; row++) {
    p1number = 0
    p2number = 0
    runs1 = []
    runs2 = []
    for (var col = 0; col < 7; col++) {
      if (board[row][col] == 1) {
        p1number++
        runs1.push({ row, col })
      } else {
        p1number = 0
        runs1 = []
      }
      if (p1number == 4) {
        winMessage = 'Human Wins'
        console.log('p1horiz')
        return 'p1'
      }
      if (board[row][col] == 2) {
        p2number++
        runs2.push({ row, col })
      } else {
        p2number = 0
        runs2 = []
      }
      if (p2number == 4) {
        winMessage = 'AI wins'
        console.log('p2horiz')
        return 'p2'
      }
    }
  }


  p1number = 0
  p2number = 0
  for (var col = 0; col < 7; col++) {
    p1number = 0
    p2number = 0
    runs1 = []
    runs2 = []
    for (var row = 0; row < 6; row++) {
      if (board[row][col] == 1) {
        runs1.push({ row, col })
        p1number++
      } else {
        p1number = 0
        runs1 = []
      }
      if (p1number == 4) {
        winMessage = 'Human Wins'
        console.log('p1vert')
        return 'p1'
      }
      if (board[row][col] == 2) {
        runs2.push({ row, col })
        p2number++
      } else {
        p2number = 0
        runs2 = []
      }
      if (p2number == 4) {
        winMessage = 'AI wins'
        console.log('p2vert')
        return 'p2'
      }
    }
  }
  runs1 = []
  runs2 = []

  //p1 diags down/right
  p1number = 0
  p2number = 0
  for (var a = 0; a <= 3; a++) {
    if (board[a + 2][a] == 1) {
      p1number++
      let row = a + 2
      let col = a
      runs1.push({ row, col })
      if (p1number == 4) {
        //gameOver = true
        winMessage = 'Human Wins'
        console.log('d11')
        return 'p1'
      }
    } else {
      p1number = 0
      runs1 = []
    }
    if (board[a + 2][a] == 2) {
      p2number++
      let row = a + 2
      let col = a
      runs2.push({ row, col })
      if (p2number == 4) {
        //gameOver = true
        winMessage = 'AI wins'
        console.log('d12')
        return 'p2'
      }
    } else {
      p2number = 0
      runs2 = []
    }
  }
  runs1 = []
  runs2 = []

  p1number = 0
  p2number = 0
  for (var a = 0; a <= 4; a++) {
    if (board[a + 1][a] == 1) {
      p1number++
      let row = a + 1
      let col = a
      runs1.push({ row, col })
      if (p1number == 4) {
        //gameOver = true
        winMessage = 'Human Wins'
        console.log('d21')
        return 'p1'
      }
    } else {
      p1number = 0
      runs1 = []
    }
    if (board[a + 1][a] == 2) {
      p2number++
      let row = a + 1
      let col = a
      runs2.push({ row, col })
      if (p2number == 4) {
        //gameOver = true
        winMessage = 'AI wins'
        console.log('d22')
        return 'p2'
      }
    } else {
      p2number = 0
      runs2 = []
    }
  }
  runs1 = []
  runs2 = []

  p1number = 0
  p2number = 0
  for (var a = 0; a <= 5; a++) {
    if (board[a][a] == 1) {
      p1number++
      let row = a
      let col = a
      runs1.push({ row, col })
      if (p1number == 4) {
        //gameOver = true
        winMessage = 'Human Wins'
        console.log('d31')
        return 'p1'
      }
    } else {
      p1number = 0
      runs1 = []
    }

    if (board[a][a] == 2) {
      p2number++
      let row = a
      let col = a
      runs2.push({ row, col })
      if (p2number == 4) {
        //gameOver = true
        winMessage = 'AI wins'
        console.log('d32')
        return 'p2'
      }
    } else {
      p2number = 0
      runs2 = []
    }
  }
  runs1 = []
  runs2 = []
  p1number = 0
  p2number = 0
  for (var a = 0; a <= 5; a++) {
    if (board[a][a + 1] == 1) {
      p1number++
      let row = a
      let col = a + 1
      runs1.push({ row, col })
      if (p1number == 4) {
        //gameOver = true
        winMessage = 'Human Wins'
        console.log('d41')
        return 'p1'
      }
    } else {
      p1number = 0
      runs1 = []
    }
    if (board[a][a + 1] == 2) {
      p2number++
      let row = a
      let col = a + 1
      runs2.push({ row, col })
      if (p2number == 4) {
        //gameOver = true
        winMessage = 'AI wins'
        console.log('d42')
        return 'p2'
      }
    } else {
      p2number = 0
      runs2 = []
    }
  }
  runs1 = []
  runs2 = []

  p1number = 0
  p2number = 0
  for (var a = 0; a <= 4; a++) {
    if (board[a][a + 2] == 1) {
      p1number++
      let row = a
      let col = a + 2
      runs1.push({ row, col })
      if (p1number == 4) {
        // gameOver = true
        winMessage = 'Human Wins'
        console.log('d51')
        return 'p1'
      }
    } else {
      p1number = 0
      runs1 = []
    }

    if (board[a][a + 2] == 2) {
      p2number++
      let row = a
      let col = a + 2
      runs2.push({ row, col })
      if (p2number == 4) {
        //gameOver = true
        winMessage = 'AI wins'
        console.log('d52')
        return 'p2'
      }
    } else {
      p2number = 0
      runs2 = []
    }
  }

  runs1 = []
  runs2 = []

  p1number = 0
  p2number = 0
  for (var a = 0; a <= 3; a++) {
    if (board[a][a + 3] == 1) {
      p1number++
      let row = a
      let col = a + 3
      runs1.push({ row, col })
      if (p1number == 4) {
        //gameOver = true
        winMessage = 'AI wins'
        console.log('d61')
        return 'p1'

      }
    } else {
      p1number = 0
      runs1 = []
    }

    if (board[a][a + 3] == 2) {
      p2number++
      let row = a
      let col = a + 3
      runs2.push({ row, col })
      if (p2number == 4) {
        //gameOver = true
        winMessage = 'AI wins'
        console.log('d62')
        return 'p2'
      }
    } else {
      p2number = 0
      runs2 = []
    }
  }
  runs1 = []
  runs2 = []
  //p1 diags down/right
  //******************** */
  //1

  p1number = 0
  p2number = 0
  for (var a = 0; a <= 3; a++) {
    if (board[a][3 - a] == 1) {
      p1number++
      let row = a
      let col = 3 - a
      runs1.push({ row, col })
      if (p1number == 4) {
        // gameOver = true
        winMessage = 'Human Wins'
        console.log('X11')
        return 'p1'
      }
    } else {
      p1number = 0
      runs1 = []
    }
    if (board[a][3 - a] == 2) {
      p2number++
      let row = a
      let col = 3 - a
      runs2.push({ row, col })
      if (p2number == 4) {
        //gameOver = true
        winMessage = 'AI wins'
        console.log('X12')
        return 'p2'
      }
    } else {
      p2number = 0
      runs2 = []
    }
  }
  //2
  p1number = 0
  p2number = 0
  runs1 = []
  runs2 = []
  for (var a = 0; a <= 4; a++) {
    if (board[a][4 - a] == 1) {
      p1number++
      let row = a
      let col = 4 - a
      runs1.push({ row, col })
      if (p1number == 4) {
        // gameOver = true
        winMessage = 'Human Wins'
        console.log('X21')
        return 'p1'
      }
    } else {
      p1number = 0
      runs1 = []
    }
    if (board[a][4 - a] == 2) {
      p2number++
      let row = a
      let col = 4 - a
      runs2.push({ row, col })
      if (p2number == 4) {
        // gameOver = true
        winMessage = 'AI wins'
        console.log('X22')
        return 'p2'
      }
    } else {
      p2number = 0
      runs2 = []
    }
  }
  //3
  p1number = 0
  p2number = 0
  runs1 = []
  runs2 = []
  for (var a = 0; a <= 5; a++) {
    if (board[a][5 - a] == 1) {
      p1number++
      let row = a
      let col = 5 - a
      runs1.push({ row, col })
      if (p1number == 4) {
        //gameOver = true
        winMessage = 'Human Wins'
        console.log('X31')
        return 'p1'
      }
    } else {
      p1number = 0
      runs1 = []
    }
    if (board[a][5 - a] == 2) {
      p2number++
      let row = a
      let col = 5 - a
      runs2.push({ row, col })
      if (p2number == 4) {
        //gameOver = true
        winMessage = 'AI wins'
        console.log('X32')
        return 'p2'
      }
    } else {
      p2number = 0
      runs2 = []
    }
  }
  //4
  p1number = 0
  p2number = 0
  runs1 = []
  runs2 = []
  for (var a = 0; a <= 5; a++) {
    if (board[a][6 - a] == 1) {
      p1number++
      let row = a
      let col = 6 - a
      runs1.push({ row, col })
      if (p1number == 4) {
        // gameOver = true
        winMessage = 'Human Wins'
        console.log('X41')
        return 'p1'
      }
    } else {
      p1number = 0
      runs1 = []
    }
    if (board[a][6 - a] == 2) {
      p2number++
      let row = a
      let col = 6 - a
      runs2.push({ row, col })
      if (p2number == 4) {
        //gameOver = true
        winMessage = 'AI wins'
        console.log('X42')
        return 'p2'
      }
    } else {
      p2number = 0
      runs2 = []
    }
  }
  //5
  p1number = 0
  p2number = 0
  runs1 = []
  runs2 = []
  for (var a = 1; a <= 5; a++) {
    if (board[a][7 - a] == 1) {
      p1number++
      let row = a
      let col = 7 - a
      runs1.push({ row, col })
      if (p1number == 4) {
        //gameOver = true
        winMessage = 'Human Wins'
        console.log('X51')
        return 'p1'
      }
    } else {
      p1number = 0
      runs1 = []
    }
    if (board[a][7 - a] == 2) {
      p2number++
      let row = a
      let col = 7 - a
      runs2.push({ row, col })
      if (p2number == 4) {
        //gameOver = true
        winMessage = 'AI wins'
        console.log('X52')
        return 'p2'
      }
    } else {
      p2number = 0
      runs2 = []
    }
  }
  //6
  p1number = 0
  p2number = 0
  runs1 = []
  runs2 = []
  for (var a = 2; a <= 5; a++) {
    if (board[a][8 - a] == 1) {
      p1number++
      let row = a
      let col = 8 - a
      runs1.push({ row, col })
      if (p1number == 4) {
        //gameOver = true
        winMessage = 'Human Wins'
        console.log('X61')
        return 'p1'
      }
    } else {
      p1number = 0
      runs1 = []
    }
    if (board[a][8 - a] == 2) {
      p2number++
      let row = a
      let col = 8 - a
      runs2.push({ row, col })
      if (p2number == 4) {
        //gameOver = true
        winMessage = 'AI wins'
        console.log('X62')
        return 'p2'
      }
    } else {
      p2number = 0
      runs2 = []
    }
  }
  if (dropTo[0] == -1 && dropTo[1] == -1 && dropTo[2] == -1 && dropTo[3] == -1 && dropTo[4] == -1 && dropTo[5] == -1 && dropTo[6] == -1) {
    winMessage = "DRAW"
    return 'tie'
  }
  //console.log(dropTo)
  return null
}

