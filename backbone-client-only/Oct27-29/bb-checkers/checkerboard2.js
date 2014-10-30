var SquareView = Backbone.View.extend({
	tagName: 'td',
	initialize: function(opts) {
		this.$el.appendTo(opts.$row);
	},
	render: function() {
	}

});

function makeBoard() {
	var $tab,$row,$cell;
	$tab = $('<table>')
				.attr('id','checkerboard')
				.appendTo('body');

	for (var i=0; i<8; i++) {
		$row = $('<tr>').appendTo($tab);
		$row.squares = [];
		for (var j=0; j<8; j++) {
			var opts = {
				//className: ((i%2==j%2)?'odd':'even'),
				$row: $row
			}
			$row.squares.push(new SquareView(opts));
	  	}
	}
}

$(makeBoard);
