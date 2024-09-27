<?php
include_once("Connection.php");
class PersonRepo{
    private $connection;
    private $table;
    public function __construct($type) {
        $this->table = $type;
        $this->connection = Connection::getInstance();
    }

    //create an account record
    public function create($email,$username, $password,$date){
        $this->connection->create($this->table,"email,name,password,start_date","('$email','$username', '$password','$date')");
        return $this->connection->maxID($this->table);
    }

    //read an account with input email and password for login
    public function read($email,$password){
        return $this->connection->read($this->table, "id, email, name, start_date, address", "email = '$email' AND password = '$password'");
    }

    //check if email is unique
    public function emailNotTaken($email){
        return sizeof($this->connection->read($this->table,"id","email = '$email'")) == 0;
    }
}
?>