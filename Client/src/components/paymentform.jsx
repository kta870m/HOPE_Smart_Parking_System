
import '@radix-ui/themes/styles.css'
import './barchart.css'
import FormError from './formerror.jsx'
import {Box, Text,Separator, Button, SegmentedControl, TextField,TextArea,Grid,IconButton,RadioCards, Table} from '@radix-ui/themes';
import {LockClosedIcon,ClockIcon, CalendarIcon,PersonIcon,IdCardIcon } from '@radix-ui/react-icons'
import { useState } from 'react';
import visa from "../assets/visa.png"
import mastercard from "../assets/mastercard.png"
import americanexpress from "../assets/americanexpress.png"

function PaymentForm(props) {
    const [error,setError] = useState();
    const [receipt,setReceipt] = useState();

    const [method,setMethod] = useState("card");
    const [card,setCard] = useState("visa");
    const [name,setName] = useState("");
    const [number,setNumber] = useState("");
    const [month,setMonth] = useState("");
    const [year,setYear] = useState("");
    const [cvv,setCVV] = useState("");
    const handleInputChange = (event,setter) => {
        setter(event.target.value);
    };
    return (
        <>
        { !receipt ?
        <> 
            <Text size="5">Payment</Text>
            <Separator className='separator' size="4"></Separator>
            <SegmentedControl.Root defaultValue="card" style={{marginBottom:10, width:'100%'}}>
            <SegmentedControl.Item value="card" onClick={() =>setMethod("card")}>Credit Card</SegmentedControl.Item>
            <SegmentedControl.Item value="paypal" onClick={() =>setMethod("paypal")}>PayPal</SegmentedControl.Item>
            </SegmentedControl.Root>
            <RadioCards.Root defaultValue="visa" columns={{ initial: '1', sm: '3' }} className='formrow'>
                    <RadioCards.Item value="visa">
                        <img src={visa} alt="" className='cardtype'/>
                    </RadioCards.Item>
                    <RadioCards.Item value="mastercard">
                        <img src={mastercard} alt="" className='cardtype' />
                    </RadioCards.Item>
                    <RadioCards.Item value="americanexpress">
                        <img src={americanexpress} alt="" className='cardtype' />
                    </RadioCards.Item>
            </RadioCards.Root>
            <Grid columns="2" gap="4" style={{width:"auto"}} className='formrow'>
                <Box>
                    <Text as="div" size="2" style={{marginBottom:5}}>Name <FormError type="name" error = {error}></FormError></Text>
                        <TextField.Root placeholder="" size="2" style={{ width: "auto" }} value={name} onChange={(e) => handleInputChange(e,setName)}>
                            <TextField.Slot>
                                <PersonIcon></PersonIcon>
                            </TextField.Slot>
                        </TextField.Root>
                </Box>
                <Box>
                    <Text as="div" size="2" style={{marginBottom:5}}>Card Number <FormError type="number" error = {error}></FormError></Text>
                        <TextField.Root placeholder="" size="2" style={{ width: "auto" }} value={number} onChange={(e) => handleInputChange(e,setNumber)}>
                            <TextField.Slot>
                                <IdCardIcon></IdCardIcon>
                            </TextField.Slot>
                        </TextField.Root>
                </Box>
                <Box>
                    <Text as="div" size="2" style={{marginBottom:5}}>Expiry Date <FormError type="expiry" error = {error}></FormError></Text>
                    <Grid columns="2" gap="1" style={{width:"auto"}}>
                    <TextField.Root placeholder="" size="2" style={{ width: "auto" }} value={month} onChange={(e) => handleInputChange(e,setMonth)}>
                    <TextField.Slot>
                        M
                    </TextField.Slot>
                    </TextField.Root>
                    <TextField.Root placeholder="" size="2" style={{ width: "auto" }} value={year} onChange={(e) => handleInputChange(e,setYear)}>
                    <TextField.Slot>
                        Y
                    </TextField.Slot>
                    </TextField.Root>
                    </Grid>
                </Box>
                <Box>
                    <Text as="div" size="2" style={{marginBottom:5}}>CVV <FormError type="cvv" error = {error}></FormError></Text>
                        <TextField.Root placeholder="" size="2" style={{ width: "auto" }} value={cvv} onChange={(e) => handleInputChange(e,setCVV)}>
                        <TextField.Slot>
                            <LockClosedIcon></LockClosedIcon>
                        </TextField.Slot>
                        </TextField.Root>
                </Box>
            </Grid>
            <Button onClick={() => props.pay(props.reservation,{method: method, card: card, name: name, number: number, expiry: month+"/"+year, cvv: cvv},setReceipt,setError)}>Confirm</Button>
        </> :
        <>
        <Text size="5">Receipt</Text>
        <Separator className='separator' size="4"></Separator>
        <Text size="2" as="div" weight="bold">Username: <Text color='gray' weight="regular">{receipt.customer.username}</Text></Text>
        <Text size="2" as="div" weight="bold">Email: <Text color='gray' weight="regular">{receipt.customer.email}</Text></Text>
        <Text size="2" as="div" weight="bold">Address: <Text color='gray' weight="regular">{receipt.customer.address}</Text></Text>
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
                { receipt.spaces.map((space,index) =>
                <Table.Row key={index}>
                <Table.RowHeaderCell>{space.name}</Table.RowHeaderCell>
                <Table.Cell>${props.vehicle_types[space.vehicle_type].price}</Table.Cell>
                <Table.Cell>{receipt.duration}m</Table.Cell>
                <Table.Cell>${props.vehicle_types[space.vehicle_type].price * receipt.duration / 60}</Table.Cell>
                </Table.Row>)}

                <Table.Row>
                <Table.RowHeaderCell>Total</Table.RowHeaderCell>
                <Table.Cell></Table.Cell>
                <Table.Cell>{receipt.duration}m</Table.Cell>
                <Table.Cell>${receipt.total_price}</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table.Root>

        <Text size="2" as="div" weight="bold">Pay time: <Text color='gray' weight="regular">{receipt.pay_time}</Text></Text>
        
        <Text size="2" as="div" weight="bold">Payment method: <Text color='gray' weight="regular">{receipt.method}</Text></Text>
        </>
        }
        </>
    )
}

export default PaymentForm