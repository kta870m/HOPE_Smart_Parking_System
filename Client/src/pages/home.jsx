import {useEffect,useRef,useState} from 'react'
import '@radix-ui/themes/styles.css'
import './home.css'
import {Box, Text, Separator,Grid, Flex,Button,ScrollArea,IconButton,TextField,Avatar} from '@radix-ui/themes';
import NavBar from '../components/navbar.jsx'
import Loading from '../components/loading.jsx'
import {MagnifyingGlassIcon, FaceIcon,PaperPlaneIcon,ImageIcon, ChatBubbleIcon, ClockIcon} from '@radix-ui/react-icons'
import { useParams, useNavigate } from 'react-router-dom';
import banner from '../assets/banner.png'

function Home(props) {
    return (
        <>
        <NavBar accountid={props.accountid} inboxid={props.inboxid} height={props.height} page=""></NavBar>
        <ScrollArea scrollbars="vertical" style={{ height: props.height -70 }}>
        <div className='row homepage' style={{marginTop:20}}>
            <div className='d-none d-lg-block col-lg-4' style={{paddingTop:'10%'}}>
                <Box className='textcontainer'>
                    <Text style={{fontSize:40}} weight="light" as="div" align="center">Autonomous</Text>
                    <Text style={{fontSize:40}} weight="light" as="div" align="center">Parking System</Text>
                    <Text weight="light" as="div" align="center">Join us for substantial conveniences</Text>
                    <Grid columns="2" gap="5" style={{margin:"auto",marginTop:20,width:300}}>
                        <Button style={{padding:20,fontSize:20}} size="5">Login</Button>
                        <Button  style={{padding:20,fontSize:20}} size="5">Signup</Button>
                    </Grid>
                </Box>
            </div>
            <div className='d-block d-lg-none col-sm-1 col-md-2'></div>
            <div className='col-sm-10 col-md-8'>
                <img src={banner} alt="" className='banner'/>
            </div>
            <div className='d-block d-lg-none col-sm-2'></div>
            <div className='d-block d-lg-none col-sm-12' style={{paddingTop:20}}>
                <Box className='textcontainer'>
                    <Text style={{fontSize:40}} weight="light" as="div" align="center">Autonomous</Text>
                    <Text style={{fontSize:40}} weight="light" as="div" align="center">Parking System</Text>
                    <Text weight="light" as="div" align="center">Join us for substantial conveniences</Text>
                    <Grid columns="2" gap="5" style={{margin:"auto",marginTop:20,width:300}}>
                        <Button style={{padding:20,fontSize:20}} size="5" onClick={() => predict(model,[11,12],1)}>Login</Button>
                        <Button  style={{padding:20,fontSize:20}} size="5">Signup</Button>
                    </Grid>
                </Box>
            </div>
        </div>
        </ScrollArea>
        </>
    )
}

export default Home
