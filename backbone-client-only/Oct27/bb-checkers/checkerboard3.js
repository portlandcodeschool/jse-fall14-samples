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

var board = null;
function makeBoard() {
	board = new BoardView();
}

$(makeBoard);
