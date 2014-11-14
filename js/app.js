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



// when document is ready
$(document).ready(function() {
	// catch click event of start game button
	var timer;
	$('#start-game').click(function() {
		window.clearInterval(timer);
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
		gameBoard.empty();
		var row  = $(document.createElement('div'));
		var img;
		_.forEach(tilePairs, function(tile, elemIndex) {
			if (elemIndex > 0 && 0 == elemIndex % 4) {
				gameBoard.append(row);
				row = $(document.createElement('div'));
			}
			tile.flipped = false;
			img = $(document.createElement('img'));
			img.attr({
				src: 'img/tile-back.png',
				alt: 'tile ' + tile.tileNum
			});
			img.data('tile', tile);
			row.append(img);
		});
		gameBoard.append(row);
		$('#game-board img').addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			      $(this).removeClass();

		});;
		// setting time
		// gets starting milliseconds
		var startTime = Date.now();
		timer = window.setInterval(function () {
			var elapsedSeconds = (Date.now() - startTime) / 1000; 
			elapsedSeconds = Math.floor(elapsedSeconds);
	
			if (elapsedSeconds == 1) {
				$('#elapsed-seconds').text(elapsedSeconds + ' second');


			} else {
				$('#elapsed-seconds').addClass('flipOutX animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			      $(this).removeClass();
			      $('#elapsed-seconds').text(elapsedSeconds + ' seconds')
			    });;
			}

		}, 1000);

		//stat tracking
		var matches = 0;
		$('#matches').text(matches);
		var remaining = 8;
		$('#remaining').text(remaining);
		var missed = 0;
		$('#missed').text(missed);
		var click = 0;

		var clickedImage1;
		var clickedImage1Tile;
		var isDone = true;

			$('#game-board img').click(function () {
				//console.log(this.alt);
				console.log(isDone);
				console.log(click);
				var clickedImg = $(this);
				var tile = clickedImg.data('tile');
				if (tile.matched || !isDone || tile.flipped) {
					console.log('cant click');
					return;
				}

				if (click == 0) {
					console.log('first img click');
					clickedImage1 = clickedImg;
					clickedImage1Tile = tile;
					click++;
					flipTile(tile, clickedImg);
				}

				if (click == 2) {
					isDone = false;
					console.log(isDone);
					console.log('click set to 2');
					var clickedImage2 = clickedImg;
					click = 0;
					flipTile(tile, clickedImg);
					if (clickedImage1Tile.tileNum == tile.tileNum) {
						clickedImage1Tile.matched == true;
						clickedImg.matched == true;
						clickedImage1.addClass('matched');
						clickedImg.addClass('matched');
						console.log(clickedImage1);
						matches++;
						$('#matches').text(matches);
						remaining--;
						$('#remaining').text(remaining);

						// executes if user wins
						if (matches == 8) {
							stopTimer(timer);
							$('#winScreenModal').modal('show');
							$('#congrats').addClass('zoomIn animated');
						}

					} else {
						missed++;
						$('#missed').text(missed);
						setTimeout(function() {
							flipTile(clickedImage1.data('tile'), clickedImage1);
							flipTile(tile, clickedImg);
						}, 700);
					}
					click == 0;
					console.log('click set to 0');
					setTimeout(function() {
						isDone = true;
					}, 700);
					return;
					
				}
				click++;

			}); //click image
	}); //start game button click

}); //document ready function
function stopTimer(timer) {
	window.clearInterval(timer);
}

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

function winScreen() {
	$('.overlay').show();
}

