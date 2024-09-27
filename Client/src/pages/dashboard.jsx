import { useState,useRef, useEffect } from 'react'
import '@radix-ui/themes/styles.css'
import './dashboard.css'
import {Box, Text, Avatar, Dialog, TextArea, Button, Separator,Grid,SegmentedControl, Flex,Card,ScrollArea,IconButton,TextField,Switch} from '@radix-ui/themes';
import Reservation from '../components/reservation.jsx'
import Loading from '../components/loading.jsx'
import BarChart from '../components/barchart.jsx'
import PieChart from '../components/piechart.jsx'
import Calender from '../components/calender.jsx'
import NavBar from '../components/navbar.jsx'
import {CalendarIcon, HomeIcon, LockClosedIcon, EnvelopeClosedIcon,LockOpen1Icon,PersonIcon,Pencil2Icon, ResetIcon, DiscordLogoIcon, TwitterLogoIcon, InstagramLogoIcon, CheckCircledIcon, DotsVerticalIcon, EyeClosedIcon, TrashIcon} from '@radix-ui/react-icons'
import { useParams,useNavigate } from 'react-router-dom';

function Dashboard(props) {
    const navigate = useNavigate();
    useEffect(() => {
        if(!props.customer){
            navigate('/auth/login/customer');
        }
    }, [props.customer]);

    const [reservation_list,setReservationList] = useState([]);

    function addReservation(id){
        if(space_list.filter(s => s == id).length > 0){
            setReservationList(reservation_list.filter(s => s != id));
        }
        else{
            setReservationList([...reservation_list,id]);
        }
    }
    
    const username = useRef();
    const description = useRef();
    const password = useRef();
    const retypepassword = useRef();
    const handleUsernameChange = (event) => {
        username.current = event.target.value;
    };
    const handleDescriptionChange = (event) => {
        description.current = event.target.value;
    };
    const handlePasswordChange = (event) => {
        password.current = event.target.value;
    };
    const handleRetypePasswordChange = (event) => {
        retypepassword.current = event.target.value;
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };
    
    useEffect(() => {
        if(props.info){
            username.current = props.info['name'];
            description.current = props.info['description'];
        }
    }, [props.info]);
    
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
        // Do something with the selected file
        //console.log('Selected file:', fileName);
    };
    const handleFileButtonClick = () => {
        fileInputRef.current.click();
    };
    function revert(){
        username.current= "automatic";
        setPreview(null);
        setSelectedImage(null);
    }


    const [selectedValue, setSelectedValue] = useState('follower');

    // Handle changes when the user selects a different segment
    const handleSegmentChange = (newValue) => {
        console.log(newValue);
        setSelectedValue(newValue);
        // You can perform additional actions based on the selected value here
    };
    
    const activities = [['12/06/2024', '3'],['12/06/2024', '4'],['12/06/2024', '2'],['12/06/2024', '3'],['12/06/2024', '6'],['12/06/2024', '5'],['12/06/2024', '3'],['12/06/2024', '4'],['12/06/2024', '3'],['12/06/2024', '1']];
    const activitydisplay = true ? 
    <BarChart values = {activities} quantifier="reservations"></BarChart> :
    <Loading></Loading>;

    const reservationdisplay = props.history ? 
    <Grid columns="1" gap="4" rows="repeat(0, 5px)" width="auto">
        {Object.keys(props.vehicle_types).length > 0 ? props.history.filter(r => props.reservations[r]).map((r,index) => <Reservation key={index} reservation={props.reservations[r]} reservation_edit={props.reservation_edit} reservation_remove={props.reservation_remove} parking_spaces={props.parking_spaces} addReservation={addReservation} pay={props.pay} vehicle_types={props.vehicle_types}></Reservation>) : null}
    </Grid> :
    <Loading></Loading>;


    const editbutton = <Dialog.Root>
        <Dialog.Trigger>
            <Button><Pencil2Icon></Pencil2Icon> Edit</Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="600px" size="1">
            <Dialog.Description size="2" mb="4">
                <Text size="5">Edit Account</Text>
                <Separator className='separator' size="4"></Separator>
                <input id="fileInput" type="file"  accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{display : "none"}} />
                <Flex gap='4'>
                    <Avatar
                        size="5"
                        src={preview ? preview :"/profile/" + '' + ".png"}
                        fallback={"Hakl04".substring(0,1)}
                    />
                    <IconButton style={{marginTop:'auto',marginBottom:'auto'}} onClick={handleFileButtonClick} >
                        <Pencil2Icon width="18" height="18" />
                    </IconButton>
                    <IconButton style={{marginTop:'auto',marginBottom:'auto'}} onClick={revert}>
                        <ResetIcon width="18" height="18" />
                    </IconButton>
                </Flex>
            </Dialog.Description>
            <Text size="2">Username</Text>
            <TextField.Root placeholder="Search…" size="2" onChange={handleUsernameChange} defaultValue={username.current}>
                <TextField.Slot>
                    <PersonIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
            <Text size="2">Password</Text>
            <TextField.Root placeholder="Search…" size="2" type="password" onChange={handlePasswordChange} >
                <TextField.Slot>
                    <LockClosedIcon height="16" width="16" />
                </TextField.Slot>
                <TextField.Slot>
                    <EyeClosedIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
            <Text size="2">Retype Password</Text>
            <TextField.Root placeholder="Search…" size="2" type="password" onChange={handleRetypePasswordChange} >
                <TextField.Slot>
                    <LockOpen1Icon height="16" width="16" />
                </TextField.Slot>
                <TextField.Slot>
                    <EyeClosedIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>
            <Text size="2">Description</Text>
            <TextArea className='posttext' placeholder="What is happening…" size="2" onChange={handleDescriptionChange} defaultValue={description.current}/>
            <Button onClick={() => props.editaccount(selectedImage,username.current,description.current,password.current,retypepassword.current)}>Save</Button>
        </Dialog.Content>
    </Dialog.Root>;

    const customerdisplay = props.customer != null ? 
    <>
        <Grid columns="1" gap="0" rows="repeat(0, 5px)" width="auto">
            <Flex className='flex' gap="3" align="center">
                <Avatar
                    size="5"
                    src={"/location/swinburne.jpg"}
                    fallback="L"
                />
                <Box style={{width:5000}}>
                    <Text as="div" size="2" weight="bold" style={{marginBottom:5}}>
                        {props.customer.username} <CheckCircledIcon className='icon' color='green'></CheckCircledIcon>
                    </Text>
                    <Text as="div" size="1" color="gray" style={{marginBottom:5}}>
                        <CalendarIcon className='icon'></CalendarIcon> Joined {props.customer.start_date}
                    </Text>
                    <Text as="div" size="1" color="gray">
                        <HomeIcon className='icon'></HomeIcon> {props.customer.address}
                    </Text>
                </Box>
                {editbutton}
                <Text color="gray"><DotsVerticalIcon width="20" height="20"></DotsVerticalIcon></Text>
            </Flex>            
        </Grid>
        <Grid columns="5" gap="0" rows="repeat(0, 5px)" width="auto">
            <Box>
                <Text as="div" size="2" weight="bold" align="center">Slots</Text>
                <Text as="div" size="2" align="center">364</Text>
            </Box>
            <Separator orientation="vertical" style={{margin:"auto"}}></Separator>
            <Box>
                <Text as="div" size="2" weight="bold" align="center">Cost</Text>
                <Text as="div" size="2" align="center">$<Text size="2" weight="bold" style={{color:"green"}}>1.99</Text> / hour</Text>
            </Box>
            <Separator orientation="vertical" style={{margin:"auto"}}></Separator>
            <Box>
                <Text as="div" size="2" weight="bold" align="center">Distance</Text>
                <Text as="div" size="2" align="center">2Km</Text>
            </Box>
        </Grid>
    </> :
    <Loading></Loading>;
    return (
        <>
        {props.customer ?
        <>
        <NavBar accountid={props.accountid} inboxid={props.inboxid} height={props.height} logout={props.logout} page="account"></NavBar>
        <div className="row" style={{marginTop:20}}>
            <div className='col-lg-3 d-none d-lg-block' display="block">
                <ScrollArea scrollbars="vertical" style={{ height: props.height -70 }}>
                    <Card className='sidecontent' size='1'>
                        <Text size="5">Availability</Text>
                        <Separator className='separator' size="4"></Separator>
                        <Box style={{ height: 200 }}>
                        {props.location && props.location.parking_spaces ? <PieChart value={props.location.parking_spaces.map(p => checkOverlap(props.parking_spaces[p].schedule.map(r => props.reservations[r]).filter(r => r))).filter(r => r > 0).length} full={props.location.parking_spaces.length}></PieChart> :
                        <PieChart value={0} full={1}></PieChart>}
                        </Box>
                    </Card>
                    <Card className='sidecontent' size='1'>
                        <Text size="5">Activity</Text>
                        <Separator className='separator' size="4"></Separator>
                        <Box style={{ height: 120 }}>
                            {activitydisplay}
                        </Box>
                    </Card>
                    <Card className='sidecontent'>
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
                    <Card className='apost' size='1'>
                        {customerdisplay}
                    </Card>
                    <Card className='apost' size='1'>
                        <Text size="5">Schedules</Text>
                        <Separator className='separator' size="4"></Separator>
                        {props.history && props.reservations ?
                        <Calender size="2" reservations={props.history.filter(r => props.reservations[r]).map(r => props.reservations[r])}></Calender>:
                        <Loading></Loading>}
                    </Card>
                </ScrollArea>
            </div>
            <div className='col-lg-3 col-md-4' display="block">
                <ScrollArea scrollbars="vertical" style={{ height: props.height -70 }}>
                    <Card className='sidecontent' size='1'>
                        <Text size="5">History</Text>
                        <Separator className='separator' size="4"></Separator>
                        { reservation_list.length > 0 ?
                        <Flex className='flex' justify="center">
                            <IconButton radius="full" size="1">
                                <PlusIcon />
                            </IconButton>
                        </Flex> : null
                        }
                        {reservationdisplay}
                    </Card>
                </ScrollArea>
            </div>
        </div>
        </> : null}
        </>
    )
}

export default Dashboard
