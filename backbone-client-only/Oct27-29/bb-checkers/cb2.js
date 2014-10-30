var SquareView = Backbone.View.extend({
 //el:'td',
 tagName:'td',
 initialize: function(opts) {
 	this.$el.appendTo(opts.tr);
 },
 render: function() {
 	//...
 }
});

var BoardView = Backbone.View.extend({
	//tagName: 'table',
	el:$('#checkerboard'),
	//id: 'checkerboard',
	initialize: function() {
		this.squares = [];
		// make my kids
		for (var i=0; i<8; i++) {
			var $row = $('<tr>').appendTo(this.$el);
			for (var j=0; j<8; j++) {
				var opts = {
					tr: $row,
					className:(i%2==j%2)?'odd':'even'
				}
				this.squares.push(new SquareView(opts));
	  	}
	  }
		//this.$el.appendTo('body');// make me
	}
})


var board;
function makeBoard() {
	board = new BoardView();	
}

$(makeBoard);
