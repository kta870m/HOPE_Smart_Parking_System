<?php
    include("access.php");
    session_start();
    include("customer_check.php");
    echo json_encode($_SESSION['customer_account']);
?>