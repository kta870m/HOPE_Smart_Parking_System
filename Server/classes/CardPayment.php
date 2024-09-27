<?php
include_once("include/functions.php");
include_once("PaymentMethod.php");
class CardPayment extends PaymentMethod{

    public function __construct() {
    }

    //avoid user enter invalida data
    public function processPayment($cost, $paymentdetail){
        $error = [];
        $cardType = $paymentdetail['card'];
        $cardholderName = $paymentdetail['name'];
        $cardNumber = $paymentdetail['number'];
        $expirationDate = $paymentdetail['expiry'];
        $cvv = $paymentdetail['cvv'];
        if(validate($error, $cardholderName, "Cardholder name cannot be empty", "name")){
            validate($error, preg_match('/^[a-zA-Z\s]+$/', $cardholderName), "Cardholder name must contain only letter", "name");
        }
        validate($error, $this->validateCardNumber($cardNumber, $cardType), "Invalid card number", "number");
        validate($error, preg_match('/^\d{2}\/\d{2}$/', $expirationDate), "Invalid expiration date format (MM/YY required)", "expiry");
        validate($error, preg_match('/^[0-9]{3,4}$/', $cvv), "Invalid CVV", "cvv");
        if(sizeof($error) == 0){
            return true;
        }
        else{
            return $error;
        }
    }

    //validate credit card number for many card type
    private function validateCardNumber($cardNumber, $cardType) {
        $cardPatterns = array(
            'visa' => '/^(4[0-9]{12}(?:[0-9]{3})?)$/',
            'mastercard' => '/^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/',
            'americanexpress' => '/^(?:2131|1800|35[0-9]{3})[0-9]{11}$/'
        );
        return isset($cardPatterns[$cardType]) ? preg_match($cardPatterns[$cardType], $cardNumber) : false;
    }
}
?>