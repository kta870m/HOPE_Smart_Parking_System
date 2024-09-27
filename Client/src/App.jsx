import { useEffect, useState, useRef } from 'react'
import './assets/framework/css/bootstrap.css'
import '@radix-ui/themes/styles.css'
import './App.css'
import {BrowserRouter,Route,Routes,Link} from "react-router-dom"
import {Theme, Box, Text, Dialog, TextArea, Button,IconButton,Flex,AlertDialog} from '@radix-ui/themes';

import Parking from "./pages/parking.jsx"
import Home from "./pages/home.jsx"
import Dashboard from "./pages/dashboard.jsx"
import Login from "./pages/login.jsx"
import Signup from "./pages/signup.jsx"
import {ImageIcon,FaceIcon, Cross2Icon} from '@radix-ui/react-icons'
import Admin from './pages/admin.jsx'
//import CallPHP from './pages/admin.jsx'
function App() {
  
  const CallPHP = async (dataToSend,file,setter) => {
    const formData = new FormData();
    formData.append('image', dataToSend['image']);
    formData.append('data', JSON.stringify(dataToSend));
    const response = await fetch('http://localhost/Server/' + file + '.php', {//php function path
        credentials: 'include',method: 'POST',headers: {'Accept': 'application/json',},body: formData,//JSON.stringify(dataToSend),
    });
    if (response.ok) {
        const data = await response.json();// output
        if(setter){
          setter(data);
        }
    } else {
        console.error('Bad Request');
        return null;
    }
}

  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    window.addEventListener("resize", handleresize);
    return() =>{
        window.removeEventListener("resize", handleresize);
    }
  }, []);
