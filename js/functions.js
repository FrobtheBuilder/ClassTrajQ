$.ajaxSetup({
  	url: backend,
  	dataType: 'jsonp',
  	type: 'GET'
});

$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.extend($.mobile.zoom, {locked:true,enabled:false});
});


$(document).on('pageshow', function() {
	logincheck();
	roster = new classList();
	day = 'a';

	$.when(io.read(roster, false)).done(function(data) {
		console.log(data.a);
		sort(roster);
		list.addClasses(roster, day);
	})

	list.addClasses(roster, day);
	

	$(".addbutton").on("mousedown", function() {
		window.location = "add.html"
		//$.mobile.changePage('add.html', {transition: 'pop', /*role: 'dialog'*/});   
	});

	$(".menubutton").on("mousedown", function() {
		$(".menupop").popup("open");
	})

	$(".logout").on("mousedown", function() {
		$.ajax({
			data: {
				action: "logout"
			},
			success: function(response) {
				console.log(response)
				if (response.loggedin == false) {
					window.location = "login.html";
				}
			}
		})
	})

	$(".switch").on("mousedown", function() {
		switchday();
	});

	setInterval(function() {
		list.addClasses(roster, day);
		$(".currenttime").html(new Date().toString("hh:mm tt"));
	}, 10000)


});

list = {
	addClasses: function(jsonclass, aorb) {
		$(".classlist").html("");
		var aday = jsonclass.a;
		var bday = jsonclass.b;
		var current = this.highlight(aorb);
		if (aorb === 'a') {
			this.addElements(aday, current);
		}
		else {
			this.addElements(bday, current);
		}
	},

	highlight: function(day) {
		var currentclass = undefined;
		if (day === "a") {
			for (var i=0; i<roster.a.length; i++) {
				if (Date.parse("now").compareTo(Date.parse(roster.a[i].startTime)) === 1 && Date.parse("now").compareTo(Date.parse(roster.a[i].endTime)) === -1){
					currentclass = roster.a[i];
				}
			}
		}
		else {
			for (var i=0; i<roster.b.length; i++) {
				if (Date.parse("now").compareTo(Date.parse(roster.b[i].startTime)) === 1 && Date.parse("now").compareTo(Date.parse(roster.b[i].endTime)) === -1){
					currentclass = roster.b[i];
				}
			}
		}
		return currentclass
	},

	addElements: function(classlist, currentclass) {
		for (var i=0; i<classlist.length; i++) {
			var start = new Date();
			var end = new Date();
			start = Date.parse(classlist[i].startTime);
			end = Date.parse(classlist[i].endTime);
			if (currentclass != undefined && classlist[i].class === currentclass.class) {
				$(".classlist").append('<li data-theme="b" class="current">' + '<a href="#">' + classlist[i].class + '<p class="time">' + start.toString("hh:mm tt") + " - " + end.toString("hh:mm tt") + '</p>' + '<a onclick="javascript:deleteClass(this)" class="delete '+ i +'">Delete</a>' + '</a></li>');
			}
			else
			{
				$(".classlist").append("<li>" + '<a href="#">' + classlist[i].class + '<p class="time">' + start.toString("hh:mm tt") + " - " + end.toString("hh:mm tt") + '</p>' + '<a onclick="javascript:deleteClass(this)" class="delete '+ i +'">Delete</a>' + '</a></li>');
			}	
		}
		this.refresh();
	},

	refresh: function() {
		$(".classlist").listview('refresh');
		io.read(roster, false);
	}
}

function deleteClass(arg) {
	console.log($(arg));
	target = $(arg).attr('class').split(' ')[1];
	if (day == "a") { roster.removeFromA(target) } else { roster.removeFromB(target) };	
	io.write(roster, false);
	list.addClasses(roster, day);
}

function sort(theroster) {
	theroster.a.sort(function(a, b){
		return Date.parse(a.startTime).compareTo(Date.parse(b.startTime))
	})
}

function switchday() {
	console.log("switching");
	if (day == 'a') {
		day = 'b';
		$(".switchbutton").html('<span class="ui-btn-inner">B</span>');
		$(".switchbutton").removeClass("ui-btn-up-a ui-btn-hover-a").addClass("ui-btn ui-mini ui-btn-hover-a ui-shadow").attr("data-theme", "a").attr("data-mini", "true");
	}
	else {
		day = 'a';
		$(".switchbutton").html('<span class="ui-btn-inner">A</span>');
	}
	list.addClasses(roster, day);
}

setTimeout(function() {
	$(".currenttime").html(new Date().toString("hh:mm tt"))
}, 1000)
