
import { Box,Flex } from '@radix-ui/themes'
import './loading.css'

function Loading() {
    return (
        <Box className='outer'>
            <Flex style={{margin:"auto"}}>
            <Box className='dot1'></Box>
            <Box className='dot2'></Box>
            <Box className='dot3'></Box>
            </Flex>
        </Box>
    )
}

export default Loading
