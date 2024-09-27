import { useState,useEffect,useRef} from 'react'
import FormError from '../components/formerror.jsx'
import '@radix-ui/themes/styles.css'
import './login.css'
import {Box, Text, Button, Separator, Checkbox, Flex,Card, TextField,HoverCard} from '@radix-ui/themes';
import {PersonIcon,LockClosedIcon,EnvelopeClosedIcon, LockOpen1Icon,CrossCircledIcon,CheckCircledIcon,EyeClosedIcon } from '@radix-ui/react-icons'
import {useNavigate,Link } from 'react-router-dom';

function Signup(props) {
    const navigate = useNavigate();
    useEffect(() => {
        if(props.customer){
            navigate('/parking');
        }
    }, [props.customer]);

    const [error,setError] = useState();

    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [retypepassword,setRetypePassword] = useState('');
    const handleInputChange = (event,setter) => {
        setter(event.target.value);
    };

    

    
    return(
        <>
            <Box className='form'>
                <Card>
                    <Text size="5">Signup</Text>
                        <Separator className='separator' size="4"></Separator>
                    <Text size="2">Email <FormError type="email" error = {error}></FormError></Text>
                    <TextField.Root placeholder="Email…" size="2" className='input' value={email} onChange={(e) => handleInputChange(e,setEmail)}>
                    <TextField.Slot>
                            <EnvelopeClosedIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                    <Text size="2">Username <FormError type="username" error = {error}></FormError></Text>
                    <TextField.Root placeholder="Username…" size="2" className='input' value={username} onChange={(e) => handleInputChange(e,setUsername)}>
                    <TextField.Slot>
                            <PersonIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                    <Text size="2">Password <FormError type="password" error = {error}></FormError></Text>
                    <TextField.Root placeholder="Password…" size="2" type="password" className='input' value={password} onChange={(e) => handleInputChange(e,setPassword)}>
                        <TextField.Slot>
                            <LockOpen1Icon height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Slot>
                            <EyeClosedIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                    <Text size="2">Retype Password <FormError type="retypepassword" error = {error}></FormError></Text>
                    <TextField.Root placeholder="Retype Password…" size="2" type="password" className='input' value={retypepassword} onChange={(e) => handleInputChange(e,setRetypePassword)}>
                        <TextField.Slot>
                            <LockClosedIcon height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Slot>
                            <EyeClosedIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                    <Flex gap ='5' className='input'>
                        <Text as="label" size="2">
                            <Flex gap="2">
                                <Checkbox />
                                Remember me
                            </Flex>
                        </Text>
                        <Text size="2">Forgot password?</Text>
                    </Flex>
                    <Button className='authbutton' onClick={() => props.signup(email,username,password,retypepassword,setError)}>
                        Signup
                    </Button>
                    <Text size="2" align="center" as="div">Already a member? <Link to="/auth/login/customer" className='link'>Login now</Link></Text>
                </Card>
            </Box>
        </>
    )
}

export default Signup