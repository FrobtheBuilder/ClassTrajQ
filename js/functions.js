reader = "http://classtrajq.vacau.com/ss/reader.php";
writer = "http://classtrajq.vacau.com/ss/writer.php";
$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.extend($.mobile.zoom, {locked:true,enabled:false});
});

$(document).bind('pageinit', function() {
	roster = new classList();
	read();
	sync();
	$(".classlist").listview('refresh');
});


$(".addbutton").bind("mousedown", function() {
	$( ".addpop" ).popup( "open" );
});

$(".finalizeadd").bind("mousedown", function() {

	var classname = $(".classnameinput").val();
	var starttime = $(".classstarttimeinput").val();
	var endtime = $(".classendtimeinput").val();
	if (classname != "" && starttime != "" && endtime != "") {
		roster.appendToA(new singleClass(classname, starttime, endtime));
		console.log(JSON.stringify(roster));

		$( ".addpop" ).popup("close");
		$(".classnameinput").val("");
		$(".classtimeinput").val("");
	}
	else {
		$( ".addpop" ).popup("close");
		$( ".errorpop" ).popup( "open" );
	}

});

$(".errorclose").bind("mousedown", function() {
	$( ".errorpop" ).popup( "close" );
	$( ".addpop" ).popup( "open" );
});

$(".switchbutton").bind("mousedown", function() {
	read();
	$(".classlist").listview('refresh');
});


function sync() {
	console.log(JSON.stringify(roster))
	$.ajax({
		url: writer,
		data: {varia: JSON.stringify(roster)},
		dataType: 'jsonp', 
		success: function(data) {
			read();
			console.log(data);
		}
	});
}

function read(){
	$.ajax({
		url: reader,
		dataType: 'jsonp',
		success: function(serversidelist) {
			// do stuff with json (in this case an array)
			console.log(serversidelist);
			roster.a = serversidelist.a;
			roster.b = serversidelist.b;
			addClasses(roster);
     	},
	})
}

function initsslist() {
	var empty = new classList();
	$.ajax({
		url: writer,
		dataType: 'jsonp',
		data: {varia: empty}
	})
}

function addClasses(jsonclass) {
	$(".classlist").html("");
	aday = jsonclass.a;
	bday = jsonclass.b;
	addElements(aday);
	
}


function addElements(classlist) {
	for (var i=0; i<classlist.length; i++) {
		var start = new Date();
		start = Date.parse(classlist[i].startTime);
		end = Date.parse(classlist[i].endTime);
		console.log(start.toString("hh:mm tt"));
		$(".classlist").append("<li>" + '<a href=".html">' + classlist[i].class + '<p class="time">' + start.toString("hh:mm tt") + " - " + end.toString("hh:mm tt") + '</p></a></li>');
	}
	$(".classlist").listview('refresh');
}

setInterval(function () {
	sync();
	$(".classlist").listview('refresh');
}, 5000)

setInterval(function() {
	$(".currenttime").html(new Date().toString("hh:mm tt"))
}, 1000)