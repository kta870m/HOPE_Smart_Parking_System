<?php
include_once("Connection.php");
class ParkingSpaceRepo{
    private $connection;
    private $table = "parking_space";
    public function __construct() {
        $this->connection = Connection::getInstance();
    }

    //all spaces in a location
    public function readInLocation($id){
        return $this->connection->read($this->table,"*","location_id = '$id'");
    }

    //all spaces reserved in a reservation
    public function readInReservation($id){
        return $this->connection->read($this->table,"*","id IN (SELECT space_id FROM reserved_space WHERE reservation_id = '$id')");
    }

    //all spaces with id in list
    public function readFromList($spaces){
        $list = '(';
        foreach($spaces as $id){
            $list .= $list == '(' ? '' : ', ';
            $list .= $id;
        }
        $list .= ')';
        return $this->connection->read($this->table,"*","id IN $list");
    }
}
?>