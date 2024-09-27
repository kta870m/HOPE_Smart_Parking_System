<?php
include_once("PersonRepo.php");
include_once("include/functions.php");
abstract class PersonManager {
    private $persons;
    protected $table;
    private $repo;

    public function __construct($type) {
        $this->repo = new PersonRepo($type);
    }

    //make sure created account will always have valid data
    public function validate($email, $username, $password, $retypepassword){
        $error = array();
        if(validate($error, $email != "", "Email cannot be empty", "email")){
            if(validate($error, preg_match("/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/", $email), "Email is in the wrong format", "email")){
                validate($error,$this->repo->emailNotTaken($email),"Email was taken","email");
            }
        }
        if(validate($error, $username != "", "Username cannot be empty", "username")){
            validate($error,strlen($username) <= 30,"Username must contain maximum of 50 characters","username");
        }
        if(validate($error, $password != "", "Password cannot be empty", "password")){
            validate($error,strlen($password) <= 30,"Password must contain maximum of 50 characters","password");
            validate($error,preg_match('/[a-z]/', $password),"Password must contain a lower case character","password");
            validate($error,preg_match('/[A-Z]/', $password),"Password must contain an upper case character","password");
            validate($error,preg_match('/\d/', $password),"Password must contain a digit","password");
            validate($error,preg_match('/[@$!%*?&]/', $password),"Password must contain a special character","password");
            validate($error,strlen($password) >= 8,"Password must be at least 8 characters long","password");
        }
        validate($error, $retypepassword == $password, "Retype password does not match", "retypepassword");
        return $error;
    }
   
    //create account for signup
    public function createAccount($email, $username, $password, $retypepassword){
        $error = $this->validate($email, $username, $password, $retypepassword);
        if(sizeof($error) == 0){
            $date = date("Y-m-d");
            $id = $this->repo->create($email, $username, $password,$date);
            $person = $this->createPerson($id, $email, $username, $date, "");
            $_SESSION[$this->table .'_account'] = $person->returnData();
            return $person;
        }
        else{
            return $error;
        }
    }

    //check the existence of an account with entered email adn password
    public function loginAccount($email, $password){
        $error = array();
        $result = $this->repo->read($email, $password);
        validate($error, sizeof($result) == 1, "Incorrect email or password", "account");
        if(sizeof($error) == 0){
            $data = $result[0];
            $person = $this->createPerson($data['id'], $data['email'], $data['name'], $data['start_date'], $data['address']);
            $_SESSION[$this->table .'_account'] = $person->returnData();
            return $person;
        }
        else{
            return $error;
        }
    }

    //to be overriden by subclasses
    abstract public function createPerson($id, $email, $customer, $date, $address);
}
?>