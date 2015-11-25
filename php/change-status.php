<?php

include 'con.php';

$status = $_POST['status'];

mysql_query("UPDATE house SET 
`status` = '$status'
WHERE 1");

echo $status;