<?php

try {
    $dbh = new PDO('mysql:host=localhost;dbname=000207475', "000207475", "19910315");
} catch (Exception $e) {
    die('Could not connect to DB: ' . $e->getMessage());
}

// $action = filter_input(INPUT_POST, "action", FILTER_SANITIZE_SPECIAL_CHARS);
$q = $_POST["query"];
// echo "q: ".$q;

// if ( $action == 'all' ){
    // $command = "SELECT * FROM `todos`";
    // $query = $dbh->prepare($command);
    // $result = $query->execute();
    // $json_array = array();
    // while ($row = $query->fetch()) {
    //     $json_array[] = $row;
    // }
    // header('Content-type: application/json');
    // echo json_encode($json_array);
// }

// if ( $action == 'search' ){
    // echo $input;
    // echo "%".$q."%";
$command = "SELECT * FROM `todos` WHERE `item_name` LIKE (?) OR `item_description` LIKE (?) OR `item_assignment` LIKE (?)";
    
$single = "%".$q."%";
$query = $dbh->prepare($command);
$input = [$single, $single, $single];
    $result = $query->execute($input);
    $json_array = array();
    while ($row = $query->fetch()) {
        $json_array[] = $row;
    }
    header('Content-type: application/json');
    echo json_encode($json_array);
// }

?>