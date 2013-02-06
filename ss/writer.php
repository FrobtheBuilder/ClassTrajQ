<?php
	$var = json_decode($_GET["varia"]);
	$thefile = fopen(dirname(__FILE__)."/profiles/frob/c.json", "w+");
	fwrite($thefile, json_encode($var));

	$callback = '';
	if (isset($_GET['callback']))
    {
        $callback = filter_var($_GET['callback'], FILTER_SANITIZE_STRING);
    }
    echo $callback.'('.json_encode($var).');';
?>