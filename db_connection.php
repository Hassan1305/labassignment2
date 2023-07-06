<?php
    $servername = "localhost";
    $username = "root";
    $password = ""; // set this field "" (empty quotes) if you have not set any
    $dbname = "meter_reading";
    $e="";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
    echo $e->getMessage();
}
?>