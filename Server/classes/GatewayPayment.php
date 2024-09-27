<?php
include_once("include/functions.php");
include_once("PaymentMethod.php");
class GatewayPayment extends PaymentMethod{

    public function __construct() {
    }

    //assumed to always succeed
    public function processPayment($cost, $paymentdetail){
        return true;
    }

}
?>