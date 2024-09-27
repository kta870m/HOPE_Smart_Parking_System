
import '@radix-ui/themes/styles.css'
import {Box, Text, Button, Flex, Avatar, Checkbox, Popover, AlertDialog,Separator} from '@radix-ui/themes';
import {DotsVerticalIcon, TrashIcon, Pencil2Icon} from '@radix-ui/react-icons'

function AdminSlot(props) {
    return (
        <Flex className='flex' gap="3" align="center">
            <Checkbox></Checkbox>
            <Avatar
                size="1"
                src={"/vehicle/" + props.space.vehicle_type + ".png"}
                fallback='H'
            />
            <Box style={{width:2000}}>
                <Text as="div" size="2" weight="bold" style={{ width: 'fit-content'}}>
                    {props.space.name}
                </Text>
                <Text as="div" size="1" color="gray">
                    ${props.cost}/hour
                </Text>
            </Box>
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
                                <Text size="5">Banning</Text>
                                <Separator className='separator' size="4"></Separator>
                                <Text size="2">Are you sure you wnat to ban</Text>
                                <Flex gap="3" mt="4" justify="end">
                                <AlertDialog.Cancel>
                                    <Button variant="soft" color="gray">Cancel</Button>
                                </AlertDialog.Cancel>
                                <AlertDialog.Action>
                                    <Button variant="solid" color="tomato">Confirm</Button>
                                </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </Popover.Content>
                </Popover.Root>
        </Flex>
        
    )
}

export default AdminSlot