// Make a new subclass (Todo) of Backbone.Model:
var MyModelCtor = Backbone.Model.extend({
	protoProp: "I'm a model prototype"
});

// Make a model (one instance of class Todo):
var model1 = new MyModelCtor({
	personalAttr: "Here's my attribute",
	personalAttr2:"Here's another"
});

console.log(model1);
console.log(model1.attributes);
console.log(model1.get('personalAttr'));

var MyViewCtor = Backbone.View.extend({
	protoProp: "I'm a view prototype",
	el: '#my-app',
	render: function () {
		// refer to model attributes
    	$(this.el).html(model1.get('personalAttr'));
  	}
});

// When ready:
var myview;
$(function () {
  myview = new MyViewCtor();
  myview.render();
});
