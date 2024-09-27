<?php
include_once("ReservationRepo.php");
include_once("VehicleTypeRepo.php");
include_once("Reservation.php");
include_once("include/functions.php");
class History{
    private $reservationrepo;
    private $vehicletyperepo;
    private $reservations;

    public function __construct() {
        $this->reservationrepo = new ReservationRepo();
        $this->vehicletyperepo = new VehicleTypeRepo();
    }

    public function returnData() {
        $subdata = [];
        foreach($this->reservations as $s){
            $subdata[] = $s->returnData();
        }
        return [
            'reservations' => $subdata,
        ];
    }

    public function reservations(){
        return $this->reservation;
    }

    //return list of Reservation for a customer
    public function getReservations($id){
        $list = $this->reservationrepo->read($id);
        $pricelist = $this->vehicletyperepo->readPrice();
        $reservations = [];
        foreach($list as $data){
            $reservation = new Reservation($data['id'], $data['book_time'], $data['start_time'], $data['duration'], $data['description']);
            $reservation->getSpaces();
            $reservation->getTransactions();
            $reservation->getPrice($pricelist);
            $reservations[] = $reservation;
        }
        $this->reservations = $reservations;
        return $this->reservations;
    }

    //edit reservation and recalculate price
    public function editReservation($customer_id, $id, $start_time, $duration, $description){
        $reservation = new Reservation($id, null, $start_time, $duration, $description);
        $parking_spaces = $reservation->getSpaces();
        $error = $this->validate($start_time, $duration,$parking_spaces,$reservation);
        if(sizeof($error) == 0){
            $run = $this->reservationrepo->update($customer_id, $id, $start_time, $duration, $description);
            $pricelist = $this->vehicletyperepo->readPrice();
            $reservation->getPrice($pricelist);
            return $reservation;
        }
        return $error;
    }

    //to ensure customer does not enter invalid data
    public function validate($time,$duration,$parking_spaces,$reservation){
        $error = [];
        $timeerror = validate($error,preg_match('/^\d{4}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])\s([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/',$time) === 1,"Date time is in the wrong format","datetime");
        $durationerror = validate($error,is_numeric($duration),"Duration must be numeric","duration");
        if($timeerror && $durationerror){
            $new = $reservation->filterSpaces($time,$duration);
            validate($error,true,"Some parking spaces are not available in specified period","spaces");
        }
        return $error;
    }

    //cancel a reservation
    public function removeReservations($ids, $customer_id){
        $run = $this->reservationrepo->delete($ids, $customer_id);
        if($run === true){
            return $ids;
        }
        return false;
    }
}
?>