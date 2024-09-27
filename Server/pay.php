<?php
        include("access.php");
        session_start();
        include("customer_check.php");
        include_once("classes/VehicleTypeRepo.php");
        include_once("classes/Customer.php");
        include_once("classes/Reservation.php");
        include_once("classes/Payment.php");
        include_once("classes/CardPayment.php");
        include_once("classes/GatewayPayment.php");
        $data = json_decode($_POST['data'], true);
        $r = $data['reservation'];
        $paymentdetail = $data['paymentdetail'];
        $reservation = new Reservation($r['id'], $r['book_time'], $r['start_time'], $r['duration'], $r['description']);
        $c = $_SESSION['customer_account'];
        $customer = new Customer(13, $c['email'], $c['username'], $c['start_date'], $c['address']);
        $reservation->getSpaces();
        $repo = new VehicleTypeRepo();
        $pricelist = $repo->readPrice();
        $reservation->getPrice($pricelist);
        $reservation->getTransactions();
        $cost = $reservation->getDebt();
        $method = $paymentdetail['method'] == 'card' ? new CardPayment() : new GatewayPayment();
        $payment = new Payment($cost,$method);
        $result = $payment->pay($customer,$reservation,$paymentdetail);
        echo json_encode($result);
?>