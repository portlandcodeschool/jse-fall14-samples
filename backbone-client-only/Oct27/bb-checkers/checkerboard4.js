// --- Models ---
var Checkers = (function() {

	var Checker = Backbone.Model.extend({
		defaults: {isKing: false}
	});

	var redStart = [1,3,5,7,8,10,12,14];
	var blackStart=[49,51,53,55,56,58,60,62];

	function makeChecker(where,color) {
		return {
			sq: where,
			color: color
		};
	}

	var Checkers = Backbone.Collection.extend({
		model:Checker,
		initialize: function() {
			this.add(redStart.map(function(where){return makeChecker(where,'red')}));
			this.add(blackStart.map(function(where){return makeChecker(where,'black')}));
		}
	});

	return Checkers;
})(); //end IIFE

// --- Views ---
var SquareView = Backbone.View.extend({
	tagName: 'td',
	initialize: function(opts) {
		this.$el.appendTo(opts.$row);
	},
	render: function() {
	}
});


var BoardView = Backbone.View.extend({
	id:'checkerboard',
	tagName: 'table',
	initialize: function() {
		this.squares = [];//subviews
		for (var i=0; i<8; ++i) {
			var $row = $('<tr>').appendTo(this.$el);
			for (var j=0; j<8; ++j) {
				var opts = {
					className: ((i%2==j%2)?'odd':'even'),
					$row: $row
				}
				this.squares.push(new SquareView(opts));
			}
		}
		this.$el.appendTo('body');
	},
	render: function() {
	}
});

var board = null, game=null;
function makeBoard() {
	board = new BoardView();
	game = new Checkers();
}

$(makeBoard);
