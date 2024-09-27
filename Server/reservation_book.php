<?php
        include("access.php");
        session_start();
        include("customer_check.php");
        include("classes/BookingProcess.php");
        include_once("classes/ParkingSpaceRepo.php");
        include_once("classes/ParkingSpace.php");
        $data = json_decode($_POST['data'], true);
        $space_id = $data['id'];
        $time = $data['time'];
        $duration = $data['duration'];
        $description = $data['description'];

        // $space_id = [7,9,11];
        // $time = "2024-09-30 18:00:00";
        // $duration = 60;
        // $description = "";
        $repo = new ParkingSpaceRepo();
        $data = $repo->readFromList($space_id);
        $parking_spaces=[];
        foreach($data as $space){
            $parking_spaces[] = new ParkingSpace($space['id'], $space['name'], $space['vehicle_type']);
        }
        $booking = new BookingProcess();
        $c = $_SESSION['customer_account'];
        $customer = new Customer($c['id'], $c['email'], $c['username'], $c['start_date'], $c['address']);
        $result = $booking->book($parking_spaces, $customer, $time, $duration, $description);
        if(isset($result['reservation'])){
            echo json_encode(['reservation' => $result['reservation']->returnData(),'invoice' => $result['invoice']]);
        }
        else{
            echo json_encode($result);
        }
        
?>