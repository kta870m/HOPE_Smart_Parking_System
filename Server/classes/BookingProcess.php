<?php
include_once("Reservation.php");
include_once("ParkingSpace.php");
include_once("ReservationRepo.php");
include_once("VehicleTypeRepo.php");
include_once("Customer.php");
include_once("Invoice.php");
include_once("include/functions.php");
class BookingProcess {
    private $reservationrepo;
    private $vehicletyperepo;
    private $reservation;

    public function __construct() {
        $this->reservationrepo = new ReservationRepo();
        $this->vehicletyperepo = new VehicleTypeRepo();
    }

    //book reservation, create invoice
    public function book($parking_spaces,$customer,$time,$duration,$description) {
        $timestamp = strtotime("now");
        $booktime = date("Y-m-d H:i:s", $timestamp);
        $this->reservation = new Reservation(0, $booktime, $time, $duration, $description);
        $this->reservation->setSpaces($parking_spaces);
        $error = $this->validate($time,$duration,$parking_spaces);
        if(sizeof($error) == 0){
            $pricelist = $this->vehicletyperepo->readPrice();
            $price = $this->reservation->getPrice($pricelist);
            $customer_id = $customer->returnData()['id'];
            $id = $this->reservationrepo->create($customer_id, $booktime, $time, $duration, $description);
            $this->reservation->setID($id);
            $associate = "";
            foreach($parking_spaces as $s){
                $associate .= $associate == "" ? '' : ', ';
                $sid= $s->returnData()['id'];
                $associate .= "($id, $sid)";
            }
            $this->reservationrepo->createAssociate($associate);
            $invoice = new Invoice($customer,$this->reservation);
            $invoice->create();
            return ['reservation' => $this->reservation, 'invoice' => $invoice->send()];
        }
        return $error;
    }

    //avoid user enter invalida data
    public function validate($time,$duration,$parking_spaces){
        $error = [];
        if(
        validate($error,preg_match('/^\d{4}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])\s([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/',$time) === 1,"Date time is in the wrong format","datetime") &&
        validate($error,is_numeric($duration),"Duration must be numeric","duration")){
            $parking_spaces = $this->reservation->filterSpaces($time,$duration);
            validate($error,sizeof($parking_spaces) > 0,"No parking spaces available in specified period","spaces");
        }
        return $error;
    }
}
?>