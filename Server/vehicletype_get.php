<?php
        include("access.php");
        session_start();
        include("customer_check.php");
        include("classes/VehicleTypeRepo.php");
        $repo = new VehicleTypeRepo();
        $result = $repo->read();
        echo json_encode($result);
?>