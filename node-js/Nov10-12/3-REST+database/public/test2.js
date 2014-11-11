var test = {
	url: "/api",
	acceptResponse: function(data,status,jqXHR) {
			console.log(data);
			console.log(status);
			console.log(jqXHR);
	},
	load: function(query) {
		$.get(this.url, query, this.acceptResponse);
	},
	save: function(data) {
		$.post(this.url, data, this.acceptResponse);
	},

	ajaxLoad: function(query) {
		$.ajax({
			type: "GET",
			url: this.url,
			data: query,
			success: this.acceptResponse,
			//dataType: dataType
			});
	},
	ajaxSave: function(data) {
		$.ajax({
			type: "POST",
			url: this.url,
			data: data,
			success: this.acceptResponse,
			//dataType: dataType
			});
	}
}