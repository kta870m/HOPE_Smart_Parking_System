<?php
        include("access.php");
        session_start();
        include("admin_check.php");
        include("classes/LocationManager.php");
        $data = json_decode($_POST['data'], true);
        $name = $data['name'];
        $address = $data['address'];
        $longtitude = $data['longtitude'];
        $latitude = $data['latitude'];
        $manager = new LocationManager();
        $location = $manager->addLocations($name,$address,$longtitude,$latitude);
        echo json_encode($location->returnData());
?>