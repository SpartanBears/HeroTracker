$(document).ready(function(){

	console.log("app.js");

	$.ajax({
		method: 'POST',
		url: "http://127.0.0.1/HeroTracker/services/test_service.php",
		data: "test",
		crossDomain: true,
		cache: false,
        contentType: false,
        processData: false,
		success: function(data){

			document.querySelector(".test").innerHTML = "Server response: " + data;
		},
		error: function(jqXHR,textStatus,errorThrown){

			document.querySelector(".test").innerHTML = jqXHR + " " + textStatus + " " + errorThrown;
		}
	});
});