<?php
        include("access.php");
        session_start();
        include("customer_check.php");
        include("classes/Location.php");
        $data = json_decode($_POST['data'], true);
        $id = $data['id'];
        $location = new Location($id,"Duy Tan","address", 0, 0);
        $location->getSpaces();
        echo json_encode($location->returnData()['parking_spaces']);
?>