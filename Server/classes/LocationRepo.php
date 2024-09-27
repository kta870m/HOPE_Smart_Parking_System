<?php
include_once("Connection.php");
class LocationRepo{
    private $connection;
    private $table = "location";
    public function __construct() {
        $this->connection = Connection::getInstance();
    }

    //create location record
    public function create(){
        return $this->connection->create($this->table,"*","");
    }

    //read all location records
    public function read(){
        return $this->connection->read($this->table,"*","");
    }

}
?>