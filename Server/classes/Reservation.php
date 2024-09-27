<?php
include_once("ParkingSpace.php");
include_once("ParkingSpaceRepo.php");
include_once("TransactionRepo.php");
class Reservation{
    private $id;
    private $book_time;
    private $start_time;
    private $duration;
    private $description;
    private $price = 0;
    private $parking_spaces = [];
    private $transactions = [];

    private $parkingspacerepo;
    private $transactionrepo;

    public function __construct($id, $book_time, $start_time, $duration, $description) {
        $this->id = $id;
        $this->book_time = $book_time;
       $this->start_time = $start_time;
       $this->duration = $duration;
       $this->description = $description;
       $this->parkingspacerepo = new ParkingSpaceRepo();
       $this->transactionrepo = new TransactionRepo();
    }

    //breakdown data to be converted to JSON
    public function returnData() {
        $subdata = [];
        foreach($this->parking_spaces as $s){
            $subdata[] = $s->returnData([]);
        }
        return [
            'id' => $this->id,
            'book_time' => $this->book_time,
            'start_time' => $this->start_time,
            'duration' => $this->duration,
            'description' => $this->description,
            'price' => $this->price,
            'transactions' => $this->transactions,
            'parking_spaces' => $subdata,
        ];
    }

    //change id, used in BookingProcess
    public function setID($id) {
        $this->id = $id;
    }

    //calculate the price from all parkingSpace instances and duration
    public function getPrice($pricelist){
        foreach($this->parking_spaces as $space){
            foreach($pricelist as $p){
                if($space->returnData()['vehicle_type'] == $p['id']){
                    $this->price += $p['price'];
                }
            }
        }
        $this->price *= ($this->duration / 60);
        return $this->price;
    }

    //get all transaction made for this reservation
    public function getTransactions(){
        $id = $this->id;
        $this->transactions = $this->transactionrepo->read($id);
        return $this->transactions;
    }

    //calculate the amount owe
    public function getDebt(){
        $debt = $this->price;
        foreach($this->transactions as $transaction){
            $debt -= $transaction['ammount'];
        }
        return $debt;
    }

    //set the list of ParkingSpace
    public function setSpaces($spaces){
        $this->parking_spaces = $spaces;
    }

    //return the list of only the parking spaces available in input time period
    public function filterSpaces($time, $duration){
        $book_start = new DateTime($time);
        $book_end = clone $book_start;
        $book_end->modify("+$duration minutes");
        $result = [];
        foreach($this->parking_spaces as $space){
            $overllap = false;
            $schedule = $space->getSchedule();
            foreach($schedule as $period){
                if(!$overllap){
                    $start = new DateTime($period['start_time']);
                    $end = clone $start;
                    $length = $period['duration'];
                    $end->modify("+$length minutes");
                    if($book_start < $end && $start < $book_end){
                        $overllap = true;
                    }
                }
            }
            if(!$overllap){
                $result[] = $space;
            }
        }
        $this->parking_spaces = $result;
        return $result;
    }

    //get all spaces reserved by this reservation
    public function getSpaces(){
        $id = $this->id;
        $list = $this->parkingspacerepo->readInReservation($id);
        $spaces = [];
        foreach($list as $data){
            $spaces[] = new ParkingSpace($data['id'], $data['name'], $data['vehicle_type']);
        }
        $this->parking_spaces = $spaces;
    }

}
?>