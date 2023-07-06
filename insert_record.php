<?php
include("db_connection.php");

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);
$CNIC = $DecodedData['cnic'];
$latitude = $DecodedData['latitude'];
$longitude = $DecodedData['longitude'];
$ss = $DecodedData['snapshot'];
$Message = "Record inserted";
try {
$query = "insert into records(CNIC, latitude,longitude,ss) values(:uCNIC,
:latitude,:longitude,:ss)";
$stmt = $conn -> prepare($query);
$stmt -> bindParam(':uCNIC', $CNIC);
$stmt -> bindParam(':latitude', $latitude);
$stmt -> bindParam(':longitude', $longitude);
$stmt -> bindParam(':ss', $ss);
$stmt -> execute();
}
catch(PDOException $e)
{
$Message = $e -> getMessage();
}
$conn = NULL;
$Response[] = array("Message" => $Message);
echo json_encode($Response);
?>