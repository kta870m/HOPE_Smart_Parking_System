<?php
include_once("Connection.php");
class ParkingSpace{
    private $id;
    private $name;
    private $vehicle_type;
    private $schedule;

    public function __construct($id, $name, $vehicle_type) {
        $this->id = $id;
       $this->name = $name;
       $this->vehicle_type = $vehicle_type;
    }

    //breakdown data to array to convert to JSON
    public function returnData() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'vehicle_type' => $this->vehicle_type,
            'schedule' => $this->schedule,
        ];
    }

    //get the occupied time periods
    public function getSchedule(){
        $schedule = Connection::getInstance()->read("reservation", "id, start_time, duration", "id IN (SELECT reservation_id FROM reserved_space WHERE space_id = '$this->id')");
        $this->schedule = $schedule;
        return $schedule;
    }
}
?>