<?php
        include("access.php");
        include("classes/CustomerManager.php");
        session_start();
        $data = json_decode($_POST['data'], true);
        $email = $data['email'];
        $password = $data['password'];
        $manager = new CustomerManager();
        $result = $manager->loginAccount($email, $password);
        if(!$result instanceof Customer){
                echo json_encode($result);
        }
        else{
                echo json_encode($result->returnData());
        }
?>