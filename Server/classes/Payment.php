<?php
include_once("TransactionRepo.php");
include_once("PaymentMethod.php");
include_once("Receipt.php");
class payment{
    private $cost;
    private $method;
    private $repo;

    public function __construct($cost, $method) {
        $this->cost = $cost;
       $this->method = $method;
       $this->repo = new TransactionRepo();
    }

    //create transaction record adn receipt if payment succeeded
    public function pay($customer,$reservation,$paymentdetail) {
        if($this->cost > 0){
            $result = $this->method->processPayment($this->cost, $paymentdetail);
            if($result === true){
                $reservation_id = $reservation->returnData()['id'];
                $timestamp = strtotime("now");
                $paytime = date("Y-m-d H:i:s", $timestamp);
                $this->repo->create($reservation_id, $paytime, $this->cost);
                $receipt = new Receipt($customer,$reservation,$paymentdetail);
                $receipt->create();
                return ['transaction'=>['reservation_id' => $reservation_id, 'pay_time' => $paytime,'ammount' => $this->cost], 'receipt' => $receipt->send()];
            }
            else{
                return $result;
            }
        }
        return null;
    }

}
?>