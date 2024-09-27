<?php
        include("access.php");
        include("classes/LocationManager.php");
        $manager = new LocationManager();
        $manager->getLocations();
        echo json_encode($manager->returnData()['locations']);
?>