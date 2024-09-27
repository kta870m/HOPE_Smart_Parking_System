<?php
    include("access.php");
    session_start();
    include("admin_check.php");
    echo json_encode($_SESSION['admin_account']);
?>