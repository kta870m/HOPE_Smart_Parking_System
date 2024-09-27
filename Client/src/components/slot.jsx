
import '@radix-ui/themes/styles.css'
import './slot.css'
import {Link} from "react-router-dom"
import {Box, Text, Avatar, Button, Dialog, Flex, HoverCard, Checkbox} from '@radix-ui/themes';
import {LockClosedIcon,LockOpen2Icon } from '@radix-ui/react-icons';
import { useState,useRef,useEffect } from 'react';
import ReservationForm from './reservationform.jsx';
import {checkOverlap, stringTime,getFormattedDate} from '../assets/functions';


function Slot(props) {
    
    const [timeremain,setTimeRemain] = useState(0);
  
    useEffect(() => {
        const interval = setInterval(() => {
            //setSchedule(props.space.schedule ? props.space.schedule : schedule);
            if(props.space.schedule){
                setTimeRemain(checkOverlap(props.space.schedule.map(s => props.reservations[s]).filter(r => r),new Date()));
                //console.log(props.space.schedule.map(s => props.reservations[s]));
            }
        }, 1000); // 100 milliseconds = 0.1 seconds
        return () => clearInterval(interval);
      }, []);

    return (
        <Flex className='flex' gap="3" align="center">
            <Checkbox onClick={() => props.addSpace(props.space.id)}></Checkbox>
            <Avatar
                    size="1"
                    src={"/vehicle/" + props.space.vehicle_type + ".png"}
                    radius="none"
                    fallback={'A'.substring(0,1)}
                />
                <Box style={{ width: 2000 }}>
                    <HoverCard.Root>
                        <HoverCard.Trigger>
                            <Text as="div" size="2" weight="bold" style={{ width: 'fit-content'}}>
                                {props.space.name} {timeremain <= 0 ? <LockOpen2Icon color='green' className='icon'></LockOpen2Icon> : <LockClosedIcon color='gold' className='icon'></LockClosedIcon>}
                            </Text>
                        </HoverCard.Trigger>
                        <HoverCard.Content maxWidth="300px" size="1">
                            <Text size="1" color='gray'>${props.vehicle_types[props.space.vehicle_type].price}</Text>
                        </HoverCard.Content>
                    </HoverCard.Root>
                    <Text as="div" size="1" color="gray">
                        {timeremain <= 0 ? "Available for " + stringTime(-timeremain) : "Available in " + stringTime(timeremain)}
                    </Text>
                </Box>
                <Dialog.Root>
                    <Dialog.Trigger>
                        <Button className='follow'>Book</Button>
                    </Dialog.Trigger>

                    <Dialog.Content maxWidth="600px" size="1">
                        <ReservationForm name="Booking" function={props.reservation_book} value={[props.space.id]} price={props.vehicle_types[props.space.vehicle_type].price} vehicle_types={props.vehicle_types} hourduration="00" minuteduration="15" date={getFormattedDate().split(' ')[0].replace(/\//g, '-')} hourtime={getFormattedDate().split(' ')[1].split(":")[0]} minutetime={getFormattedDate().split(' ')[1].split(":")[1]} description={""}></ReservationForm>
                    </Dialog.Content>
                </Dialog.Root>
        </Flex>
    )
}

export default Slot
