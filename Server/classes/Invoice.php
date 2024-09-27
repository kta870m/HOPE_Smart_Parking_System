<?php
include_once("TransactionDocument.php");
class Invoice extends TransactionDocument{
    public function __construct($customer,$reservation) {
        parent::__construct($customer,$reservation);
    }

    //informations needed for an invoice
    public function create(){
        $this->data['customer'] = $this->customer->returnData();
        $this->data['spaces'] = $this->reservation->returnData()['parking_spaces'];
        $this->data['duration'] = $this->reservation->returnData()['duration'];
        $this->data['total_price'] = $this->reservation->returnData()['price'];
        $this->data['due'] = $this->reservation->returnData()['start_time'];
    }
}
?>