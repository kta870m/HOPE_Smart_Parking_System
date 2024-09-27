
import '@radix-ui/themes/styles.css'
import './piechart.css'
import {Box, Text, HoverCard, Grid} from '@radix-ui/themes';

function PieChart(props) {
    return (<>
        <style>
            {`
            @keyframes fillCircle {
                0% {
                    stroke-dasharray: 0, 1000;
                }
                100% {
                    stroke-dasharray: ${props.value/props.full *253}, 1000;
                }
            }
            `}
        </style>
        <HoverCard.Root>
            <HoverCard.Trigger>
                <Box className="circle-container">
                <Box className="circle">
                    <Box className="innercircle1">
                    </Box>
                    </Box>
                        <svg className='svgcircle' viewBox="0 0 100 100">
                            <circle className="partial-circle" cx="50" cy="50" r="40"></circle>
                        </svg>
                    <Box className="innercircle2" justify="center">
                        <Box className='numslot'>
                            <Text as="div" align="center" size="5">{props.full - props.value} </Text>
                            <Text as="div" justify="center" size="2" color='gray'>Slots</Text>
                        </Box>
                    </Box>
                </Box>
            </HoverCard.Trigger>
            <HoverCard.Content maxWidth="300px" size='1'>
                <Box>
                    <Text as="div" size="2" weight="bold">Total: <Text color="gray" size="2" weight="regular">{props.full}</Text></Text>
                    <Text as="div" size="2" weight="bold">Occupied: <Text color="gray" size="2" weight="regular">{props.value}</Text></Text>
                    <Text as="div" size="2" weight="bold">Available: <Text color="gray" size="2" weight="regular">{props.full - props.value}</Text></Text>
                </Box>
            </HoverCard.Content>
        </HoverCard.Root>
        </>
    )
}

export default PieChart