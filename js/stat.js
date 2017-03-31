'use strict';

var drawBox = function (ctx, cloudX, cloudY, cloudColor) {
  ctx.fillStyle = cloudColor;
  ctx.fillRect(cloudX, cloudY, 420, 270);
};

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

var renderHisto = function (ctx, names, times) {
  var max = getMaxOfArray(times);
  var histogramHeight = 150;
  var step = histogramHeight / max;
  max = (max / 1000).toFixed(2);

  for (var i = 0; i < names.length; i++) {
    var countY = 250 - times[i] * step;
    var contHeight = 250 - countY;
    var histColor = (names[i] == 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(11, 18, 110, ' + Math.random() + ')';
    var countX = 140 + 90 * i;
    ctx.fillStyle = histColor;
    ctx.fillRect(countX, countY, 40, contHeight);
    ctx.strokeText(names[i], countX, 270);
  }
};

window.renderStatistics = function (ctx, names, times) {
  drawBox(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  drawBox(ctx, 100, 10, '#fff');
  ctx.font = '16px PT Mono';
  ctx.strokeText('Ура, вы победили!', 140, 40);
  ctx.strokeText('Список результатов:', 140, 60);
  renderHisto(ctx, names, times);
};

