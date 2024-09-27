<?php
function validate(&$error, $condition,$message,$key){ //add error message and return false if condition is not met
    if($condition){
        return true;
    }
    else{
        if(!isset($error[$key])){
            $error[$key] = array();
        }
        $error[$key][] = $message;
        return false;
    }
}
?>