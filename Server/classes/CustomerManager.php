<?php
include_once("PersonManager.php");
include_once("Customer.php");
class CustomerManager extends PersonManager{

    public function __construct() {
        parent::__construct("customer");
       $this->table = "customer";
    }

    //to be used in PersonManager
    public function createPerson($id, $email, $username, $date, $address){
        return new Customer($id, $email, $username, $date, $address);
    }
}
?>