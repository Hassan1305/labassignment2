<?php
require_once 'db_connection.php';

// Set the character set to UTF-8
$conn->exec("set names utf8");

// Set the response to be in JSON format
header('Content-Type: application/json');

// Retrieve all records from the "records" table
$query = "SELECT * FROM records";
$stmt = $conn -> prepare($query);
$stmt -> execute();
$resultJSON = json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
echo $resultJSON;

?>
