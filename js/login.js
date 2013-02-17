$(document).bind('pageinit', function() {
	$(".submit").bind("mousedown", function() {
		console.log("pressed");
		username = $(".user").val();
		$.ajax({
			url: login,
			dataType: 'jsonp',
			data: {
				action: "set",
				user: username
			},
			success: function(data) {
				console.log(data);
				if (data.user !== null && data.user !== "" && data.user !== undefined)
				{
					window.location = "index.html";
				}
			}
		})
	});
});