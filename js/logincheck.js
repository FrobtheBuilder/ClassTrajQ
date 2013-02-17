$(document).bind('pageinit', function() {
	$.ajax({
		url: login,
		dataType: 'jsonp',
		data: {action: "test"},
		success: function(response) {
			console.log(response);
			$(".user").html(response.user);
			//$(".user").buttonMarkup({ mini: true });
			$(".user").button();
			$(".user").button('refresh');
			if (response.loggedin == false) {
				$.mobile.changePage("login.html");
			}
		}
	})
});