<?php
	$var = json_decode($_POST["varia"]);
	$thefile = fopen(dirname(__FILE__)."/profiles/frob/c.json", "w+");
	fwrite($thefile, json_encode($var));
	echo "complete (maybe)";
?>