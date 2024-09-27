import { useState,useRef, useEffect } from 'react'
import '@radix-ui/themes/styles.css'
import './dashboard.jsx'
import {Box, Text, Avatar, Dialog, Tabs, Button, Separator,Grid,Select, Flex,Card,ScrollArea,IconButton,TextField,Switch} from '@radix-ui/themes';

import Loading from '../components/loading.jsx'
import BarChart from '../components/barchart.jsx'
import LicensePlateRecognition from '../components/LicensePlateRecognition.jsx'
import PieChart from '../components/piechart.jsx'
import Location from '../components/location.jsx'
import AdminSlot from '../components/adminslot.jsx'
import NavBar from '../components/navbar.jsx'
import {MagnifyingGlassIcon, LockClosedIcon,CalendarIcon, EnvelopeClosedIcon,LockOpen1Icon,PersonIcon,Pencil2Icon, ResetIcon, DiscordLogoIcon, TwitterLogoIcon, InstagramLogoIcon} from '@radix-ui/react-icons'
import { useParams,useNavigate } from 'react-router-dom';

function Admin(props) {
    const navigate = useNavigate();
    useEffect(() => {
        if(!props.admin){
            navigate('/auth/login/admin');
        }
    }, [props.admin]);
    
    const [locationname,setLocationName] = useState();
    const [address,setAddress] = useState();
    const [longtitude,setLongtitude] = useState();
    const [latitude,setLatitude] = useState();

    const [spacename,setSpaceName] = useState();
    const [location_id,setLocationID] = useState();
    const [vehicle_type,setVehicleType] = useState();
    const handleInputChange = (event,setter) => {
        setter(event.target.value);
        console.log(event.target.value);
    };
    
    return (
        <>
        <NavBar accountid={props.accountid} inboxid={props.inboxid} height={props.height} logout={props.logout} page="account"></NavBar>
        <div className="row" style={{marginTop:20}}>
        <ScrollArea scrollbars="vertical" style={{ height: props.height -70 }}>
                    <Card className='apost' size='1'>
                    <Tabs.Root defaultValue="accounts">
                        <Tabs.List justify="center">
                            <Tabs.Trigger value="locations">Locations</Tabs.Trigger>
                            <Tabs.Trigger value="slots">Slots</Tabs.Trigger>
                            <Tabs.Trigger value="vehicles">Vehicles</Tabs.Trigger>
                            <Tabs.Trigger value="license">License</Tabs.Trigger>
                        </Tabs.List>

                        <Box pt="3">
                            <Tabs.Content value="locations">
                                <Flex gap="2" style={{marginBottom:10}}>
                                <TextField.Root placeholder="" size="2" style={{ width: "auto" }} value={locationname} onChange={(e) => handleInputChange(e,setLocationName)}>
                                    <TextField.Slot>h</TextField.Slot>
                                </TextField.Root>
                                <TextField.Root placeholder="" size="2" style={{ width: "auto" }} value={address} onChange={(e) => handleInputChange(e,setAddress)}>
                                    <TextField.Slot>h</TextField.Slot>
                                </TextField.Root>
                                <TextField.Root placeholder="" size="2" style={{ width: "auto" }} value={longtitude} onChange={(e) => handleInputChange(e,setLongtitude)}>
                                    <TextField.Slot>lng</TextField.Slot>
                                </TextField.Root>
                                <TextField.Root placeholder="" size="2" style={{ width: "auto" }} value={latitude} onChange={(e) => handleInputChange(e,setLatitude)}>
                                    <TextField.Slot>lat</TextField.Slot>
                                </TextField.Root>
                                <Button onClick={() => props.location_add(locationname,address,longtitude,latitude)}>Add</Button>
                                </Flex>
                                <Grid columns="1" gap="4" rows="repeat(0, 5px)" width="auto">
                                    {props.locations ? Object.keys(props.locations).map((key,index) => <Location key={index} location={props.locations[key]}></Location>) : null}
                                </Grid>
                            </Tabs.Content>

                            <Tabs.Content value="slots">
                            <Flex gap="2" style={{marginBottom:10}}>
                                <TextField.Root placeholder="" size="2" style={{ width: "auto" }} value={spacename} onChange={(e) => handleInputChange(e,setSpaceName)}>
                                    <TextField.Slot>h</TextField.Slot>
                                </TextField.Root>
                                <Select.Root value={location_id} onChange={(e) => handleInputChange(e,setLocationID)}>
                                <Select.Trigger />
                                    <Select.Content>
                                        <Select.Group>
                                        <Select.Label>Vehicles</Select.Label>
                                            {Object.keys(props.locations).length > 0 ? Object.keys(props.locations).map((key,index) => <Select.Item key={index} value={props.locations[key].id}>{props.locations[key].name}</Select.Item>) : null}
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>
                                <Select.Root defaultValue="1">
                                <Select.Trigger />
                                    <Select.Content>
                                        <Select.Group>
                                        <Select.Label>Vehicles</Select.Label>
                                            {Object.keys(props.vehicle_types).length > 0 ? Object.keys(props.vehicle_types).map((key,index) => <Select.Item key={index} value={props.vehicle_types[key].id}><Avatar size="1" src={"/vehicle/" + props.vehicle_types[key].id +".png"} fallback="L"></Avatar> {props.vehicle_types[key].name}</Select.Item>) : null}
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>
                                <Button onClick={() => props.parkingspace_add(spacename,location_id,vehicle_type)}>Add</Button>
                                </Flex>
                                <Grid columns="1" gap="4" rows="repeat(0, 5px)" width="auto">
                                    {props.parking_spaces ? Object.keys(props.parking_spaces).map((key,index) => <AdminSlot key={index} space={props.parking_spaces[key]} cost={props.vehicle_types[props.parking_spaces[key].vehicle_type].price}></AdminSlot>) : null}
                                </Grid>
                            </Tabs.Content>

                            <Tabs.Content value="vehicles">
                            <Text size="2">Edit your profile or update contact information.</Text>
                            </Tabs.Content>

                            <Tabs.Content value="license">
                                <LicensePlateRecognition />
                            </Tabs.Content>
                        </Box>
                        </Tabs.Root>
                    </Card>
                    {}
                </ScrollArea>
        </div>
        </>
    )
}

export default Admin
