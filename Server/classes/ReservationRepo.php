<?php
include_once("Connection.php");
class ReservationRepo{
    private $connection;
    private $table1 = "reservation";
    private $table2 = "reserved_space";
    public function __construct() {
        $this->connection = Connection::getInstance();
    }

    //create a reservation record
    public function create($customer_id, $booktime, $time, $duration, $description){
        $this->connection->create($this->table1,"customer_id,book_time,start_time,duration,description", "('$customer_id','$booktime', '$time', '$duration', '$description')");
        return $this->connection->maxID($this->table1);
    }

    //create records for reserved_space of a reservation
    public function createAssociate($list){
        return $this->connection->create($this->table2,"reservation_id,space_id",$list);
    }

    //read all reservation of a customer
    public function read($id){
        return $this->connection->read($this->table1,"*","customer_id = $id");
    }

    //update a reservation record
    public function update($customer_id, $id, $time, $duration, $description){
        return $this->connection->update($this->table1, "start_time = '$time', duration = '$duration', description = '$description'", "id = $id AND customer_id = $customer_id");
    }

    //delete reservation records
    public function delete($ids,$customer_id){
        $list = '(';
        foreach($ids as $id){
            $list .= $list == '(' ? '' : ', ';
            $list .= $id;
        }
        $list .= ')';
        $result1 = $this->connection->delete($this->table1, "id IN $list AND customer_id = $customer_id");
        $result2 = $this->connection->delete($this->table2, "reservation_id IN (SELECT id FROM reservation WHERE id IN $list AND customer_id = $customer_id)");
        return $result1 && $result2;
    }
}
?>