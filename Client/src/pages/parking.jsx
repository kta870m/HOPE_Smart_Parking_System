import {useState,useEffect } from 'react'
import '@radix-ui/themes/styles.css'
import './parking.css'
import {Box, Text, Separator,Grid,Avatar, Flex,Card,ScrollArea,IconButton,TextField,Select,Dialog} from '@radix-ui/themes';
import Slot from '../components/slot.jsx'
import Loading from '../components/loading.jsx'
import BarChart from '../components/barchart.jsx'
import PieChart from '../components/piechart.jsx'
import ReservationForm from '../components/reservationform.jsx'
import AvailabilityPredictor from '../components/availabilitypredictor.jsx'
import Map from '../components/map.jsx'
import NavBar from '../components/navbar.jsx'
import VoiceInput from '../components/voiceinput.jsx'
import {MagnifyingGlassIcon, HomeIcon, SunIcon, OpacityIcon, EnvelopeClosedIcon, DiscordLogoIcon, TwitterLogoIcon, InstagramLogoIcon, DotsVerticalIcon, PlusIcon} from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom';
import {checkOverlap,getFormattedDate} from '../assets/functions';

function Parking(props) {
    const navigate = useNavigate();
    useEffect(() => {
        if(!props.customer){
            navigate('/auth/login/customer');
        }
    }, [props.customer]);

    const [space_list,setSpaceList] = useState([]);
    const [price,setPrice] = useState(0);

    function addSpace(id){
        if(space_list.filter(s => s == id).length > 0){
            setSpaceList(space_list.filter(s => s != id));
            setPrice(price - parseFloat(props.vehicle_types[props.parking_spaces[id].vehicle_type].price));
        }
        else{
            setSpaceList([...space_list,id]);
            setPrice(price + parseFloat(props.vehicle_types[props.parking_spaces[id].vehicle_type].price));
        }
    }
    useEffect(() => {
        setSpaceList([]);
        setPrice(0);
    }, [props.location]);

    const activities = [['12/06/2024', '3'],['12/06/2024', '4'],['12/06/2024', '2'],['12/06/2024', '3'],['12/06/2024', '6'],['12/06/2024', '5'],['12/06/2024', '3'],['12/06/2024', '4'],['12/06/2024', '3'],['12/06/2024', '1']];
    const activitydisplay = true ? 
    <BarChart values = {activities} quantifier="reservations"></BarChart> :
    <Loading></Loading>;

    const spacedisplay = props.location && props.location.parking_spaces ? 
    <Grid columns="1" gap="4" rows="repeat(0, 5px)" width="auto">
        {Object.keys(props.vehicle_types).length > 0 ? props.location.parking_spaces.filter(p => p).map((space,index) => <Slot key={index} space={props.parking_spaces[space]} reservations={props.reservations} reservation_book={props.reservation_book} vehicle_types={props.vehicle_types} addSpace={addSpace}></Slot>) : null}
    </Grid> :
    <Loading></Loading>;

    const locationdisplay = props.location ?
    <Card className='sidecontent' size='1'>
    <Grid columns="1" gap="0" rows="repeat(0, 5px)" width="auto">
        <Flex className='flex' gap="3" align="center">
            <Avatar
                size="5"
                src={"/location/swinburne.jpg"}
                fallback="L"
            />
            <Box style={{width:5000}}>
                <Text as="div" size="2" weight="bold" style={{marginBottom:5}}>
                    {props.location.name}
                </Text>
                <Text as="div" size="1" color="gray">
                    <HomeIcon className='icon'></HomeIcon> {props.location.address}
                </Text>
            </Box>
            <Text color="gray"><DotsVerticalIcon width="20" height="20"></DotsVerticalIcon></Text>
        </Flex>
    </Grid>
    <Grid columns="5" gap="0" rows="repeat(0, 5px)" width="auto">
        <Box>
            <Text as="div" size="2" weight="bold" align="center">Slots</Text>
            <Text as="div" size="2" color="gray" align="center">{props.location.parking_spaces.length}</Text>
        </Box>
        <Separator orientation="vertical" style={{margin:"auto"}}></Separator>
        <Box>
            <Text as="div" size="2" weight="bold" align="center">Cost</Text>
            <Text as="div" size="2" color="gray" align="center">$<Text size="2" weight="medium" style={{color:"green"}}>0.99</Text> - <Text size="2" weight="medium" style={{color:"green"}}>4.49</Text> / hour</Text>
        </Box>
        <Separator orientation="vertical" style={{margin:"auto"}}></Separator>
        <Box>
            <Text as="div" size="2" weight="bold" align="center">Distance</Text>
            <Text as="div" size="2" color="gray" align="center">2Km</Text>
        </Box>
    </Grid>
    </Card>:
    <Loading></Loading>



    return (
        <>
        {props.customer ?
        <>
        <NavBar accountid={props.accountid} inboxid={props.inboxid} height={props.height} logout={props.logout} page="parking"></NavBar>
        <div className="row" style={{marginTop:20}}>
            <div className='col-lg-3 d-none d-lg-block' display="block">
                <ScrollArea scrollbars="vertical" style={{ height: props.height -70 }}>
                    <Card className='sidecontent' size='1'>
                        <Text size="5">Availability</Text>
                        <Separator className='separator' size="4"></Separator>
                        
                        <Dialog.Root>
                            <Dialog.Trigger>
                                <Box style={{ height: 200 }}>
                                {props.location && props.location.parking_spaces ? <PieChart value={props.location.parking_spaces.map(p => checkOverlap(props.parking_spaces[p].schedule.map(r => props.reservations[r]).filter(r => r), new Date())).filter(r => r > 0).length} full={props.location.parking_spaces.length}></PieChart> :
                                <PieChart value={0} full={1}></PieChart>}
                                </Box>
                            </Dialog.Trigger>
                            <Dialog.Content maxWidth="600px" size="1">
                                <AvailabilityPredictor location={props.location} parking_spaces={props.parking_spaces} reservations={props.reservations}></AvailabilityPredictor>
                            </Dialog.Content>
                        </Dialog.Root>
                        
                    </Card>
                    <Card className='sidecontent' size='1'>
                        <Text size="5">Recent Reservations</Text>
                        <Separator className='separator' size="4"></Separator>
                        <Box style={{ height: 120 }}>
                            {activitydisplay}
                        </Box>
                    </Card>
                    <Card className='sidecontent' size='1'>
                        <Text size="5">Contacts</Text>
                        <Separator className='separator' size="4"></Separator>
                        <Grid columns="4" gap="4" rows="repeat(0, 5px)" width="auto" className='sidecontent'>
                            <EnvelopeClosedIcon className='contact'></EnvelopeClosedIcon>
                            <DiscordLogoIcon className='contact'></DiscordLogoIcon>
                            <TwitterLogoIcon className='contact'></TwitterLogoIcon>
                            <InstagramLogoIcon className='contact'></InstagramLogoIcon>
                        </Grid>
                        <Text size="1">© 2024 Hakl.</Text>
                    </Card>
                </ScrollArea>
            </div>
            <div className='col-lg-6 col-md-8' display="block">
                <ScrollArea scrollbars="vertical" style={{ height: props.height -70 }}>
                    <Grid columns="2" gap="6" rows="repeat(0, 5px)" width="auto">
                    <Flex className='sidecontent' gap="1">
                        <TextField.Root placeholder="Search a location…" size="2" style={{ width: 5000 }} >
                            <TextField.Slot>
                                <HomeIcon height="16" width="16" />
                            </TextField.Slot>
                            <TextField.Slot>
                                <VoiceInput></VoiceInput>
                            </TextField.Slot>
                        </TextField.Root>
                        <IconButton>
                            <MagnifyingGlassIcon width="18" height="18" onClick={()=>{console.log(props.location)}}/>
                        </IconButton>
                    </Flex>
                    <Select.Root defaultValue="all">
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Group>
                            <Select.Label>Vehicles</Select.Label>
                            <Select.Item value="all">All vehicles</Select.Item>
                                {Object.keys(props.vehicle_types).length > 0 ? Object.keys(props.vehicle_types).map((key,index) => <Select.Item key={index} value={props.vehicle_types[key].id}><Avatar size="1" src={"/vehicle/" + props.vehicle_types[key].id +".png"} fallback="L"></Avatar> {props.vehicle_types[key].name}</Select.Item>) : null}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                    </Grid>
                        {Object.keys(props.locations).length > 0 ? <Map locations={props.locations} location={props.location} changeLocation={props.changeLocation}></Map> : null}
                    {locationdisplay}
                </ScrollArea>
            </div>
            <div className='col-lg-3 col-md-4' display="block">
                <ScrollArea scrollbars="vertical" style={{ height: props.height -70 }}>
                    <Card className='sidecontent' size='1'>
                        <Text size="5">Slots</Text>
                        <Separator className='separator' size="4"></Separator>
                        { space_list.length > 0 ?
                        <Flex className='flex' justify="center">
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <IconButton radius="full" size="1">
                                        <PlusIcon />
                                    </IconButton>
                                </Dialog.Trigger>
                                <Dialog.Content maxWidth="600px" size="1">
                                    <ReservationForm name="Booking" function={props.reservation_book} value={space_list} price={price} vehicle_types={props.vehicle_types} hourduration="01" minuteduration="00" date={getFormattedDate().split(' ')[0].replace(/\//g, '-')} hourtime={getFormattedDate().split(' ')[1].split(":")[0]} minutetime={getFormattedDate().split(' ')[1].split(":")[1]} description={""}></ReservationForm>
                                </Dialog.Content>
                            </Dialog.Root>
                        </Flex> : null
                        }
                        {spacedisplay}
                    </Card>
                </ScrollArea>
            </div>
        </div>
        </> : null}
        </>
    )
}

export default Parking
