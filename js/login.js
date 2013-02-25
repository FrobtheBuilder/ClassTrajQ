$.ajaxSetup({
  	url: backend,
  	dataType: 'jsonp',
  	type: 'GET'
});

$(document).bind('pageinit', function() {
	$(".submit").bind("mousedown", function() {
		console.log("pressed");
		username = $(".user").val();
		password = $(".password").val();
		$.ajax({
			data: {
				action: "login",
				user: username,
				password: password,
			},
			success: function(data) {
				console.log(data);
				if (data.success == true) {
					window.location = "index.html";
				}
				else {
					alert("Password Incorrect");
				}
			}
		})
	});
});