

function bestMove() {
  // AI to make its turn
  var order = [3, 2, 4, 1, 5, 0, 6]
  var move
  var bestScore = -Infinity;
  for (var c of order) {

    if (dropTo[c] >= 0) {
      board[dropTo[c]][c] = 2
      dropTo[c]--
      var score = minimax(depth, -Infinity, Infinity, false);
      dropTo[c]++
      board[dropTo[c]][c] = 0

      if (score > bestScore) {
        bestScore = score
        move = c
      }
    }
  }
  //p1turn = !p1turn
  return move
}

var scores = {
  p2: 10,
  p1: -10,
  tie: 0
};

function minimax(depth, a, b, isMaximizing) {
  var order =  [3, 2, 4, 1, 5, 0, 6]
  var result = checkForWin();
  if (result !== null) {
    return scores[result];
  }
  if (depth == 0) return null

  if (isMaximizing) {
    var bestScore = -Infinity;
    for (var c of order) {
      if (dropTo[c] >= 0) {
        board[dropTo[c]][c] = 2
        dropTo[c]--
        var score = minimax(depth - 1, a, b, false);
        dropTo[c]++
        board[dropTo[c]][c] = 0

        bestScore = max(score, bestScore)
        a = max(a, score)
        if (b <= a) break
      }
    }
    return bestScore
  } else {
    var bestScore = Infinity;
    for (var c of order) {
      if (dropTo[c] >= 0) {
        board[dropTo[c]][c] = 1
        dropTo[c]--
        var score = minimax(depth - 1, a, b, true);
        dropTo[c]++
        board[dropTo[c]][c] = 0
        bestScore = min(score, bestScore)
        b = min(b, score)
        if (b <= a) break
      }
    }
    return bestScore
  }
}
