// backbone-collection demo

var TestModel = Backbone.Model.extend({});

var TestColl = Backbone.Collection.extend({
	url: '/api',
	model:  TestModel,
})

var coll = new TestColl();

coll.show = function() {
	return coll.pluck('value');
}

coll.doAdd = function() {
	for (var i=0; i<4; ++i) {
		coll.add({value:i});// No requests to server
	}
	return coll.show();
};

coll.doCreate = function() {
	for (var i=0; i<4; ++i) {
		coll.create({value:i});// Sends POST to server
	}
	return coll.show();
};

coll.doFetch = function() {
	coll.fetchResponse = coll.fetch({ // returns res, a jqXHR promise (http://api.jquery.com/jQuery.ajax/#jqXHR)
		success: function w00t(coll,res,opts){
			console.log('Final response: ');
			console.log(res);
			console.log(opts);
		},
		error: function pwned(coll,res,opts) {
			console.log('Error!');
			console.log(res);
			console.log(opts);
		}
	});
	console.log('Early response: '+coll.fetchResponse.responseText);
}
