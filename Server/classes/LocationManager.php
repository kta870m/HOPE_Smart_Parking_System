<?php
include_once("LocationRepo.php");
include_once("Location.php");
class LocationManager{
    private $repo;
    private $locations = [];

    public function __construct() {
        $this->repo = new LocationRepo();
    }

    //breakdown all locations to array to convert to JSON
    public function returnData() {
        $subdata = [];
        foreach($this->parking_spaces as $s){
            $subdata[] = $s->returnData([]);
        }
        return [
            'locations' => $subdata,
        ];
    }

    //get all location in the entire system
    public function getLocations(){
        $list = $this->repo->read();
        $spaces = [];
        foreach($list as $data){
            $spaces[] = new Location($data['id'], $data['name'], $data['address'], $data['longtitude'], $data['latitude']);
        }
        $this->parking_spaces = $spaces;
    }

    //add another loaction to the system
    public function addLocations($name, $address,$longtitude,$latitude){
        Connection::getInstance()->create("location","name,address,longtitude,latitude","('$name', '$address','$longtitude','$latitude')");
        $id = Connection::getInstance()->read("location","Max(id) as newid","")[0]['newid'];
        $space = new Location($id, $name, $address,$longtitude,$latitude);
        return $space;
    }
}
?> 