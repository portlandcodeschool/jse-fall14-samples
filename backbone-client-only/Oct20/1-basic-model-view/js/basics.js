
// Make a new subclass of Backbone.View:
var MyViewCtor = Backbone.View.extend({
	protoProp: "I'm a view prototype",

	// this identifies my DOM element:
	el: '#my-elem',

	// For all instances of this view class,
	// the string "#my-elem" is replaced by corresponding DOM element:
	// this.el --> DOM element where id = 'my-elem';
	// this.$el --> jQuery wrapper around this.el

	// Method to draw me:
	render: function () {
		// render using own properties
    	$(this.el).html(this.protoProp);
    	// Could also say:
    	//this.$el.html(this.protoProp);
  	}
});

// When ready:
var myview;
$(function () {
  myview = new MyViewCtor();
  myview.render();
});

// Compare these:
// MyViewCtor.prototype.el
// myview.el
// myview.$el
