<?php
        include("access.php");
        include("classes/AdminManager.php");
        session_start();
        $data = json_decode($_POST['data'], true);
        $email = $data['email'];
        $password = $data['password'];
        $manager = new AdminManager();
        $result = $manager->loginAccount($email, $password);
        if(!$result instanceof Admin){
                echo json_encode($result);
        }
        else{
                echo json_encode($result->returnData());
        }
?>