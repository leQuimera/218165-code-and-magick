'use strict';

var botomY = 250;
var cloudTopX = 100;
var cloudTopY = 10;
var cloudHeght = 270;
var cloudWidth = 420;
var colorBase = '#fff';
var colorShadow = 'rgba(0, 0, 0, 0.7)';

// Прорисовка облака (координаты облака, цвет облака)
var drawBox = function (ctx, cloudX, cloudY, cloudColor) {
  ctx.fillStyle = cloudColor;
  ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeght);
};

// Поиск максимального значения в массиве (массив)
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

// Построение гистограммы (канвас, имена игроков, результаты)
var renderHisto = function (ctx, names, times) {
  var max = getMaxOfArray(times);
  var histogramHeight = 150;
  var step = histogramHeight / max;
  max = (max / 1000).toFixed(2);

  for (var i = 0; i < names.length; i++) {
    var positionY = botomY - times[i] * step;
    var positionHeight = botomY - positionY;
    var histColor = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(11, 18, 110, ' + Math.random() + ')';
    var positionX = 140 + 90 * i;
    ctx.fillStyle = histColor;
    ctx.fillRect(positionX, positionY, 40, positionHeight);
    ctx.strokeText(names[i], positionX, cloudHeght);
  }
};

// Вывод игровой статистики (канвас, имена игроков, результаты)
window.renderStatistics = function (ctx, names, times) {
  drawBox(ctx, 110, 20, colorShadow);
  drawBox(ctx, cloudTopX, cloudTopY, colorBase);
  ctx.font = '16px PT Mono';
  ctx.strokeText('Ура, вы победили!', 140, 40);
  ctx.strokeText('Список результатов:', 140, 60);
  renderHisto(ctx, names, times);
};

