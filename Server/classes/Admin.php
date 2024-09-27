<?php
include_once("Person.php");
class Admin extends Person{
    
    public function __construct($id, $username, $email, $start_date, $address) {
        parent::__construct($id, $username, $email, $start_date, $address);
    }

    // uses base class method
    public function returnData() {
        $data = $this->returnPersonData();
        return $data;
    }
}
?>