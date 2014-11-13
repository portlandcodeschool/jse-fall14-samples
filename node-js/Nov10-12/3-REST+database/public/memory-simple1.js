// backbone-collection demo

var CardModel = Backbone.Model.extend({
	defaults:{
		status:'facedown'
	}
});

var CardColl = Backbone.Collection.extend({
	url: '/api',
	model:  CardModel
});

var coll = new CardColl();
var values = ['A','a','B','b','C','c'];


/// Use values to populate collection:
var samples = values.map(function(val,loc) {
	return {val:val,loc:loc};  // turn into numbered objects
})
coll.add(samples);

coll.save = function() {
	coll.models.forEach(function(model) {
		model.save();
	});
}

// Or save immediately:
/*
values.forEach(function(val,loc) {
	coll.create({val:val,loc:loc});
});
*/
