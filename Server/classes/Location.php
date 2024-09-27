<?php
include_once("Connection.php");
include_once("ParkingSpaceRepo.php");
include_once("ParkingSpace.php");
class Location{
    private $id;
    private $name;
    private $address;
    private $longtitude;
    private $latitude;
    private $parking_spaces = [];
    
    private $repo;

    public function __construct($id, $name, $address,$longtitude,$latitude) {
        $this->id = $id;
       $this->name = $name;
       $this->address = $address;
       $this->longtitude = $longtitude;
       $this->latitude = $latitude;

       $this->repo = new ParkingSpaceRepo();
    }

    //break down data to array format to be easily converted to JSON
    public function returnData() {
        $subdata = [];
        foreach($this->parking_spaces as $s){
            $subdata[] = $s->returnData();
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'longtitude' => $this->longtitude,
            'latitude' => $this->latitude,
            'parking_spaces' => $subdata,
        ];
    }

    // get all spaces in this location
    public function getSpaces(){
        $id = $this->id;
        $list = $this->repo->readInLocation($id);
        $spaces = [];
        foreach($list as $data){
            $space = new ParkingSpace($data['id'], $data['name'], $data['vehicle_type']);
            $space->getSchedule();
            $spaces[] = $space;
        }
        $this->parking_spaces = $spaces;
    }

    //add a space to this location
    public function addSpaces($name, $vehicle_type){
        $id = $this->id;
        $id = $this->repo->create("parking_space","name,location_id,vehicle_type","('$name','$id', '$vehicle_type')");
        $space = new ParkingSpace($id, $name, $vehicle_type);
        return $space;
    }
}
?> 