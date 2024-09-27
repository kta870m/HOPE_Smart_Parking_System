<?php
class Connection {
    // Hold the class instance.
    private static $instance = null;
    private $conn;

    // The constructor is private to prevent initiation with 'new'
    private function __construct() {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "smart_parking";

        // Create connection
        $this->conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
        else{
            include_once("include/createtables.php");
        }
    }

    // Get the database instance
    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new Connection();
        }
        return self::$instance;
    }

    // Get the database connection    
    public function runQuery($query) {
        $result = $this->conn->query($query);
        if($result === true){
            return $result;
        }
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        return $data;
    }

    public function create($table, $columns, $values) {
        $query = "INSERT INTO $table ($columns) VALUES $values";
        return $this->runQuery($query);
    }

    public function read($table, $columns, $condition) {
        $where = $condition ? "WHERE $condition" : "";
        $query = "SELECT $columns FROM $table $where";
        return $this->runQuery($query);
    }

    public function update($table, $columns, $condition) {
        $query = "UPDATE $table SET $columns WHERE $condition";
        return $this->runQuery($query);
    }

    public function delete($table, $condition) {
        $query = "DELETE FROM $table WHERE $condition";
        return $this->runQuery($query);
    }

    public function maxID($table) {
        return $this->read($table,"Max(id) as maxid","")[0]['maxid'];
    }

    // Prevent cloning of the instance
    private function __clone() {}

    // Prevent unserialization of the instance
    public function __wakeup() {}
}
?>