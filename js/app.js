// app.js: our main javascript file for this app
"use strict";

var tiles = [];
for (var i = 1; i <= 32; i++) {
	tiles.push({
		tileNum: i,
		src: 'img/tile' + i + '.jpg',
		flipped: false,
		matched: false
	});
}

console.log(tiles);

// when document is ready
$(document).ready(function() {
	// catch click even of start game button
	$('#start-game').click(function() {
		console.log('start game button clicked');
		tiles = _.shuffle(tiles);
		var selectedTiles = tiles.slice(0, 8);
		var tilePairs = [];
		_.forEach(selectedTiles, function(tile) {
			tilePairs.push(tile);
			tilePairs.push(_.clone(tile));
		});
		tilePairs = _.shuffle(tilePairs);
		console.log(tilePairs);

		var gameBoard = $('#game-board');
		var row  = $(document.createElement('div'));
		var img;
		_.forEach(tilePairs, function(tile, elemIndex) {
			if (elemIndex > 0 && 0 == elemIndex % 4) {
				gameBoard.append(row);
				row = $(document.createElement('div'));
			}
			img = $(document.createElement('img'));
			img.attr({
				src: 'img/tile-back.png',
				alt: 'tile ' + tile.tileNum
			});

			img.data('tile', tile);

			row.append(img);

		});
		gameBoard.append(row);

		//setting time
		// gets starting milliseconds
		var startTime = Date.now();
		window.setInterval(function () {
			var elapsedSeconds = (Date.now() - startTime) / 1000; 
			elapsedSeconds = Math.floor(elapsedSeconds);
			if (elapsedSeconds == 1) {
				$('#elapsed-seconds').text(elapsedSeconds + ' second');
			} else {
				$('#elapsed-seconds').text(elapsedSeconds + ' seconds');
			}
		}, 1000);

		$('#game-board img').click(function() {
			//console.log(this.alt);
			var clickedImg = $(this);
			var tile = clickedImg.data('tile');
			console.log(tile);
			flipTile(tile, clickedImg);
		});

	}); //start game button click

}); //document ready function

function flipTile(tile, img) {
	img.fadeOut(100, function() {
		if (tile.flipped) {
		img.attr('src', 'img/tile-back.png');
		} else {
		img.attr('src', tile.src);
		}
		tile.flipped = !tile.flipped;
		img.fadeIn(100);
	});

}