// Demo for updating a partially-saved backbone collection

var TestModel = Backbone.Model.extend({
	defaults: {
		count:0
	}
});

var TestColl = Backbone.Collection.extend({
	url: '/api',
	model:  TestModel,
	display: function() { //custom method
		console.log("Keys:  "+this.pluck('key'));
		console.log("Counts:"+this.pluck('count'));
	}
})

var coll = new TestColl();
// fill coll with 10 models with unique keys
for (var key = 0; key<10; ++key) {
	coll.add({key:key});  // adds models to collection, but doesn't save
}
coll.display();

//console.log("Keys:"+coll.pluck('key'));
//console.log("Counts:"+coll.pluck('count')); // all counts start at 0




function findModel(key) {
	var models = coll.where({key:key});
	if (models.length > 1) throw "found multiple models";
	if (models.length == 0) throw "found no models";
	return models[0];
}

function incrementCount(key) {
	var model = findModel(key);
	model.set("count",model.get("count")+1);
	model.save(); //send POST to server, updates db
}

function refreshModel(attrObj) {
	console.log(attrObj);
	var model= findModel(attrObj.key);
	model.set("count",attrObj.count);
}

function refreshCollection() {
	var keyStr = coll.pluck('key').join(',');
	// Make a GET request listing all keys of collection (in URL query)
	// Can simulate in terminal: curl localhost:1337/api?keys=1,2,3
	$.get("/api","keys="+keyStr, function(dataStr) {
		// dataStr is JSON array describing models currently in database
		var arr = JSON.parse(dataStr);
		arr.forEach(refreshModel);
		coll.display();
	});
}

// usage:
//refreshCollection();  // updates count of any models saved to db
//incrementCount(3);
//incrementCount(7);
//incrementCount(3);
// etc...
