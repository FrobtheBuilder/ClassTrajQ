<?php
	$callback = '';
    if (isset($_GET['callback']))
    {
        $callback = filter_var($_GET['callback'], FILTER_SANITIZE_STRING);
    }
	$thefile = fopen(dirname(__FILE__)."/profiles/frob/c.json", "r+");
	$content = fread($thefile, filesize(dirname(__FILE__)."/profiles/frob/c.json"));
	echo $callback . '(' . $content . ');';
?>