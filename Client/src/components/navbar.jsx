
import {Tabs,Text,Flex,Popover,Box,AlertDialog,Button,Separator,Dialog} from '@radix-ui/themes';
import ChatBot from './chatbot.jsx'
import {Link} from "react-router-dom"
import {HomeIcon, MagnifyingGlassIcon, DashboardIcon, PaperPlaneIcon,HamburgerMenuIcon, GearIcon, BellIcon, ExitIcon, QuestionMarkCircledIcon} from '@radix-ui/react-icons'
import './navbar.css'
import logo from "../assets/logo.png"

function NavBar(props) {
    return (
        <Tabs.Root value={props.page} className='nav-bar'>
            <Flex className='logo'>
                <Text className='logotext' color="amber" size="5" weight="medium">SL</Text>
                <img src={logo} alt="" className='logoimage'/>
                <Text className='logotext' color="amber" size="5" weight="medium">TIFY</Text>
            </Flex>
            <Tabs.List justify="end">
              <Link className='d-none d-md-block' to="/"><Tabs.Trigger value="">Home</Tabs.Trigger></Link>
              <Link className='d-none d-md-block' to="/parking"><Tabs.Trigger value="parking">Parking</Tabs.Trigger></Link>
              <Link className='d-none d-md-block' to="/dashboard"><Tabs.Trigger value="account">Dashboard</Tabs.Trigger></Link>

              <Popover.Root>
                    <Popover.Trigger>
                        <Tabs.Trigger ><HamburgerMenuIcon width="20" height="20"></HamburgerMenuIcon></Tabs.Trigger>
                    </Popover.Trigger>
                    <Popover.Content size="1">
                        <Link className='d-block d-md-none' to="/">
                            <Box align="center" style={{marginBottom:20}}>
                                <HomeIcon width="20" height="20" color='darkgray'></HomeIcon>
                            </Box>
                        </Link>
                        <Link className='d-block d-md-none' to="/parking">
                            <Box align="center" style={{marginBottom:20}}>
                                <MagnifyingGlassIcon width="20" height="20" color='darkgray'></MagnifyingGlassIcon>
                            </Box>
                        </Link>
                        <Link className='d-block d-md-none' to="/dashboard">
                            <Box align="center" style={{marginBottom:20}}>
                                <DashboardIcon width="20" height="20" color='darkgray'></DashboardIcon>
                            </Box>
                        </Link>
                        <Box align="center" style={{marginBottom:20}}>
                            <GearIcon width="20" height="20" color='darkgray'></GearIcon>
                        </Box>
                        <Box align="center" style={{marginBottom:20}}>
                            <BellIcon width="20" height="20" color='darkgray'></BellIcon>
                        </Box>
                        <Box align="center" style={{marginBottom:20}}>
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <QuestionMarkCircledIcon width="20" height="20" color='darkgray'></QuestionMarkCircledIcon>
                                </Dialog.Trigger>
                                <Dialog.Content maxWidth="600px" size="1">
                                    <ChatBot></ChatBot>
                                </Dialog.Content>
                            </Dialog.Root>
                        </Box>
                        <Box align="center">
                            <AlertDialog.Root>
                                <AlertDialog.Trigger>
                                    <ExitIcon width="20" height="20" color="tomato"></ExitIcon>
                                </AlertDialog.Trigger>
                                <AlertDialog.Content maxWidth="400px" size="1">
                                    <Text size="5">Logout</Text>
                                    <Separator className='separator' size="4"></Separator>
                                    <Text size="2">Are you sure you want to log out of this account?</Text>
                                    <Flex gap="3" mt="4" justify="end">
                                    <AlertDialog.Cancel>
                                        <Button variant="soft" color="gray">Cancel</Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <Button variant="solid" color="tomato" onClick={props.logout}>Logout</Button>
                                    </AlertDialog.Action>
                                    </Flex>
                                </AlertDialog.Content>
                            </AlertDialog.Root>
                        </Box>
                    </Popover.Content>
                </Popover.Root>
            </Tabs.List>
        </Tabs.Root>
    )
}

export default NavBar
//<ChatBot height={props.height}></ChatBot>