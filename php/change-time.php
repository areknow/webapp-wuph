<?php

include 'con.php';

date_default_timezone_set('America/Detroit');
$time = date("g:i a");

mysql_query("UPDATE house SET 
`time` = '$time'
WHERE 1");

echo $time;