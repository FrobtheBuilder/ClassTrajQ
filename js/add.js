$(document).bind('pageshow', function() {
	roster = new classList();
	read(roster, false);
	console.log(JSON.stringify(roster));
});


$(".finalizeadd").bind("mousedown", function() {

	var classname = $(".classnameinput").val();
	var starttime = $(".classstarttimeinput").val();
	var endtime = $(".classendtimeinput").val();
	if (classname != "" && starttime != "" && endtime != "") {
		roster.appendToA(new singleClass(classname, starttime, endtime));
		console.log(JSON.stringify(roster));
		write(roster, false);
		$('.ui-dialog').dialog('close')

		$(".classnameinput").val("");
		$(".classtimeinput").val("");
	}
	else {
		$( ".addpop" ).popup("close");
		$( ".errorpop" ).popup( "open" );
	}

});
