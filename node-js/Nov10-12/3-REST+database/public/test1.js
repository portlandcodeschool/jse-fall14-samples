var test = {
	load: function() {
		$.get("/api","Request");
		// CURL equvalent:
		// curl -X GET -d "Request" localhost:1337/api
	},
	save: function() {
		$.post("/api","Data");
		// CURL equivalent:
		// curl -X POST -d "Data" localhost:1337/api
	}
}