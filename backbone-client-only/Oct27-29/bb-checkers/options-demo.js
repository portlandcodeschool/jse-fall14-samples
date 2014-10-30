var MyView = Backbone.View.extend({
    props: function() {
        return Object.keys(this).join(' ');
    }
});

// Subclasses (inherit props):
var MyView2 = MyView.extend({
    initialize: function(opts) {
        // grab particular options
        if (opts)
            this.special = opts.special;
    },
});

var MyView3 = MyView.extend({
    initialize: function(opts) {
        // grab all options
        _.extend(this,opts); //means merge, not subclass
    },
});


var MyView4 = MyView.extend({
    initialize: function(opts,more) {
        // grab all options
        //_.extend(this,opts); //means merge, not subclass
        _.extend(this,more);
    },
});

var opts = {a:'a',b:'b',id:'id',model:'mod',special:'yay'};

var view0 = new MyView();
var view1 = new MyView(opts);
var view2 = new MyView2(opts);
var view3 = new MyView3(opts);
var view4 = new MyView4(null,opts);

view0.props();
view1.props();
view2.props();
view3.props();
