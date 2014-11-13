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
var samples = [{val:'A'},{val:'A'},{val:'B'},{val:'B'},{val:'C'},{val:'C'}];

coll.add(samples);
coll.models.forEach(function(model,loc) {
	model.set('loc',loc);
});




