<?php

include 'con.php';

$query = mysql_query("SELECT * FROM `house` WHERE 1")
  or die(mysql_error());

$row = mysql_fetch_array($query);
$time = $row['time'];

echo $time;

