<?php
abstract class TransactionDocument {
    protected $customer;
    protected $reservation;
    protected $data = [];
    public function __construct($customer,$reservation) {
        $this->customer = $customer;
        $this->reservation = $reservation;
    }

    //to be overriden by subclasses
    abstract public function create();

    //return transaction document data
    public function send() {
        return $this->data;
    }

}
?>