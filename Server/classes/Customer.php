<?php
include_once("Person.php");
include_once("History.php");
class Customer extends Person{
    private $history;
    
    public function __construct($id, $username, $email, $start_date, $address) {
        parent::__construct($id, $username, $email, $start_date, $address);
        $this->history = new History();
    }

    public function history(){
        return $this->history;
    }

    // get the reservation list
    public function getHistory(){
        $this->history->getReservations($this->id);
        return $this->history;
    }

    // uses base class method
    public function returnData() {
        $data = $this->returnPersonData();
        return $data;
    }
}
?>