
import '@radix-ui/themes/styles.css'
import './barchart.css'
import Calender from './calender.jsx'
import FormError from './formerror.jsx'
import {Box, Text,Separator, Button, Flex, TextField,TextArea,Grid,IconButton,Table, Popover} from '@radix-ui/themes';
import {CrossCircledIcon,ClockIcon, CalendarIcon} from '@radix-ui/react-icons'
import { useState } from 'react';

function ReservationForm(props) {
    const [error,setError] = useState();
    const [invoice,setInvoice] = useState();

    const [date,setDate] = useState(props.date);
    const [hourtime,setHourTime] = useState(props.hourtime);
    const [minutetime,setMinuteTime] = useState(props.minutetime);
    const [hourduration,setHourDuration] = useState(props.hourduration);
    const [minuteduration,setMinuteDuration] = useState(props.minuteduration);
    const [description,setDescription] = useState(props.description);
    const handleInputChange = (event,setter) => {
        setter(event.target.value);
    };
   

    return (
        <>
        {!invoice ?
        <>
            <Text size="5">{props.name}</Text>
            <Separator className='separator' size="4"></Separator>
            <Grid columns="3" gap="5" style={{width:"auto"}} className='formrow'>
                <Box>
                    <Text as="div" size="2" style={{marginBottom:5}}>Day <FormError type="datetime" error = {error}></FormError></Text>
                    <Flex gap="1">
                    <Popover.Root>
                        <Popover.Trigger>
                            <IconButton>
                                <CalendarIcon width="18" height="18" />
                            </IconButton>
                        </Popover.Trigger>
                        <Popover.Content width="320px" size='1'>
                            <Calender></Calender>
                        </Popover.Content>
                    </Popover.Root>
                        <TextField.Root placeholder="yyyy/mm/dd" size="2" style={{ width: "auto" }} value={date} onChange={(e) => handleInputChange(e,setDate)}></TextField.Root>
                    </Flex>
                </Box>
                <Box>
                    <Text as="div" size="2" style={{marginBottom:5}}>Time <FormError type="datetime" error = {error}></FormError></Text>
                    <Flex gap="1">
                        <IconButton>
                            <ClockIcon width="18" height="18" />
                        </IconButton>
                        <TextField.Root placeholder="hh" type="number" size="2" style={{ width: "auto" }} value={hourtime} onChange={(e) => handleInputChange(e,setHourTime)}>
                        </TextField.Root>
                        <TextField.Root placeholder="mm" type="number" size="2" style={{ width: "auto" }} value={minutetime} onChange={(e) => handleInputChange(e,setMinuteTime)}>
                        </TextField.Root>
                    </Flex>
                </Box>
                <Box>
                    <Text as="div" size="2" style={{marginBottom:5}}>Duration <FormError type="duration" error = {error}></FormError></Text>
                <Grid columns="2" gap="1" style={{width:"auto"}}>

                <TextField.Root placeholder="" size="2" style={{ width: "auto" }} value={hourduration} onChange={(e) => handleInputChange(e,setHourDuration)}>
                <TextField.Slot>
                </TextField.Slot>
                <TextField.Slot>
                    h
                </TextField.Slot>
                </TextField.Root>
                <TextField.Root placeholder="" size="2" style={{ width: "auto" }} value={minuteduration} onChange={(e) => handleInputChange(e,setMinuteDuration)}>
                <TextField.Slot>
                </TextField.Slot>
                <TextField.Slot>
                    m
                </TextField.Slot>
                </TextField.Root>
                </Grid>
                </Box>
            </Grid>
            {error && error['spaces'] ? <Text as="div" size="2" color="red"> <CrossCircledIcon color="tomato" className='icon'></CrossCircledIcon> {error['spaces'][0]}</Text> : null}
            <Text as="div" size="2" style={{marginBottom:5}}>Description</Text>
            <TextArea value={description} onChange={(e) => handleInputChange(e,setDescription)}></TextArea>
            <Box className='formrow'>
                <Text size="2" weight="medium" style={{color:"green"}}>${props.price * (parseFloat(hourduration) * 60 + parseFloat(minuteduration)) / 60}</Text>
            </Box>
            <Button onClick={() => props.function(props.value, date + " " + hourtime + ":" + minutetime + ":00", parseFloat(hourduration) * 60 + parseFloat(minuteduration), description,setInvoice,setError)}>Confirm</Button>
        </> :
        <>
            <Text size="5">Invoice</Text>
            <Separator className='separator' size="4"></Separator>
            <Text size="2" as="div" weight="bold">Username: <Text color='gray' weight="regular">{invoice.customer.username}</Text></Text>
            <Text size="2" as="div" weight="bold">Email: <Text color='gray' weight="regular">{invoice.customer.email}</Text></Text>
            <Text size="2" as="div" weight="bold">Address: <Text color='gray' weight="regular">{invoice.customer.address}</Text></Text>
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                    <Table.ColumnHeaderCell>Slot</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>$/hour</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>duration</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { invoice.spaces.map((space,index) =>
                    <Table.Row key={index}>
                    <Table.RowHeaderCell>{space.name}</Table.RowHeaderCell>
                    <Table.Cell>${props.vehicle_types[space.vehicle_type].price}</Table.Cell>
                    <Table.Cell>{invoice.duration}m</Table.Cell>
                    <Table.Cell>${props.vehicle_types[space.vehicle_type].price * invoice.duration / 60}</Table.Cell>
                    </Table.Row>)}

                    <Table.Row>
                    <Table.RowHeaderCell>Total</Table.RowHeaderCell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell>{invoice.duration}m</Table.Cell>
                    <Table.Cell>${invoice.total_price}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>

            <Text size="2" as="div" weight="bold">Due: <Text color='gray' weight="regular">{invoice.due}</Text></Text>
        </>
        }
        </>
    )
}

export default ReservationForm