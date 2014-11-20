var foursquare = foursquareSalt; //in config.js

var url = 'https://api.foursquare.com/v2/venues/explore';

var data = {
	client_id: 'ZIKHKOZSUEUIUCQQYC3ZSJO0PTE54QCSVHL41UXFPIBZ'+foursquare.clientID,
	client_secret: 'H5115WSI5RHX05CAVFE0LTJJ4YR02KT1XTKOUJP2BPVI'+foursquare.clientSecret,
	v: '20140612',//api version
	near: "Portland, OR",
	section: 'food',
	limit:10,
	venuePhotos: 1,
	format:'json'
};

function go() {
	$.ajax(url, { data: data, dataType: 'jsonp' })
      .then(function(data, status, xhr) {
        displayVenues(data, status, xhr);
      });
}

function displayItem(item) {
	var venue = item.venue;
	console.log(venue.name);
	console.log("\t"+venue.categories[0].shortName);
	console.log("\t"+venue.url);
	var image = venue.photos.groups[0].items[0];
	console.log("\t"+image.prefix+'width400'+image.suffix);
}

function displayVenues(data,status,xhr) {
	console.log(data);
	console.log(status);
	console.log(xhr);
	data.response.groups[0].items.forEach(displayItem);
}


