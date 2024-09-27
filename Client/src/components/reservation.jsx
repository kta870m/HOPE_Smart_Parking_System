
import '@radix-ui/themes/styles.css'
import './slot.css'
import {Box, Text,Separator, Avatar, Button, Dialog, Flex, HoverCard, TextField,Grid,IconButton,RadioCards, Checkbox, Popover, AlertDialog,Progress} from '@radix-ui/themes';
import {LockClosedIcon,LockOpen2Icon,ClipboardIcon, Cross2Icon,LapTimerIcon,IdCardIcon, Pencil2Icon, TrashIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { useState,useRef,useEffect } from 'react';
import ReservationForm from './reservationform.jsx';
import PaymentForm from './paymentform.jsx';
import {remainingTime, stringTime, formatTime} from '../assets/functions';

function Reservation(props) {
    const [paid,setPaid] = useState(0);
    const [price,setPrice] = useState(props.reservation.price);
    const [timeremain,setTimeRemain] = useState(remainingTime(props.reservation.start_time,0));
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemain(remainingTime(props.reservation.start_time,0));
        }, 1000); // 100 milliseconds = 0.1 seconds
        return () => clearInterval(interval);
      }, []);

      useEffect(() => {
        setPrice(props.reservation.price);
      }, [props.reservation.duration]);

      useEffect(() => {
        let num = 0;
        props.reservation.transactions.map(t => {num += parseFloat(t['ammount'])});
        setPaid(num);
      }, [props.reservation.transactions.length]);

      

    return (
        <Flex className='flex' gap="3" align="center">
            <Checkbox onClick={() => props.addReservation(props.reservation.id)}></Checkbox>
                <Box style={{ width: 2000 }}>
                <Text as="div" size="2" weight="bold" style={{ width: 'fit-content'}}>
                    <HoverCard.Root>
                        <HoverCard.Trigger>
                                <Text>{props.reservation.parking_spaces.length + (props.reservation.parking_spaces.length > 1 ? " Slots " : " Slot ")}</Text>
                        </HoverCard.Trigger>
                        <HoverCard.Content maxWidth="300px" size="1">
                            {props.parking_spaces ? props.reservation.parking_spaces.map((space,index) =>
                                <Flex key={index} className="flex" gap="2" align="center">
                                    <Avatar
                                        size="1"
                                        src={"/vehicle/" + props.parking_spaces[space].vehicle_type + ".png"}
                                        radius="none"
                                        fallback={'A'.substring(0,1)}
                                    />
                                    <Text key={index} as="div" size="1" color="gray" style={{ width: 'fit-content'}}>
                                        {props.parking_spaces[space].name}
                                    </Text>
                                </Flex>
                            ) : null}
                        </HoverCard.Content>
                    </HoverCard.Root>
                    <HoverCard.Root>
                        <HoverCard.Trigger>
                        <Text>
                        {
                        (timeremain > 0 ? 
                        <Dialog.Root>
                            <Dialog.Trigger>
                                {price - paid <= 0 ? <ClipboardIcon color='green' className='icon'></ClipboardIcon> : <ClipboardIcon color='gold' className='icon'></ClipboardIcon>}
                            </Dialog.Trigger>
                            <Dialog.Content maxWidth="600px" size="1">
                                <PaymentForm reservation={props.reservation} pay={props.pay} vehicle_types={props.vehicle_types}></PaymentForm>
                            </Dialog.Content>
                        </Dialog.Root>
                         : (price - paid <= 0 ? <LapTimerIcon color='darkgray' className='icon'></LapTimerIcon> : <Cross2Icon color='tomato' className='icon'></Cross2Icon>))}
                        </Text>
                        </HoverCard.Trigger>
                        <HoverCard.Content maxWidth="300px" size="1">
                            <Text size="1" as="div" color="gray">Price: ${price} • Paid: ${paid} • Owe: ${price - paid}</Text>
                            <Text size="2" as="div">Transactions</Text>
                            {props.reservation.transactions.map((transaction,index) =>
                                <Text size="1" as="div" color="gray" key={index} style={{marginTop:3}}>${transaction.ammount} • {transaction.pay_time}</Text>
                            )}
                        </HoverCard.Content>
                    </HoverCard.Root>
                </Text>
                    {timeremain > 0 ?
                            <Text as="div" size="1" color="gray">
                            {"Begin in " + stringTime(timeremain)}
                            </Text>:
                            ( price - paid > 0 ? 
                            <Text as="div" size="1" color="gray">Payment overdue</Text>:
                            (timeremain + props.reservation.duration * 60000 > 0 ?
                            <Flex gap="2" align="center">
                                <Progress color='amber' duration="0s"  value={(timeremain + props.reservation.duration * 60000)/(props.reservation.duration * 60000)*100}/>
                                <Text size="1" color="gray">{formatTime(timeremain + props.reservation.duration * 60000)}</Text>
                            </Flex>:
                            <Text as="div" size="1" color="gray">Expired</Text>))
                        }
                </Box>
                {timeremain > 0 ?

                <Dialog.Root>
                    <Dialog.Trigger>
                        <IconButton><Pencil2Icon></Pencil2Icon></IconButton>
                    </Dialog.Trigger>

                    <Dialog.Content maxWidth="600px" size="1">
                        <ReservationForm name="Edit Reservation" function={props.reservation_edit} price={10} value={props.reservation.id} date={props.reservation.start_time.split(" ")[0]} hourtime={props.reservation.start_time.split(" ")[1].split(":")[0]} minutetime={props.reservation.start_time.split(" ")[1].split(":")[1]} hourduration={Math.floor(props.reservation.duration / 60)} minuteduration={props.reservation.duration % 60} description={props.reservation.description}></ReservationForm>
                    </Dialog.Content>
                </Dialog.Root>:null
                }
                <Popover.Root>
                    <Popover.Trigger>
                        <Text color="gray"><DotsVerticalIcon width="20" height="20"></DotsVerticalIcon></Text>
                    </Popover.Trigger>
                    <Popover.Content size="1">
                        <Box align="center" style={{marginBottom:20}}><Pencil2Icon color='darkgray' width='20' height='20'></Pencil2Icon></Box>
                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Box align="center"><TrashIcon color='tomato' width='20' height='20'></TrashIcon></Box>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content maxWidth="400px" size="1">
                                <Text size="5">Cancel Reservation</Text>
                                <Separator className='separator' size="4"></Separator>
                                <Text size="2">Are you sure, this action cannot be undone!</Text>
                                <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">Cancel</Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button onClick={() => props.reservation_remove([props.reservation.id])} variant="solid" color="tomato">Confirm</Button>
                                </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </Popover.Content>
                </Popover.Root>

        </Flex>
    )
}

export default Reservation
