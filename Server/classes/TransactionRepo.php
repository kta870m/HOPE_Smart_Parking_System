<?php
include_once("Connection.php");
class TransactionRepo{
    private $connection;
    private $table = "transaction";
    public function __construct() {
        $this->connection = Connection::getInstance();
    }

    //create a transaction record of a reservation
    public function create($reservation_id,$paytime,$cost){
        $this->connection->create($this->table,"reservation_id,pay_time,ammount","('$reservation_id','$paytime','$cost')");
        return $this->connection->maxID($this->table);
    }

    //read all transaction records of a reservation
    public function read($id){
        return $this->connection->read($this->table,"pay_time, ammount", "reservation_id = '$id'");
    }

}
?>