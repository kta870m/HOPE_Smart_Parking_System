<?php
        include("access.php");
        session_start();
        include("customer_check.php");
        include("classes/Customer.php");
        $data = json_decode($_POST['data'], true);
        $reservation_ids = $data['ids'];
        $c = $_SESSION['customer_account'];
        $customer = new Customer($c['id'], $c['email'], $c['username'], $c['start_date'], $c['address']);
        $reservations = $customer->history()->removeReservations($reservation_ids, $c['id']);
        echo json_encode($reservations);
?>