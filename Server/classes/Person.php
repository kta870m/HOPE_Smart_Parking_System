<?php
class Person{
    protected $id;
    protected $email;
    protected $username;
    protected $start_date;
    protected $address;

    public function __construct($id, $email, $username, $start_date, $address) {
        $this->id = $id;
       $this->email = $email;
       $this->username = $username;
       $this->start_date = $start_date;
       $this->address = $address;
    }

    //breakdown data to array to be converted to JSON
    public function returnPersonData() {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'username' => $this->username,
            'start_date' => $this->start_date,
            'address' => $this->address,
        ];
    }

    public function updateData($name, $address, $longtitude, $latitude) {
        $this->name = $name ? $name : $this->name;
        $this->address = $address ? $address : $this->address;
        $this->longtitude = $longtitude ? $longtitude : $this->longtitude;
        $this->latitude = $latitude ? $latitude : $this->latitude;
    }
}
?>