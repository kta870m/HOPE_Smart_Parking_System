<?php
        include("access.php");
        include("classes/CustomerManager.php");
        session_start();
        $data = json_decode($_POST['data'], true);
        $email = $data['email'];
        $username = $data['username'];
        $password = $data['password'];
        $retypepassword = $data['retypepassword'];
        $manager = new CustomerManager();
        $result = $manager->createAccount($email, $username, $password, $retypepassword);
        if(!$result instanceof Customer){
                echo json_encode($result);
        }
        else{
                echo json_encode($result->returnData([]));
        }
?>