<?php
include_once("TransactionDocument.php");
class Receipt extends TransactionDocument{
    private $paymentdetail;
    public function __construct($customer,$reservation,$paymentdetail) {
        parent::__construct($customer,$reservation);
        $this->paymentdetail = $paymentdetail;
    }

    //all data needed for the receipt
    public function create(){
        $this->data['customer'] = $this->customer->returnData();
        $this->data['spaces'] = $this->reservation->returnData()['parking_spaces'];
        $this->data['duration'] = $this->reservation->returnData()['duration'];
        $this->data['total_price'] = $this->reservation->returnData()['price'];
        $timestamp = strtotime("now");
        $this->data['pay_time'] = date("Y-m-d H:i:s", $timestamp);
        $card = ['visa' => 'Visa', 'mastercard' => 'Mastercard', 'americanexpress' => 'American Express'];
        $this->data['method'] = $this->paymentdetail['method'] == "card" ? ("Credit card (" . $card[$this->paymentdetail['card']] . ")") : "Paypal";
    }
}
?>