login = "http://98.219.8.9/public/ClasstrajQ/ss/login.php";

$(document).bind('pageinit', function() {
	$.ajax({
		url: login,
		dataType: 'jsonp',
		data: {action: "test"},
		success: function(response) {
			console.log(response);
			if (response.loggedin == false) {
				window.location = "login.html";
			}
		}
	})
});