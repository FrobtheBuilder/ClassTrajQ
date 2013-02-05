<?php
	$thefile = fopen(dirname(__FILE__)."/profiles/frob/c.json", "r+");
	$content = fread($thefile, filesize(dirname(__FILE__)."/profiles/frob/c.json"));
	echo $content;
?>