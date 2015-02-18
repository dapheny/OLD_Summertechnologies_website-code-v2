<?php
class AnimalType
{
    public $type_name = '';
    public $count = 0;
}
 
// Create connection
$con=mysqli_connect("localhost","jtsau","summer4me","_sampledb");
 
// Check connection
if (mysqli_connect_errno())
{
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
 
// // This SQL statement selects ALL from the table 'Locations'
// $sql = "SELECT * FROM Cattle";
 
// // Check if there are results
// if ($result = mysqli_query($con, $sql))
// {
//     // If so, then create a results array and a temporary one
//     // to hold the data
//     $resultArray = array();
//     $tempArray = array();
 
//     // Loop through each row in the result set
//     while($row = $result->fetch_object())
//     {
//         // Add each row into our results array
//         $tempArray = $row;
//         array_push($resultArray, $tempArray);
//     }
 
//     // Finally, encode the array to JSON and output the results
//     echo json_encode($resultArray);
// }

$sql_animal_types = "SELECT DISTINCT Animal FROM Cattle";

// Check if there are results
if ($result = mysqli_query($con, $sql_animal_types))
{
    // If so, then create a results array and a temporary one
    // to hold the data
    $resultArray = array();
    // $tempArray = array();
    
 
    // Loop through each row in the result set
    while($row = $result->fetch_object())
    {
        // Add each row into our results array
        $tempObject = new AnimalType;
        $tempObject->type_name = $row->Animal;

        $animal_type = $row->Animal;

        $sql_count_animal = "SELECT COUNT('Animal') FROM Cattle WHERE Animal LIKE '$animal_type'";
        if ($countresult = mysqli_query($con, $sql_count_animal))
        {
            while($countrow = $countresult->fetch_row())
            {
                $tempObject->count = $countrow[0];
            }
        }
        
        array_push($resultArray, $tempObject);
    }
 
    // Finally, encode the array to JSON and output the results
    echo json_encode($resultArray);

    // Get count of each Animal type
    foreach($resultArray as $animal_type) 
    {
        
    }
}


 
// Close connections
mysqli_close($result);
mysqli_close($con);


// Save for reference until class code above works
// if ($result = mysqli_query($con, $sql_animal_types))
// {
//     // If so, then create a results array and a temporary one
//     // to hold the data
//     $resultArray = array();
//     $tempArray = array();
 
//     // Loop through each row in the result set
//     while($row = $result->fetch_object())
//     {
//         // Add each row into our results array
//         $tempArray = $row;
//         array_push($resultArray, $tempArray);
//     }
 
//     // Finally, encode the array to JSON and output the results
//     echo json_encode($resultArray);

//     // // Get count of each Animal type
//     // foreach($resultArray as $animal_type) 
//     // {
//     //     $sql_count_animal = "SELECT COUNT('Animal') FROM Cattle WHERE Animal LIKE '$animal_type'";
//     //     if ($result = mysqli_query($con, $sql_count_animal))
//     //     {
//     //         while($row = $result->fetch_object())
//     //         {
//     //             $this_count = $row;
//     //             echo json_encode($this_count);
//     //         }
//     //     }
//     // }
// }
?>