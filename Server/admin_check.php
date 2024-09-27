<?php      
    if (!isset($_SESSION['admin_account']) || $_SESSION['admin_account'] == null) {
        exit;
    }
?>