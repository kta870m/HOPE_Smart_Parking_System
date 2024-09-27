<?php
abstract class paymentMethod{

    public function __construct() {
    }

    //overriden by subclasses
    abstract public function processPayment($cost, $paymentdetail);
}
?>