function write(target, andread) {
	console.log(JSON.stringify(roster))
	$.ajax({
		url: writer,
		data: {clientclasses: JSON.stringify(target)},
		dataType: 'jsonp', 
		success: function(data) {
			if (andread)
			{
				read(target, false);
			}
			console.log(data);
		}
	});
}

function read(target, andwrite){
	$.ajax({
		url: reader,
		dataType: 'jsonp',
		success: function(serversidelist) {
			// do stuff with json (in this case an array)
			console.log(serversidelist);
			if (andwrite) {
				write(target, false);
			}
			if (serversidelist === null) {
				write(target, false);
			}
			target.a = serversidelist.a;
			target.b = serversidelist.b;
			addClasses(target);
		},
	})
}