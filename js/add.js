$(document).bind('pageshow', function() {
	roster = new classList();
	$.when(io.read(roster, false)).done(function(data) {
		console.log(JSON.stringify(roster));
	})
	console.log($("input.a").val())
});


$(".finalizeadd").bind("mousedown", function() {

	var classname = $(".classnameinput").val();
	var starttime = $(".classstarttimeinput").val();
	var endtime = $(".classendtimeinput").val();
	if (classname != "" && starttime != "" && endtime != "") {
		if ($('input[type=radio]:checked').attr("class") === "a") {
			roster.appendToA(new singleClass(classname, starttime, endtime));
		}
		else {
			roster.appendToB(new singleClass(classname, starttime, endtime));
		}
		
		console.log(JSON.stringify(roster));
		$.when(io.write(roster, false)).done(function(data) {
			console.log(data);
			window.location = "index.html";
		})
		//$('.ui-dialog').dialog('close')
		$(".classnameinput").val("");
		$(".classtimeinput").val("");
	}
	else {
		alert("Invalid Input");
		//$( ".addpop" ).popup("close");
		//$( ".errorpop" ).popup( "open" );
	}

});
