<?php
 
// Create connection
$con=mysqli_connect("localhost","jtsau","summer4me","_sampledb");
 
// Check connection
if (mysqli_connect_errno())
{
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
 // ranch=%@&animal=%@&breed=%@&ID_Number=%@&notes=%@ 

$ranch = ucwords(htmlspecialchars($_POST["ranch"]));
$animal = ucwords(htmlspecialchars($_POST["animal"]));
$breed = ucwords(htmlspecialchars($_POST["breed"]));
$id_number = htmlspecialchars($_POST["ID_Number"]);
$notes = htmlspecialchars($_POST["notes"]);

// $ranch = htmlspecialchars($_GET["ranch"]);
// $animal = htmlspecialchars($_GET["animal"]);
// $breed = htmlspecialchars($_GET["breed"]);
// $id_number = htmlspecialchars($_GET["ID_Number"]);
// $notes = htmlspecialchars($_GET["notes"]);

// // This SQL statement selects ALL from the table 'Locations'
$sql = "INSERT INTO Cattle SET Ranch='$ranch', Animal='$animal', Breed='$breed', ID_Number='$id_number', Notes='$notes'";
 
// Check if there are results
if ($result = mysqli_query($con, $sql))
{
    // If so, then create a results array and a temporary one
    // to hold the data
    $resultArray = array();
    $tempArray = array();
 
    // Loop through each row in the result set
    while($row = $result->fetch_object())
    {
        // Add each row into our results array
        $tempArray = $row;
        array_push($resultArray, $tempArray);
    }
 
    // Finally, encode the array to JSON and output the results
    echo json_encode($resultArray);
}
else 
{
    echo "False!";
}
 
// Close connections
mysqli_close($result);
mysqli_close($con);
?>