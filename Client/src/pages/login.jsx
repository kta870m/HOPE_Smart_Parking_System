import {useEffect,useRef,useState} from 'react'
import '@radix-ui/themes/styles.css'
import './login.css'
import {Box, Text, Button, Separator, Checkbox, Flex,Card, TextField,HoverCard} from '@radix-ui/themes';
import {PersonIcon,LockClosedIcon,EyeOpenIcon, EyeClosedIcon,CrossCircledIcon,CheckCircledIcon } from '@radix-ui/react-icons'
import {useNavigate,Link } from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();
    useEffect(() => {
        if(props.person){
            navigate(props.success);
        }
    }, [props.person]);

    const [error,setError] = useState('');

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState();
    const handleInputChange = (event,setter) => {
        setter(event.target.value);
    };


    const emailerror = !error ? "" : error['email'] ?
    <HoverCard.Root>
        <HoverCard.Trigger>
            <CrossCircledIcon color="tomato" className='icon'></CrossCircledIcon>
        </HoverCard.Trigger>
        <HoverCard.Content maxWidth="300px" size="1">
            {error['email'].map(error => <Text as="div" size="2" color="red"> <CrossCircledIcon color="tomato" className='icon'></CrossCircledIcon> {error}</Text>)}
        </HoverCard.Content>
    </HoverCard.Root> :
    <CheckCircledIcon color="green" className='icon'></CheckCircledIcon>;

    const passworderror = !error ? "" : error['password'] ?
    <HoverCard.Root>
        <HoverCard.Trigger>
            <CrossCircledIcon color="tomato" className='icon'></CrossCircledIcon>
        </HoverCard.Trigger>
        <HoverCard.Content maxWidth="300px" size="1">
            {error['password'].map(error => <Text as="div" size="2" color="red"> <CrossCircledIcon color="tomato" className='icon'></CrossCircledIcon> {error}</Text>)}
        </HoverCard.Content>
    </HoverCard.Root> :
    <CheckCircledIcon color="green" className='icon'></CheckCircledIcon>;
    
    return(
        <>
            <Box className='form'>
                <Card>
                    <Text size="5">{props.header}</Text>
                        <Separator className='separator' size="4"></Separator>
                    <Text size="2">Email {emailerror}</Text>
                    <TextField.Root placeholder="Email…" size="2" className='input' value={email} onChange={(e) => handleInputChange(e,setEmail)}>
                    <TextField.Slot>
                            <PersonIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                    <Text size="2">Password {passworderror}</Text>
                    <TextField.Root placeholder="Password…" size="2" type="password" className='input' value={password} onChange={(e) => handleInputChange(e,setPassword)}>
                        <TextField.Slot>
                            <LockClosedIcon height="16" width="16" />
                        </TextField.Slot>
                        <TextField.Slot>
                            <EyeClosedIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                    {error ? <Text as="div" size="2" color="red"> <CrossCircledIcon color="tomato" className='icon'></CrossCircledIcon> {error['account'][0]}</Text> : null}
                    <Flex gap ='5' className='input'>
                        <Text as="label" size="2">
                            <Flex gap="2">
                                <Checkbox />
                                Remember me
                            </Flex>
                        </Text>
                        <Text size="2">Forgot password?</Text>
                    </Flex>
                    <Button className='authbutton' onClick={() => props.login(email,password,setError)}>
                        Login
                    </Button>
                    <Text size="2" align="center" as="div">Not a member? <Link to="/auth/signup" className='link'>Signup now</Link></Text>
                </Card>
            </Box>
        </>
    )
}

export default Login
