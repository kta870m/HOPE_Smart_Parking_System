<?php
        include("access.php");
        session_start();
        include("customer_check.php");
        include("classes/Customer.php");
        $customer_account = $_SESSION['customer_account'];
        $customer = new Customer($customer_account['id'],"user1@gmail.com","User 1","2024-06-24","");
        $history = $customer->getHistory();
        echo json_encode($history->returnData([]));
?>