$.ajaxSetup({
  	url: backend,
  	dataType: 'jsonp',
  	type: 'GET'
});

io = {

	write: function(target, andread) {
		console.log(roster);
		var ajax = $.ajax({
			data: {
				action: "write",
				clientclasses: JSON.stringify(target)
			},
			success: function(data) {
				console.log("Written to server:");
				console.log(data);
				if (andread)
				{
					io.read(target, false);
				}
			}
		});
		return ajax;
	},

	read: function(target, andwrite) {
		var ajax = $.ajax({
			data: {
				action: "read"
			},
			success: function(serversidelist) {
				// do stuff with json (in this case an array)
				console.log("Read from server:");
				console.log(serversidelist);
				if (andwrite) {
					io.write(target, false);
				}
				
				if (serversidelist === null || serversidelist === undefined) {
					io.write(target, false);
				}
				else{
					target.a = serversidelist.a;
					target.b = serversidelist.b;
				}
				
			},
		});
		return ajax;
	},

	dump: function() {
		$.ajax({
			data: {
				action: "dump"
			},
			success: function(response) {
				console.log(response)
			}
		})
	}
}