function ScoreAdder() {
}

function add(score1, score2) {
  return score1 + score2;
}

ScoreAdder.prototype.updateAll = function(game) {
  this.updateScores(game);
  this.updateSpares(game);
  this.updateStrikes(game);
}

ScoreAdder.prototype.updateScores = function(game) {
  var frame = '';
  for (frame in game) {
    if (frame.substring(0, 5) === 'frame') {
      this[frame] = game[frame].reduce(add, 0);
    }
  }
}

ScoreAdder.prototype.updateSpares = function(game) {
  var frame = '',
      frameNumber = 0,
      nextFrame = '';
  for (frame in game) {
    frameNumber = parseInt(frame.slice(-1), 6);
    if (this[frame] === 10 && frameNumber < Object.keys(this).length) {
      nextFrame = game['frame' + (frameNumber + 1)];
      this[frame] += nextFrame[0];
    }
  }
}

ScoreAdder.prototype.updateStrikes = function(game) {
  var frame = '',
      frameNumber = 0,
      frameScores = [];
  for (frame in game) {
    frameNumber = parseInt(frame.slice(-1), 6);
    frameScores = game[frame]
    if (frameScores[0] === 10 && frameNumber < Object.keys(this).length) {
      this.workoutStrike(game, frameNumber)
    }
  }
}

ScoreAdder.prototype.workoutStrike = function(game, frameNumber) {
  var frameScores = [];
  if (game['frame' + (frameNumber + 1)].length === 1) {
    frameScores = game['frame' + (frameNumber + 2)];
    this['frame' + frameNumber] += frameScores[0];
  }else{
    frameScores = game['frame' + (frameNumber + 1)];
    this['frame' + frameNumber] += frameScores[1];
  }
}
