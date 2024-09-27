<?php
        include("classes/Connection.php");
        $numadmin = 3;
        $numaccount = 10;
        $numlocation = 3;
        $numslot = 30;
        $numreservation = 200;
        $numreservedslot = 2000;
        $db = Connection::getInstance(); 
        $query = "INSERT INTO customer (email,name,password,start_date) VALUES ";
        for($i = 1; $i <= $numaccount;$i++){  // generate all friend records
            if($i > 1){
                $query .=",";
            }
            $timestamp = rand(strtotime("-40 days"), strtotime("-20 days"));
            $date = date("Y/m/d", $timestamp);
            $name = "User " . $i;
            $email = "user". $i . "@gmail.com";
            $pw = "User" . $i ."@123";
            $query .= "('$email','$name','$pw','$date')";
        }
        $db->runQuery($query);

        $query = "INSERT INTO admin (email,name,password,start_date) VALUES ";
        for($i = 1; $i <= $numadmin;$i++){  // generate all friend records
            if($i > 1){
                $query .=",";
            }
            $timestamp = rand(strtotime("-40 days"), strtotime("-20 days"));
            $date = date("Y/m/d", $timestamp);
            $name = "Admin " . $i;
            $email = "admin". $i . "@gmail.com";
            $pw = "Admin" . $i ."@123";
            $query .= "('$email','$name','$pw','$date')";
        }
        $db->runQuery($query);


        $query = "INSERT INTO location (name,address,longtitude,latitude) VALUES ";
        for($i = 1; $i <= $numlocation;$i++){  // generate all friend records
            if($i > 1){
                $query .=",";
            }
            $name = "Location " . $i;
            $address = "Address" . $i;
            $longtitude = rand(0,100) * 0.0015 + 20.96;
            $latitude = rand(0,100) * 0.0015 + 105.78;
            $query .= "('$name','$address','$longtitude','$latitude')";
        }
        $db->runQuery($query);


        $query = "INSERT INTO parking_space (name,location_id,vehicle_type) VALUES ";
        for($i = 1; $i <= $numslot;$i++){  // generate all friend records
            if($i > 1){
                $query .=",";
            }
            $name = "Slot " . $i;
            $location_id = rand(1,$numlocation);
            $vehicle_type = rand(1,6);
            $query .= "('$name','$location_id','$vehicle_type')";
        }
        $db->runQuery($query);


        $query1 = "INSERT INTO reservation (customer_id,book_time,start_time,duration,description) VALUES ";
        $query2 = "INSERT INTO transaction (reservation_id,pay_time,ammount) VALUES ";
        for($i = 1; $i <= $numreservation; $i++){  // generate all friend records
            if($i > 1){
                $query1 .=",";
                $query2 .=",";
            }
            $customer_id = rand(1,$numaccount);
            $timestamp = strtotime("- 8 days +". $i * 3 . " hours");
            $time = date("Y-m-d H:i:s", $timestamp);
            $booktimestamp = rand(strtotime("- 20 days"), strtotime("- 10 days"));
            $booktime = date("Y-m-d H:i:s", $booktimestamp);
            $description = "Reservation " . $i;
            $query1 .= "('$customer_id','$booktime','$time','180','$description')";

            
            $query2 .= "('$i','$booktime', 1000)";
        }
        $db->runQuery($query1);
        $db->runQuery($query2);


        $pairs = array();
        $pair = null;
        while(count($pairs) <= $numreservedslot) { // create all the friend pairs
            while($pair == null || in_array($pair, $pairs)){
                $pair = array(rand(1,$numreservation), rand(1,$numslot));
            }
            $pairs[] = $pair;
        }
        $query = "INSERT INTO reserved_space (reservation_id,space_id) VALUES ";
        for($i = 0; $i < sizeof($pairs) ; $i++){  // generate all friend records
            if($i > 0){
                $query .=",";
            }
            $reservation_id = $pairs[$i][0];
            $space_id = $pairs[$i][1];
            $query .= "('$reservation_id','$space_id')";
        }
        $db->runQuery($query);

        $query = "INSERT INTO vehicle_type (name,price) VALUES 
            ('Car', '2'),
            ('Bicycle', '1'),
            ('Motorcycle', '1.5'),
            ('Electric Car', '2.5'),
            ('Truck', '4.5'),
            ('Van', '3')
        ";
        $db->runQuery($query);
?>