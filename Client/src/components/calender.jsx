import './calender.css'
import '@radix-ui/themes/styles.css'
import {Box, Text, TextField, IconButton, Separator, Flex, Grid, Badge} from '@radix-ui/themes';
import Loading from './loading.jsx'
import {ResetIcon,DotFilledIcon,ChevronLeftIcon,ChevronRightIcon, BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useState, useRef, useEffect } from 'react';

function Calender(props) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [monthoffset, setMonthOffset] = useState(0);
    const [currentmonth, setCurrentMonth] = useState(0);
    const [curentdate, setCurentDate] = useState();
    const [dates, setDates] = useState([]);
    useEffect(() => {
        let day = [];
        const today = new Date();
        setCurentDate(today);
        const month = today.getMonth() + monthoffset;
        const year = today.getFullYear();
        setCurrentMonth(year * 12 + month);
        const firstday = new Date(year, month, 1).getDay();
        const days = new Date(year, month + 1, 0).getDate();
        for (let i = 0; i < firstday; i++) {
            day.push(null);
        }
        for (let i = 1; i <= days; i++) {
            day.push(i);
        }
        setDates(day);
    }, [monthoffset]);

    function nextMonth(){
        setMonthOffset(monthoffset + 1);
    }

    function lastMonth(){
        setMonthOffset(monthoffset - 1);
    }

    function thisMonth(){
        setMonthOffset(0);
    }
    const displayyear = Math.floor(currentmonth/12);
    const displaymonth = currentmonth % displayyear + 1;
    return (
        <>
            <Grid columns="1" gap="0" rows="repeat(0, 5px)" width="auto">
                <Flex gap="2" style={{marginBottom:15}} align="center">
                    <Box style={{width:2000}}>
                    <Text size="4" weight="normal">{displayyear}</Text>
                    <Text size="3" color='gray'> {months[displaymonth - 1]}</Text>
                    </Box>
                    <IconButton onClick={thisMonth}>
                        <ResetIcon width="18" height="18" />
                    </IconButton>
                    <IconButton onClick={lastMonth}>
                        <ChevronLeftIcon width="18" height="18" />
                    </IconButton>
                    <IconButton onClick={nextMonth}>
                        <ChevronRightIcon width="18" height="18" />
                    </IconButton>
                </Flex>             
            </Grid>
            <Grid columns="7" gap="1" rows="repeat(0, 5px)" width="auto">
                <Text as="div" align="center" size="2" weight="bold">Sun</Text>
                <Text as="div" align="center" size="2" weight="bold">Mon</Text>
                <Text as="div" align="center" size="2" weight="bold">Tue</Text>
                <Text as="div" align="center" size="2" weight="bold">Wed</Text>
                <Text as="div" align="center" size="2" weight="bold">Thu</Text>
                <Text as="div" align="center" size="2" weight="bold">Fri</Text>
                <Text as="div" align="center" size="2" weight="bold">Sat</Text>
                {dates ? dates.map((d,index) => d ? 
                    <Box onClick={props.setter ? () => props.setter(displayyear+"-"+(displaymonth<10?"0":"")+displaymonth+"-"+(d<10?"0":"")+d) : null} key={index} className='day' style={{height: props.size == 2 ? 100 : 52, border:d == curentdate.getDate() && monthoffset == 0 ? "solid" : "none", borderColor: d == curentdate.getDate() && monthoffset == 0 ? "#f4c02d" : "inherit", borderRadius: 8}}>
                        <Text as="div" align="center" size="2" color='gray'>{d}</Text>
                        {props.reservations ? props.reservations.filter(r => r.start_time.split(' ')[0] == displayyear+"-"+(displaymonth<10?"0":"")+displaymonth+"-"+(d<10?"0":"")+d).sort((a,b) => new Date(a.start_time) - new Date(b.start_time)).map((r,index) => 
                            <Badge key={index} className='timebadge' variant='solid' size="5">• {r.start_time.split(' ')[1].substring(0,5) + " " + r.description}</Badge>) : null
                            }
                    </Box> : 
                <Box key={index}></Box>) : null}
            </Grid>
        </>
    )
}

export default Calender
