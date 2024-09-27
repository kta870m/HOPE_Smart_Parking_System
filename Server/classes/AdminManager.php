<?php
include_once("PersonManager.php");
include_once("Admin.php");
class AdminManager extends PersonManager{

    public function __construct() {
        parent::__construct("admin");
       $this->table = "admin";
    }

    // to be used in PersonManager
    public function createPerson($id, $email, $username, $date, $address){
        return new Admin($id, $email, $username, $date, $address);
    }
}
?>