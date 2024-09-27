<?php
include_once("Connection.php");
class VehicleTypeRepo{
    private $connection;
    private $table = "vehicle_type";
    public function __construct() {
        $this->connection = Connection::getInstance();
    }

    //read all vehicle types supported by the system
    public function read(){
        return $this->connection->read($this->table,"*","");
    }

    //get a list of vehicle type prices
    public function readPrice(){
        return $this->connection->read($this->table,"id, price","");
    }
}
?>