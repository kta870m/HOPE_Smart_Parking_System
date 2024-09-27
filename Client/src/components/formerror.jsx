
import '@radix-ui/themes/styles.css'
import {Text,HoverCard} from '@radix-ui/themes';
import {CheckCircledIcon,CrossCircledIcon} from '@radix-ui/react-icons'
import { useState } from 'react';
import visa from "../assets/visa.png"
import mastercard from "../assets/mastercard.png"
import americanexpress from "../assets/americanexpress.png"

function FormError(props) {
    return (
        <>
        {!props.error ? "" : props.error[props.type] ?
        <HoverCard.Root>
            <HoverCard.Trigger>
                <CrossCircledIcon color="tomato" className='icon'></CrossCircledIcon>
            </HoverCard.Trigger>
            <HoverCard.Content maxWidth="300px" size="1">
                {props.error[props.type].map(error => <Text as="div" size="2" color="red"> <CrossCircledIcon color="tomato" className='icon'></CrossCircledIcon> {error}</Text>)}
            </HoverCard.Content>
        </HoverCard.Root> :
        <CheckCircledIcon color="green" className='icon'></CheckCircledIcon>}
        </>
    )
}

export default FormError