function handleresize(){
    setHeight(window.innerHeight);
}

  const [customer, setCustomer] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [history, setHistory] = useState([]);
  
  const [locations, setLocations] = useState({});
  const [locationID, setLocationID] = useState();
  const [vehicle_types, setVehicleTypes] = useState({});

  const [parking_spaces, setParkingSpaces] = useState({});
  const [reservations, setReservations] = useState({});
  

  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleInputChange = (event) => {
    setPostContent(event.target.value);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
      CallPHP({},'customer_info',setCustomer);
      CallPHP({},'admin_info',setAdmin);
  }, []);

  useEffect(() => {
    if(customer || admin){
      CallPHP({},'vehicletype_get',(data)=>{update(vehicle_types,setVehicleTypes,data,[]);});
      CallPHP({},'location_get',(data)=>{
        update(locations,setLocations,data,[]);
        changeLocation(1);
      });
    }
    if(customer){
      CallPHP({},'reservation_get',(data)=>{
        let newhistory = [];
        data.reservations.map(r => {
          if (!newhistory.includes(r.id)) {
            newhistory.push(r.id);
          }
          update(parking_spaces,setParkingSpaces,r.parking_spaces,['name','vehicle_type']);
          r.parking_spaces = r.parking_spaces.map(s => s.id);
        });
        update(reservations,setReservations,data.reservations,[]);
        setHistory(newhistory);
      });
    }
  }, [customer, admin]);

  async function changeLocation(id) {
    setLocationID(null);
    await CallPHP({id:id},'parkingspace_get',(data)=>{
      data = data.map(p => {
        update(reservations,setReservations,p.schedule,[]);
        p.schedule = p.schedule.map(s => s.id);
        return p;
      });
      update(parking_spaces,setParkingSpaces,data,[]);
      let updatelocation = locations[id];
      updatelocation['parking_spaces'] = data.map(p => p.id);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${updatelocation.longtitude}&longitude=${updatelocation.latitude}&hourly=precipitation,cloudcover,temperature_2m&past_days=7`;
      setLocationID(updatelocation);
      fetch(url)
        .then(response => response.json())
        .then(data => {
          updatelocation.weather = data.hourly;
          setLocationID(updatelocation);
        })
    });
  }



function update(list,setter,objects,keys){
  let result = list;
  objects.map(object => {if(result[String(object.id)] == null){
    result[String(object.id)] = object;
  }
  else if(keys.length == 0){
    result[String(object.id)] = {...result[String(object.id)],...object};
  }
  else{
    keys.map(key => result[String(object.id)][key] = object[key] ? object[key] : result[String(object.id)][key]);
  }
 });
  setter(result);
}

function remove(list,setter,ids){
  let result = list;
  ids.map(id => {result[id] = null});
  setter(result);
}

  function customerlogin(_email,_password,setError){
    CallPHP({email: _email, password: _password},'customer_login',(data) => {if(data.id){setCustomer(data)}else{setError(data)}});
  }
  function adminlogin(_email,_password,setError){
    CallPHP({email: _email, password: _password},'admin_login',(data) => {console.log(data);if(data.id){setAdmin(data)}else{setError(data)}});
  }
  function signup(_email,_username,_password,_retypepassword,setError){
    CallPHP({email: _email, username: _username, password: _password, retypepassword: _retypepassword},'customer_signup',(data) => {if(data.id){setCustomer(data)}else{setError(data)}});
  }
  function logout(){
    CallPHP({},'logout',(data) => {setCustomer(null); setAdmin(null);});
  }
  function editaccount(_image,_username,_description,_password,_retypepassword){
    CallPHP({image: _image, username: _username, description: _description, password: _password, retypepassword: _retypepassword},'edit_account',null);
  }

  function location_add(name,address,longtitude,latitude){
    CallPHP({name: name, address: address, longtitude: longtitude, latitude: latitude},'location_add',(data) => {update(locations,setLocations,[data],[]); console.log(locations);});
  }
  function parkingspace_add(name,location_id,vehicle_type){
    CallPHP({name: name, location_id: location_id, vehicle_type: vehicle_type},'parkingspace_add',(data) => {update(parking_spaces,setParkingSpaces,[data],[]); console.log(parking_spaces);});
  }
  function vehicletype_add(_email,_username,_password,_retypepassword,setError){
    CallPHP({email: _email, username: _username, password: _password, retypepassword: _retypepassword},'customer_signup',(data) => {if(data.id){setCustomer(data)}else{setError(data)}});
  }

  function reservation_edit(id,time,duration,description,setInvoice,setError){
    CallPHP({id:id,time:time,duration:duration,description:description},'reservation_edit',(data)=>{
      if(data.id){
        update(reservations,setReservations,[data],['start_time','duration','price','description']);
      }
      else{
        setError(data);
      }
    });
  }
  function reservation_remove(ids){
    CallPHP({ids:ids},'reservation_remove',(data)=>{
      data.map(id =>{
        setHistory(history.filter(r => r != String(id)));
        let newreservations = reservations;
        newreservations[id] = null;
        setReservations[newreservations];
      });
    });
    console.log(history);
    console.log(reservations);
  }
  function reservation_book(spaces,time,duration,description,setInvoice,setError){
    CallPHP({id:spaces,time:time,duration:duration,description:description},'reservation_book',(data)=>{
      if(data.reservation){
        data.reservation.parking_spaces = data.reservation.parking_spaces.map(p => p.id);
        update(reservations,setReservations,[data.reservation],[]);
        data.reservation.parking_spaces.map(p => {if(parking_spaces[p].schedule){parking_spaces[p].schedule.push(data.reservation.id)}});
        setHistory([...history, data.reservation.id]);
        setInvoice(data.invoice);
      }
      else{
        setError(data);
      }
    });
  }
  function pay(reservation, paymentdetail,setReceipt,setError){
    CallPHP({reservation:reservation,paymentdetail:paymentdetail},'pay',(data)=>{
      console.log(data);
      if(data.transaction){
        let newreservations = reservations;
        newreservations[data.transaction['reservation_id']].transactions.push(data.transaction);
        setReservations(newreservations);
        setReceipt(data.receipt);
      }
      else{
        setError(data);
      }
    });
  }
 
  const imagepreview = selectedImage != null ?
  <Box>
    <IconButton className='removeimage' variant="outline" color='red'>
      <Cross2Icon  width="18" height="18" />
    </IconButton>
    <img className='imagepreview' src={preview} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
  </Box>:
  <></>;

  const location = locations[locationID];

  return (
    <BrowserRouter>
    <Theme className='theme' appearance={"dark"} accentColor="amber">
      <Box className='content'>
          <Routes>
            <Route path="/" element={<Home height={height}></Home>}></Route>
            <Route path="/parking" element={<Parking height={height} customer={customer} logout={logout} vehicle_types={vehicle_types} locations={locations} parking_spaces={parking_spaces} reservations={reservations} location={locationID} changeLocation={changeLocation} reservation_book={reservation_book}></Parking>}></Route>
            <Route path="/dashboard" element={<Dashboard height={height} customer={customer} logout={logout} vehicle_types={vehicle_types} reservations={reservations} parking_spaces={parking_spaces} history={history} reservation_edit={reservation_edit} reservation_remove={reservation_remove} pay={pay}></Dashboard>}></Route>
            <Route path="/auth/login/customer" element={<Login height={height} header="Customer Login" success="/parking" login={customerlogin} person={customer}></Login>}></Route>
            <Route path="/auth/login/admin" element={<Login height={height} header="Admin Login" success="/admin" login={adminlogin} person={admin}></Login>}></Route>
            <Route path="/auth/signup" element={<Signup height={height} signup={signup} customer={customer}></Signup>}></Route>
            <Route path="/admin" element={<Admin height={height} admin={admin} locations={locations} parking_spaces={parking_spaces} vehicle_types={vehicle_types} logout={logout} location_add={location_add} parkingspace_add={parkingspace_add}></Admin>}></Route>
          </Routes>
      </Box>
    </Theme>
    </BrowserRouter>
  )
}
export default App
//<Polygon className='animatedbackground' num='20' color="#008cff" />
