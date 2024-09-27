
import '@radix-ui/themes/styles.css'
import './barchart.css'
import {Box, Text,Separator, Button, Flex, TextField,TextArea,Grid,IconButton,Table, Popover} from '@radix-ui/themes';
import {CrossCircledIcon,ClockIcon, CalendarIcon} from '@radix-ui/react-icons'
import {train, predict} from '../assets/AI.js'
import { useState, useEffect} from 'react';
import Calender from './calender.jsx'
import {checkOverlap} from '../assets/functions';
import Loading from './loading.jsx';

function AvailabilityPredictor(props) {
    const [model, setModel] = useState();
    const [available, setAvailable] = useState("---");

    async function getInput() {
        const inputs = [];
        const now = new Date();
        const start = new Date();
        start.setDate(now.getDate() - 7);
        let current = start;
        current.setHours(0);
        let index = 0;
        while (current <= now) {
            const dayOfWeek = current.getDay();
            const hour = current.getHours()/4;
            inputs.push([dayOfWeek, hour, props.location.weather.temperature_2m[index]/100, props.location.weather.precipitation[index], props.location.weather.cloudcover[index]/100]); // Push day of week and hour into array
            current.setHours(current.getHours() + 1);
            index ++;
        }
        return inputs;
    }

    function getOutput() {
        const now = new Date();
        const start = new Date();
        start.setDate(now.getDate() - 7);
        const outputs = [];
        let current = start;
        current.setHours(0);
        while (current <= now) {
            outputs.push(props.location.parking_spaces.map(p => checkOverlap(props.parking_spaces[p].schedule.map(r => props.reservations[r]).filter(r => r), current)).filter(r => r > 0).length); 
            current.setHours(current.getHours() + 1);
        }
        return outputs;
    }

    async function predict() {
        const inputs = await getInput();
        const outputs = getOutput();
        setAvailable(null);
        const index = props.location.weather.time.indexOf(date + "T" + hourtime + ":00")
        const input = [new Date(date).getDay(), hourtime/4, props.location.weather.temperature_2m[index]/100, props.location.weather.precipitation[index], props.location.weather.cloudcover[index]/100];
        console.log(input);
        const result = await train(inputs, outputs, [input]);
        //console.log(result);
        setAvailable(Math.round(result[0][0]));
    }

    const [date,setDate] = useState();
    const [hourtime,setHourTime] = useState();
    const handleInputChange = (event,setter) => {
        setter(event.target.value);
    };
    return (
        <>
        <Text size="5">Prediction</Text>
            <Separator className='separator' size="4"></Separator>
        <Grid columns="2" gap="5" style={{width:"auto"}} className='formrow'>
                <Box>
                    <Text as="div" size="2" style={{marginBottom:5}}>Day</Text>
                    <Flex gap="1">
                    <Popover.Root>
                        <Popover.Trigger>
                            <IconButton>
                                <CalendarIcon width="18" height="18" />
                            </IconButton>
                        </Popover.Trigger>
                        <Popover.Content width="320px" size='1'>
                            <Calender setter={setDate}></Calender>
                        </Popover.Content>
                    </Popover.Root>
                        <TextField.Root placeholder="yyyy/mm/dd" size="2" style={{ width: "auto" }} value={date} onChange={(e) => handleInputChange(e,setDate)}></TextField.Root>
                    </Flex>
                </Box>
                <Box>
                    <Text as="div" size="2" style={{marginBottom:5}}>Hour</Text>
                    <Flex gap="1">
                        <IconButton>
                            <ClockIcon width="18" height="18" />
                        </IconButton>
                        <TextField.Root placeholder="hh" type="number" size="2" style={{ width: "auto" }} value={hourtime} onChange={(e) => handleInputChange(e,setHourTime)}>
                        </TextField.Root>
                    </Flex>
                </Box>
                
            </Grid>
            <Button style={{marginBottom:25}} onClick={predict}>Predict</Button>
            {available ? <Text as="div" size="4" style={{marginBottom:5}}>Available: {available}</Text> :
                <Loading></Loading>
            }
            </>
    )
}

export default AvailabilityPredictor