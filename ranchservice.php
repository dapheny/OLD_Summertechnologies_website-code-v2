<?php
 class Ranch
{
    public $ranch_name = '';
    public $count = 0;
}
// Create connection
$con=mysqli_connect("localhost","jtsau","summer4me","_sampledb");
 
// Check connection
if (mysqli_connect_errno())
{
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
 
$animalType = htmlspecialchars($_GET["animal"]);

// // This SQL statement selects ALL from the table 'Locations'
$sql = "SELECT DISTINCT Ranch FROM Cattle WHERE Animal LIKE '$animalType'";
 
// Check if there are results
if ($result = mysqli_query($con, $sql))
{
    // If so, then create a results array and a temporary one
    // to hold the data
    $resultArray = array();
    $tempArray = array();
 
    // Loop through each row in the result set
    // Loop through each row in the result set
    while($row = $result->fetch_object())
    {
        // Add each row into our results array
        $tempObject = new Ranch;
        $tempObject->ranch_name = $row->Ranch;

        $ranch_name = $row->Ranch;

        $sql_count_ranch = "SELECT COUNT('Ranch') FROM Cattle WHERE Ranch LIKE '$ranch_name' AND Animal LIKE '$animalType'";
        if ($countresult = mysqli_query($con, $sql_count_ranch))
        {
            while($countrow = $countresult->fetch_row())
            {
                $tempObject->count = $countrow[0];
            }
        }
        
        array_push($resultArray, $tempObject);
    }
    // while($row = $result->fetch_object())
    // {
    //     // Add each row into our results array
    //     $tempArray = $row;
    //     array_push($resultArray, $tempArray);
    // }
 
    // Finally, encode the array to JSON and output the results
    echo json_encode($resultArray);
}

 
// Close connections
mysqli_close($result);
mysqli_close($con);
?>