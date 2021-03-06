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
	getClasses();
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
		$.ajax({
			url: writer,
			data: {varia: JSON.stringify(roster)},
			dataType: 'jsonp', 
			success: function(data) {
				getClasses();
				$(".classlist").listview('refresh');
			}
		});
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
	getClasses();
	$(".classlist").listview('refresh');
});


function getClasses() {
	$.ajax({
		url: reader,
		type: "GET",
		dataType: 'jsonp', 
		success:function(json){
			// do stuff with json (in this case an array)
			console.log(json);
			var checker = json;
			if(checker.a != undefined) {
				roster.a = json.a;
				roster.b = json.b;
			}
			else {
				console.log("Empty Classlist Response - Add something!");
				roster.a = [];
				roster.b = [];
			}
			addClasses(roster);
     	},
     	error:function(){
        	alert("Error");
		},
	});
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
	getClasses();
	$(".classlist").listview('refresh');
}, 5000)

setInterval(function() {
	$(".currenttime").html(new Date().toString("hh:mm tt"))
}, 1000)