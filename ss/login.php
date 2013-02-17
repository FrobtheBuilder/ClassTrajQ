<?php
include "callback.php";

header('Content-Type: text/javascript');
session_start();
if ($_GET['action'] == "test") {
	echo jsonp(test(), $_GET['callback']);
}
else if ($_GET['action'] == "set") {
	set();
}
else if ($_GET['action'] == "logout") {
	logout();
}

function test() {
	//$returned = array("loggedin" => true, "user" => $_SESSION)
	if (isset($_SESSION['user'])) {
		return '{"loggedin":true, "user":"'.$_SESSION['user'].'", "session":"'.session_id().'"}';
	}
	else {
		return '{"loggedin":false, "user":"", "session":""}';
	}
}

function logout() {
	session_unset();
	echo jsonp(test(), $_GET['callback']);
}

function set() {
	$user = $_GET['user'];
	$directory = dirname(__FILE__)."/profiles/" . $user;
	if (!is_dir($directory)) {
		mkdir(dirname(__FILE__)."/profiles/" . $user);
	}
	$_SESSION['workingdir'] = $directory;
	$_SESSION['user'] = $user;
	$response = array("user" => $_SESSION['user'], "session" => session_id());
	echo jsonp(json_encode($response), $_GET['callback']);
}
?>