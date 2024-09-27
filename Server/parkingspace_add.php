<?php
        include("access.php");
        session_start();
        include("admin_check.php");
        include("classes/Location.php");
        $data = json_decode($_POST['data'], true);
        $name = $data['name'];
        $location_id = $data['location_id'];
        $vehicle_type = $data['vehicle_type'];
        $location = new Location($location_id,"","", 0, 0);
        $space = $location->addSpaces($name, $vehicle_type);
        echo json_encode($space->returnData());
?>