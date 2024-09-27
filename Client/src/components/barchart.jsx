
import '@radix-ui/themes/styles.css'
import './barchart.css'
import {Box, Text, HoverCard, Grid} from '@radix-ui/themes';

function BarChart(props) {
    const bars = props.values;
    var max = [...bars].sort((a, b) => Number(a[1]) - Number(b[1]))[9][1];
    if(max == 0){
        max = 1;
    }
    return (
        <Grid columns="10" gap="0" rows="repeat(0, 10px)" width="auto" className='barcontainer'>
            {bars.map((bar,index) =>
                <Box className='bar' style={{height: Number(bar[1])/Number(max) * 100 + 1}} key={index}>
                    <HoverCard.Root>
                        <HoverCard.Trigger>
                            <Box className='inside'></Box>
                        </HoverCard.Trigger>
                        <HoverCard.Content maxWidth="300px" size='1'>
                            <Box>
                                <Text as="div" size="2" weight="bold">{bar[0]}</Text>
                                <Text as="div" size="2" color='gray'>{bar[1]} {props.quantifier}</Text>
                            </Box>
                        </HoverCard.Content>
                    </HoverCard.Root>
                </Box>
            )}
        </Grid>
    )
}

export default BarChart