<?php
        include("access.php");
        session_start();
        include("customer_check.php");
        include_once("classes/Customer.php");
        include_once("classes/Reservation.php");
        $data = json_decode($_POST['data'], true);
        $reservation_id = $data['id'];
        $time = $data['time'];
        $duration = $data['duration'];
        $description = $data['description'];
        $c = $_SESSION['customer_account'];
        $customer = new Customer($c['id'], $c['email'], $c['username'], $c['start_date'], $c['address']);
        $result = $customer->history()->editReservation($c['id'], $reservation_id, $time, $duration, $description);
        if($result instanceof Reservation){
                echo json_encode($result->returnData());
        }
        else{
                echo json_encode($result);
        }
?>