// backbone-collection demo

var CardModel = Backbone.Model.extend({
	defaults:{
		status:'facedown'
	}
});

var CardColl = Backbone.Collection.extend({
	url: '/api',
	model:  CardModel,
});

var coll = new CardColl();
var values = ['A','a','B','b','C','c'];


/// Use values to populate collection:
var samples = values.map(function(val,loc) {
	return {val:val,loc:loc};  // turn into numbered objects
})
coll.add(samples);

coll.save = function() {
	console.log("saving...");
	coll.models.forEach(function(model) {
		model.save();
	});
}

// Auto-load collection...

//Wrong way:
/*
coll.fetch();
if (coll.length != samples.length) { //<-- fetch isn't done yet!
	coll.reset(samples)
}
*/

//Right way:
function populate() {
	if (coll.length != samples.length) {
		console.log("Repopulating...");
		coll.reset(samples);
		coll.save();
	} else {
		console.log("Collection loaded");
	}
}
coll.load = function () {
	coll.fetch({success:populate});
}

// Updating...
coll.reshuffle = function() {
	coll.reset(_.shuffle(coll.models));
	coll.models.forEach(function(model,loc) {
		model.save({loc:loc}); // <--automatically calls model.set
	});
}

// Monitor changes to loc attribute...
// ( With gratuitous template practice!)
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

var reportTemplate = _.template("Card {{val}} (id {{id}}) moved from position {{old}} to {{loc}}");

coll.on('change:loc', function(model,value,opts) {
	// assemble template values:
	var vals = _.extend(model.attributes,
						{old:model.previous('loc')});
	console.log(reportTemplate(vals));
	// Ye olde way:
	//console.log("Card "+model.get('val')+" (id "+model.get('id')+") moved from position "+model.previous('loc')+" to "+value);
});
