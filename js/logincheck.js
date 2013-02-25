$.ajaxSetup({
  	url: backend,
  	dataType: 'jsonp',
  	type: 'GET'
});

$(document).bind('pageinit', function() {
	
});

function logincheck() {
	$.ajax({
		data: {
			action: "testlogin"
		},
		success: function(response) {
			$(".user").html(response.user);
			if (response.loggedin == false) {
				window.location = "login.html";
			}
		}
	})
}